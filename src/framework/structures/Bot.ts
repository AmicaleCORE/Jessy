import {Client, Collection, ColorResolvable} from "discord.js";
import Command from "~/framework/structures/Command";

export default class Bot extends Client {
    login_token: string
    color: ColorResolvable
    commands: Collection<string, Command>

    constructor (token: string, color?: ColorResolvable) {
        super({ intents: 32767 })

        this.login_token = token
        this.color = color || "#000000"
        this.commands = new Collection()
    }

    registerCommand (command: Command) {
        this.commands.set(command.name, command)
    }

    start () {
        require('~/framework/handlers/CommandHandler')(this)

        this.login(this.login_token)
            .then(_ => console.log(`Logged in!`))
            .catch((error: Error) => console.log(`An error occurred!`, error))
    }
}