import axios, { AxiosResponse } from 'axios'

interface UserProps {
  id?: number
  name?: string
  age?: number
}

/**
 * Function that return nothing
 * () => {} ==> return an object
 */
type Callback = () => void

export class User {
  /**
   * This gonna be an empty object.
   * Wich has eventually constraints on keys and values
   */
  events: { [key: string]: Callback[] } = {}

  url: string = 'http://localhost:3000'

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName]
  }

  set(update: UserProps):void {
    /**
     * Take all data from 'update' and copy that
     * in 'this.data' and overwite the old data in 'this.data'
     */
    Object.assign(this.data, update)
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [] 
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName]

    if (!handlers || handlers.length === 0) {
      return 
    }

    handlers.forEach(callback => callback())
  }

  fetch(): void {
    axios.get(this.url + `/users/${this.get('id')}`)
    .then((response: AxiosResponse): void => {
      console.log(response);
      this.set(response.data)
    })
  }

  save(): void {
    const id = this.get('id')

    if (id) {
      axios.put(this.url + `/users/${id}`, this.data)
    } else {
      axios.post(this.url + '/users', this.data)
    }
  }
}