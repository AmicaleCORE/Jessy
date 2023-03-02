import {ApplicationCommandOption} from "discord.js";

export default class Command {
    name: string
    description: string
    category: string
    options: ApplicationCommandOption[]
    callback: Function

    constructor (name: string, callback: Function, data: {
        description: string,
        category?: string,
        options?: ApplicationCommandOption[]
    }) {
        this.name = name
        this.description = data.description
        this.category = data.category || `No Category`
        this.options = data.options || []
        this.callback = callback
    }
}