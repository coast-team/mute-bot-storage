import axios from 'axios'
import { log } from './log'

interface IPK {
  pk: string
}

interface IUserPK {
  login: string
  deviceID: string
  pk: string
}

export class PKRequest {
  constructor(private _baseUrl: string, private _jwt: string) {
    axios.defaults.baseURL = this.baseUrl
    axios.defaults.headers.common.Authorization = `Bearer ${this.jwt}`
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.headers.put['Content-Type'] = 'application/json'
  }

  register(login: string, deviceID: string, pk: string): Promise<void> {
    return new Promise((resolve, reject) => {
      axios
        .post<IUserPK>('', { login, deviceID, pk })
        .then((response) => {
          // handle success
          log.info(
            'Signing KeyPair',
            `Public Key REGISTERED Successfully for ${response.data.login}:${
              response.data.deviceID
            }`,
            response.data.pk
          )
          resolve()
        })
        .catch((error) => {
          // handle error
          log.error(
            'Signing KeyPair',
            `Public Key REGISTERATION ERROR for ${login}:${deviceID} : ${error.response.data}`
          )
          reject(error)
        })
    })
  }

  lookup(login: string, deviceID: string): Promise<string> {
    return new Promise((resolve) => {
      axios
        .get<IPK>(`${login}/${deviceID}`)
        .then((response) => {
          // handle success
          log.info('Signing KeyPair', `LOOKUP ${login}:${deviceID} FOUND`, response.data.pk)
          resolve(response.data.pk)
        })
        .catch((error) => {
          // handle error
          log.error(
            'Signing KeyPair',
            `For ${login}:${deviceID}, HTTP code ${error.response.status}, ` +
              `body was: ${error.response.data}`
          )
          resolve('')
        })
    })
  }

  update(login: string, deviceID: string, pk: string) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${login}/${deviceID}`, { pk } as IPK)
        .then(() => {
          // handle success
          log.info('Signing KeyPair', `Public Key UPDATED in keyserver for ${login}:${deviceID}`)
          resolve()
        })
        .catch((error) => {
          // handle error
          log.info(
            'Signing KeyPair',
            `Public Key NOT UPDATED in keyserver for ${login}:${deviceID} : ${
              error.response.data.body
            }`
          )
          reject(error)
        })
    })
  }

  get baseUrl(): string {
    return this._baseUrl
  }

  get jwt(): string {
    return this._jwt
  }
}
