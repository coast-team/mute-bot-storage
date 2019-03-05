import {
  FixDataState,
  MetaDataType,
  MuteCoreFactory,
  MuteCoreTypes,
  RichOperationStrategy,
  RichOperationTypes,
  StateStrategy,
  StateTypes,
  Strategy,
  TitleState,
} from '@coast-team/mute-core'
import { KeyState, Symmetric } from '@coast-team/mute-crypto'
import { Document } from 'mongoose'
import { merge } from 'rxjs'
import { auditTime, filter } from 'rxjs/operators'

import { LogState } from '@coast-team/mute-core/dist/types/src/doc'
import { WebGroupState } from 'netflux'
import { isUndefined } from 'util'
import { CryptoService } from './CryptoService'
import { CryptoType } from './CryptoType'
import { log } from './log'
import { MongooseAdapter } from './MongooseAdapter'
import { NetworkService } from './network'

const SAVE_INTERVAL = 120000

const SYNC_DOC_INTERVAL = 10000

export class BotStorage {
  public static AVATAR = 'https://www.shareicon.net/data/256x256/2016/01/01/228083_bot_256x256.png'
  public static ID = 9137

  private crdtStrategy: Strategy
  private mongooseAdapter: MongooseAdapter
  private displayName: string
  private login: string
  private deviceID: string
  // private loginDeviceID: string
  private lastReceivedState: StateTypes | undefined
  private lastSavedState: StateTypes | undefined
  private mongoDoc: Document | undefined
  private saveInterval: NodeJS.Timer
  private saveChain: Promise<void>
  private syncDocContentInterval: NodeJS.Timer | undefined

  private synchronize: () => void

  private cryptoService: CryptoService
  private networkService: NetworkService

  constructor(
    pseudonym: string,
    login: string,
    deviceID: string,
    mongooseAdapter: MongooseAdapter,
    cryptoService: CryptoService,
    networkService: NetworkService
  ) {
    this.crdtStrategy = Strategy.LOGOOTSPLIT
    this.displayName = pseudonym
    this.login = login
    this.deviceID = deviceID
    this.synchronize = () => {}
    this.syncDocContentInterval = undefined
    this.saveChain = Promise.resolve()
    this.mongooseAdapter = mongooseAdapter
    this.cryptoService = cryptoService
    this.networkService = networkService

    // Initialize WebGroup
    this.initNetwork()
    if (this.cryptoService.cryptoType === CryptoType.KEY_AGREEMENT_BD) {
      this.initKeyAgreementState()
    }
    // Get the document from database or create a new one, then initialize CRDTs
    this.retrieveDocument(this.networkService.wg.key)
      .then((doc) => {
        this.mongoDoc = doc
        const operations = doc
          .get('operations')
          .map((op: RichOperationTypes) => RichOperationStrategy.fromPlain(this.crdtStrategy, op))
        const state = StateStrategy.emptyState(this.crdtStrategy)
        if (state) {
          state.remoteOperations = operations || []
          this.initMuteCore(doc, state, this.cryptoService.cryptoType)
        }
      })
      .catch((err) => log.error(`Failed to initialize document ${this.networkService.wg.key}`, err))

    log.info(this.login, this.deviceID)

    // Configure document content save interval
    this.saveInterval = setInterval(() => {
      if (this.mongoDoc) {
        this.saveContent()
      }
    }, SAVE_INTERVAL)
  }

  get signalingKey(): string {
    return this.networkService.wg.key
  }

  private initNetwork() {
    this.networkService.onStateChange.subscribe((wgs: WebGroupState) => {
      if (wgs === WebGroupState.LEFT) {
        this.saveContent()
        global.clearInterval(this.saveInterval)
      }
    })
    this.networkService.onMemberLeave.subscribe(() => {
      if (this.networkService.wg.members.length < 2) {
        this.saveContent()
      }
    })
  }

  private async retrieveDocument(key: string): Promise<Document> {
    const doc = await this.mongooseAdapter.find(key)
    if (!doc) {
      return await this.mongooseAdapter.create(key)
    }
    return doc
  }

  private initMuteCore(
    mongoDoc: Document,
    docContent: StateTypes,
    cryptoType: CryptoType
  ): MuteCoreTypes {
    // TODO: MuteCore should consume doc Object

    const muteCore = MuteCoreFactory.createMuteCore({
      strategy: Strategy.LOGOOTSPLIT,
      profile: {
        displayName: this.displayName,
        login: this.login,
        deviceID: this.deviceID,
        avatar: BotStorage.AVATAR,
      },
      docContent,
      metaTitle: {
        title: mongoDoc.get('title'),
        titleModified: mongoDoc.get('titleModified'),
      },
      metaFixData: {
        docCreated: mongoDoc.get('created'),
        cryptoKey: mongoDoc.get('cryptoKey'),
      },
      metaLogs: {
        share: mongoDoc.get('shareLogs'),
        vector: this.mongooseAdapter.getShareVector(mongoDoc),
      },
    })

    // Metadata
    muteCore.remoteMetadataUpdate$.subscribe(({ type, data }) => {
      switch (type) {
        case MetaDataType.Title:
          const { title, titleModified } = data as TitleState
          this.saveTitle(title, titleModified)
          break
        case MetaDataType.FixData:
          const { docCreated, cryptoKey } = data as FixDataState
          this.saveFixData(docCreated, cryptoKey)
          if (this.cryptoService.crypto instanceof Symmetric) {
            this.cryptoService.crypto.importKey(cryptoKey)
          }
          break
        case MetaDataType.Logs:
          const { share, vector } = data as LogState
          this.saveLogs(share, isUndefined(vector) ? new Map() : vector)
          break
      }
    })

    // Message IN/OUT
    muteCore.messageIn$ = this.networkService.onMessage
    this.networkService.setMessageIn(muteCore.messageOut$)

    muteCore.remoteTextOperations$.subscribe(() => {
      this.lastReceivedState = muteCore.state
    })

    // Collaborators
    muteCore.memberJoin$ = this.networkService.onMemberJoin
    muteCore.memberLeave$ = this.networkService.onMemberLeave
    muteCore.collabJoin$.subscribe(({ id, login, deviceID }) => {
      this.saveLogins(login)
      if (
        login !== undefined &&
        deviceID !== undefined &&
        cryptoType === CryptoType.KEY_AGREEMENT_BD
      ) {
        return this.cryptoService.verifyLoginPK(id, login, deviceID).catch((err: any) => {
          log.info('COLLAB JOINED', 'Failed to retrieve Public Key of ' + login, ', err: ', err)
        })
      }
      return
    })
    muteCore.remoteCollabUpdate$.subscribe(({ login }) => this.saveLogins(login))

    // Synchronization mechanism
    this.synchronize = () => {
      if (this.networkService.wg.members.length > 1) {
        if (this.cryptoService.crypto) {
          if (this.cryptoService.crypto.state === KeyState.READY) {
            muteCore.synchronize()
          }
        } else {
          muteCore.synchronize()
        }
      }
    }
    muteCore.collabJoin$.subscribe(() => this.synchronize())

    return muteCore
  }

  private async initKeyAgreementState() {
    await this.cryptoService.checkMySigningKeyPair(this.login, this.deviceID)
    merge(
      this.networkService.onCryptoStateChange.pipe(filter((state) => state === KeyState.READY)),
      this.networkService.onStateChange.pipe(filter((state) => state === WebGroupState.JOINED))
    )
      .pipe(auditTime(1000))
      .subscribe(() => this.restartSyncInterval())
  }

  private saveContent() {
    try {
      if (
        this.mongoDoc &&
        this.lastReceivedState &&
        this.lastReceivedState !== this.lastSavedState
      ) {
        this.mongoDoc.set({
          operations: this.lastReceivedState.remoteOperations.map((ope) => {
            return {
              id: ope.id,
              clock: ope.clock,
              operation: ope.operation,
              dependencies: Array.from(ope.dependencies),
            }
          }),
        })
        this.saveDoc()
        this.lastSavedState = this.lastReceivedState
      }
    } catch (err) {
      log.error('Failed save the document content:', err)
    }
  }

  private saveLogins(login: string | undefined) {
    if (this.mongoDoc && login && login !== 'anonymous') {
      const logins: string[] = this.mongoDoc.get('logins')
      if (!logins.includes(login)) {
        logins.push(login)
        this.mongoDoc.set({ logins })
        this.saveDoc()
      }
    }
  }

  private saveTitle(title: string, titleModified: number) {
    if (this.mongoDoc) {
      this.mongoDoc.set({ title, titleModified })
      this.saveDoc()
    }
  }

  private saveFixData(created: number, cryptoKey: string) {
    if (this.mongoDoc) {
      this.mongoDoc.set({ created, cryptoKey })
      this.saveDoc()
    }
  }

  private saveLogs(shareLogs: boolean, vector: Map<number, number>) {
    if (this.mongoDoc) {
      const shareLogsVector = new Map<string, number>()
      vector.forEach((value, key) => {
        shareLogsVector.set(key.toString(), value)
      })
      this.mongoDoc.set({ shareLogs, shareLogsVector })
      this.saveDoc()
    }
  }

  private async saveDoc() {
    this.saveChain = this.saveChain
      .then(async () => {
        if (this.mongoDoc) {
          await this.mongoDoc.save()
        }
      })
      .catch((err: Error) => log.warn('Could not save the document: ', err))
  }

  private restartSyncInterval() {
    if (this.syncDocContentInterval) {
      clearInterval(this.syncDocContentInterval)
    }
    this.synchronize()
    this.syncDocContentInterval = setInterval(() => this.synchronize(), SYNC_DOC_INTERVAL)
  }
}
