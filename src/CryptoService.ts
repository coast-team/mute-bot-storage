import { KeyAgreementBD, Symmetric } from '@coast-team/mute-crypto'
import { asymmetricCrypto } from '@coast-team/mute-crypto-helper'
import { CryptoType } from './CryptoType'
import { log } from './log'
import { IKeyPair, PKRequest } from './PKRequest'

export class CryptoService {
  public static async generateSigningKeyPair(): Promise<IKeyPair> {
    const signingKeyPair = await asymmetricCrypto.generateSigningKeyPair()
    return signingKeyPair
  }

  public static async exportSigningKeyPair(signingKeyPair: IKeyPair): Promise<IKeyPair> {
    if (signingKeyPair === undefined) {
      throw new Error('Signing key pair is not defined')
    }
    return {
      publicKey: JSON.stringify(await asymmetricCrypto.exportKey(signingKeyPair.publicKey)),
      privateKey: JSON.stringify(await asymmetricCrypto.exportKey(signingKeyPair.privateKey)),
    }
  }

  public static async signingKeyPair(exportedKeypair: IKeyPair) {
    return {
      publicKey: await asymmetricCrypto.importKey(JSON.parse(exportedKeypair.publicKey)),
      privateKey: await asymmetricCrypto.importKey(JSON.parse(exportedKeypair.privateKey)),
    }
  }

  private _crypto: Symmetric | KeyAgreementBD
  private _signingKeyPair: any
  private _exportedSigningKeyPair: IKeyPair | undefined
  private _cryptoType: CryptoType

  private _members: Map<number, { key?: any; buffer: Uint8Array[] }>
  private _pkRequest: PKRequest | undefined
  private _signatureErrorHandler: (id: number) => void

  constructor(
    cryptoType: CryptoType,
    crypto: Symmetric | KeyAgreementBD,
    pkRequest: PKRequest | undefined,
    signingKeyPair: any,
    exportedSigningKeyPair: IKeyPair | undefined
  ) {
    this._cryptoType = cryptoType
    this._crypto = crypto
    this._signatureErrorHandler = () => {}
    this._pkRequest = pkRequest
    this._members = new Map()
    this._signingKeyPair = signingKeyPair
    this._exportedSigningKeyPair = exportedSigningKeyPair
  }

  set onSignatureError(handler: (id: number) => void) {
    this._signatureErrorHandler = handler
  }

  public async checkMySigningKeyPair(login: string, deviceID: string) {
    if (this.signingKeyPair === undefined) {
      log.error(
        'Signing KeyPair',
        "Check my PK, something went wrong here : SigningKeyPair shouldn't be undefined"
      )
      return
    }
    if (!this.pkRequest || !this._exportedSigningKeyPair) {
      log.error('Signing KeyPair', "pkRequest shouldn't be undefined here")
      return
    }
    const pk = await this.pkRequest.lookup(login, deviceID)
    log.info('Signing KeyPair', `Check my PK, ${login}:${deviceID} : ${pk}`)
    if (pk === '') {
      await this.pkRequest.register(login, deviceID, this._exportedSigningKeyPair.publicKey)
    } else if (pk !== undefined && pk !== this._exportedSigningKeyPair.publicKey) {
      await this.pkRequest.update(login, deviceID, this._exportedSigningKeyPair.publicKey)
    }
  }

  public async verifyLoginPK(id: number, login: string, deviceID: string) {
    if (!this.pkRequest) {
      log.error('BotStorage verifyLoginPK', "pkRequest shouldn't be undefined")
      return
    }
    const publicKey = JSON.parse(await this.pkRequest.lookup(login, deviceID))
    const cryptoKey = await asymmetricCrypto.importKey(publicKey)
    const member = this.members.get(id)
    if (member) {
      member.key = cryptoKey
      for (const m of member.buffer) {
        ;(this.crypto as KeyAgreementBD).onMessage(id, m, member.key).catch(() => {
          this.signatureErrorHandler(id)
        })
      }
      member.buffer = []
    } else {
      this.members.set(id, { key: cryptoKey, buffer: [] })
    }
  }

  public onBDMessage(id: number, content: Uint8Array) {
    const bd = this.crypto as KeyAgreementBD
    if (this.pkRequest) {
      const member = this.members.get(id)
      if (member) {
        if (member.key) {
          // Content is copied here to avoid mutation. Somehow a mutation happend just after verifying the signature.
          // protobuf maybe ?
          bd.onMessage(id, content.slice(), member.key).catch(() => {
            this._signatureErrorHandler(id)
          })
        } else {
          member.buffer.push(content)
        }
      } else {
        this.members.set(id, { buffer: [content] })
      }
    } else {
      bd.onMessage(id, content)
    }
  }

  public get signingKeyPair() {
    return this._signingKeyPair
  }

  public get pkRequest() {
    return this._pkRequest
  }

  public get members() {
    return this._members
  }

  public get signatureErrorHandler() {
    return this._signatureErrorHandler
  }

  public get crypto() {
    return this._crypto
  }

  public get cryptoType() {
    return this._cryptoType
  }
}
