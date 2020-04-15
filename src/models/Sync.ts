import axios, { AxiosPromise } from 'axios'
import { UserProps } from './User'

interface HasId {
  id?: number
}

/**
 * 3) Refactor using Generic
 * Pros: Now the class is re-usable
 */
export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`)
  }

  save(data: T): AxiosPromise {
    const { id } = data

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data)
    } else {
      return axios.post(this.rootUrl, data)
    }
  }
}


/**
 * 2) Refactor the class in order to be used with User class.
 * Cons: Strong dependencies with User class
 */
// export class Sync {
//   constructor(public rootUrl: string) {}

//   fetch(id: number): AxiosPromise {
//     return axios.get(`${this.rootUrl}/${id}`)
//   }

//   save(data: UserProps): AxiosPromise {
//     const { id } = data

//     if (id) {
//       return axios.put(`${this.rootUrl}/${id}`, data)
//     } else {
//       return axios.post(this.rootUrl, data)
//     }
//   }
// }

/**
 * 1) Extract method related to the API
 * How refactor that class in order to 
 * use it with any future class. Like User, Blog Posts, etc...
 */
// export class Sync {
//   url: string = 'http://localhost:3000'

//   fetch(): void {
//     axios.get(this.url + `/users/${this.get('id')}`)
//     .then((response: AxiosResponse): void => {
//       console.log(response);
//       this.set(response.data)
//     })
//   }

//   save(): void {
//     const id = this.get('id')

//     if (id) {
//       axios.put(this.url + `/users/${id}`, this.data)
//     } else {
//       axios.post(this.url + '/users', this.data)
//     }
//   }
// }
