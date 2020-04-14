interface UserProps {
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
}