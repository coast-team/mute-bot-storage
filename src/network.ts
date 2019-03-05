import { Streams as MuteCoreStreams } from '@coast-team/mute-core'
import {
  KeyAgreementBD,
  KeyState,
  Streams as MuteCryptoStreams,
  Symmetric,
} from '@coast-team/mute-crypto'
import { WebGroup, WebGroupState } from 'netflux'
import { Observable, ReplaySubject, Subject } from 'rxjs'
import { CryptoService } from './CryptoService'
import { CryptoType } from './CryptoType'
import { log } from './log'
import { Message } from './proto'

export class NetworkService {
  private _wg: WebGroup

  private memberJoin$: ReplaySubject<number>
  private memberLeave$: ReplaySubject<number>

  private message$: ReplaySubject<{
    senderId: number
    streamId: number
    content: Uint8Array
  }>

  private myID$: ReplaySubject<number>

  private cryptoState: Subject<KeyState>
  private state$: ReplaySubject<WebGroupState>

  private cryptoService?: CryptoService
  private withKeyServer: boolean

  constructor(wg: WebGroup, cryptoService: CryptoService) {
    this._wg = wg

    this.memberJoin$ = new ReplaySubject()
    this.memberLeave$ = new ReplaySubject()

    this.message$ = new ReplaySubject()

    this.myID$ = new ReplaySubject()

    this.cryptoState = new Subject()
    this.state$ = new ReplaySubject()

    this.initWebGroup()

    this.cryptoService = cryptoService
    this.withKeyServer = this.cryptoService.cryptoType === CryptoType.KEY_AGREEMENT_BD

    switch (this.cryptoService.cryptoType) {
      case CryptoType.KEY_AGREEMENT_BD:
        this.configureKeyAgreementBDEncryption()
        break
      case CryptoType.METADATA:
        this.configureMetaDataEncryption()
        break
      case CryptoType.NONE:
        this.configureNoEncryption()
        break
      default:
        this.configureNoEncryption()
    }
  }

  setMessageIn(
    source: Observable<{ streamId: number; content: Uint8Array; recipientId?: number }>
  ) {
    source.subscribe(({ streamId, content, recipientId }) => {
      if (
        streamId === MuteCoreStreams.DOCUMENT_CONTENT &&
        this.cryptoService &&
        this.cryptoService.crypto &&
        this.cryptoService.crypto.state === KeyState.READY
      ) {
        this.cryptoService.crypto
          .encrypt(content)
          .then((encryptedContent) => this.send(streamId, encryptedContent, recipientId))
          .catch((err) => log.error('Failed to encrypt a message: ', err))
      } else {
        this.send(streamId, content, recipientId)
      }
    })
  }

  private initWebGroup() {
    this.wg.onStateChange = (state) => {
      this.state$.next(state)
    }
    this.wg.onMemberJoin = (id) => this.memberJoin$.next(id)
    this.wg.onMemberLeave = (id) => {
      this.memberLeave$.next(id)
    }
    this.wg.onMyId = (id) => this.myID$.next(id)
  }

  private configureKeyAgreementBDEncryption() {
    if (!this.cryptoService) {
      log.error('CryptoService', "CryptoService shouldn't be undefined")
      return
    }
    if (this.withKeyServer) {
      log.info('hello there')
      const signingKeyPair: any = (this.cryptoService as CryptoService).signingKeyPair
      log.info(signingKeyPair)
      ;(this.cryptoService.crypto as KeyAgreementBD).signingKey = signingKeyPair.privateKey
      ;(this.cryptoService as CryptoService).onSignatureError = (id: number) =>
        log.error('Signature verification error for ', id)
    }
    ;(this.cryptoService.crypto as KeyAgreementBD).onSend = (msg, streamId) =>
      this.send(streamId, msg)
    // Handle network events
    this.myID$.subscribe((id) => (this.cryptoService!.crypto as KeyAgreementBD).setMyId(id))
    this.memberJoin$.subscribe((id) => (this.cryptoService!.crypto as KeyAgreementBD).addMember(id))
    this.memberLeave$.subscribe((id) =>
      (this.cryptoService!.crypto as KeyAgreementBD).removeMember(id)
    )
    this.state$.subscribe((state) => {
      if (state === WebGroupState.JOINED) {
        ;(this.cryptoService!.crypto as KeyAgreementBD).setReady()
      }
    })
    this.wg.onMessage = (id, bytes) => {
      try {
        const { streamId, content } = Message.decode(bytes as Uint8Array)
        if (streamId === MuteCryptoStreams.KEY_AGREEMENT_BD) {
          ;(this.cryptoService as CryptoService).onBDMessage(id, content)
        } else {
          if (streamId === MuteCoreStreams.DOCUMENT_CONTENT) {
            ;(this.cryptoService!.crypto as KeyAgreementBD)
              .decrypt(content)
              .then((decryptedContent) => {
                this.message$.next({ streamId, content: decryptedContent, senderId: id })
              })
              .catch((err) => log.warn('Failed to decrypt document content: ', JSON.stringify(err)))
            return
          }
          this.message$.next({ streamId, content, senderId: id })
        }
      } catch (err) {
        log.warn('Message from network decode error: ', err.message)
      }
    }
    ;(this.cryptoService.crypto as KeyAgreementBD).onStateChange = (state) =>
      this.cryptoState.next(state)
  }

  private configureMetaDataEncryption() {
    this.wg.onMessage = (senderId, bytes) => {
      if (!this.cryptoService) {
        log.error('CryptoService', "CryptoService shouldn't be undefined")
        return
      }
      try {
        const { streamId, content } = Message.decode(bytes as Uint8Array)

        if (streamId === MuteCoreStreams.DOCUMENT_CONTENT) {
          ;(this.cryptoService.crypto as Symmetric)
            .decrypt(content)
            .then((decryptedContent) => {
              this.message$.next({ senderId, streamId, content: decryptedContent })
            })
            .catch((err) => log.warn('Failed to decrypt document content: ', JSON.stringify(err)))
        } else {
          this.message$.next({ senderId, streamId, content })
        }
      } catch (err) {
        log.warn('Message from network decode error: ', err.message)
      }
    }
  }

  private configureNoEncryption() {
    this.wg.onMessage = (senderId, bytes) => {
      try {
        this.message$.next({ senderId, ...Message.decode(bytes as Uint8Array) })
      } catch (err) {
        log.error('Failed to decode a message: ', err)
      }
    }
  }

  private send(streamId: number, content: Uint8Array, id?: number): void {
    const msg = Message.create({ streamId, content })
    if (id === undefined) {
      this.wg.send(Message.encode(msg).finish())
    } else {
      id = id === 0 ? this.randomMember() : id
      this.wg.sendTo(id, Message.encode(msg).finish())
    }
  }

  private randomMember(): number {
    const otherMembers = this.wg.members.filter((i) => i !== this.wg.myId)
    return otherMembers[Math.ceil(Math.random() * otherMembers.length) - 1]
  }

  get onStateChange(): Observable<WebGroupState> {
    return this.state$.asObservable()
  }

  get onMemberJoin(): Observable<WebGroupState> {
    return this.memberJoin$.asObservable()
  }

  get onMemberLeave(): Observable<WebGroupState> {
    return this.memberLeave$.asObservable()
  }

  get onMyIDChange(): Observable<WebGroupState> {
    return this.myID$.asObservable()
  }

  get onCryptoStateChange(): Observable<KeyState> {
    return this.cryptoState.asObservable()
  }

  get onMessage(): Observable<{ senderId: number; streamId: number; content: Uint8Array }> {
    return this.message$.asObservable()
  }

  get wg() {
    return this._wg
  }
}
