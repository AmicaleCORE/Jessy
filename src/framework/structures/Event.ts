export default class Event {
    name: string
    callback: Function
    once: boolean

    constructor (name: string, callback: Function, once?: boolean) {
        this.name = name
        this.callback = callback
        this.once = once || false
    }
}