import { Eventing } from './Eventing'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

export class User {
  public events: Eventing = new Eventing()

  constructor(private data: UserProps ) {}

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
}