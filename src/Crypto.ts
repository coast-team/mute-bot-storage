import { symmetricCrypto } from 'crypto-api-wrapper'

export class SymmetricCrypto {
  private key: any

  async importKey(key: string): Promise<void> {
    try {
      this.key = await symmetricCrypto.importKey(symmetricCrypto.fromB64(key))
    } catch (err) {
      console.error('IMPORT KEY ERROR: ', err)
    }
  }

  async encrypt(msg: Uint8Array): Promise<Uint8Array> {
    try {
      return await symmetricCrypto.encrypt(msg, this.key)
    } catch (err) {
      console.error('ENCRYPT ERROR: ', err)
      return new Uint8Array()
    }
  }

  async decrypt(ciphertext: Uint8Array): Promise<Uint8Array> {
    try {
      return await symmetricCrypto.decrypt(ciphertext, this.key)
    } catch (err) {
      console.error('DECRYPT ERROR INSIDE: ', err.stack)
      return new Uint8Array()
    }
  }
}
