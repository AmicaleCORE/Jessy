import {Client, ColorResolvable} from "discord.js";

export default class Bot extends Client {
    login_token: string
    color: ColorResolvable

    constructor (token: string, color?: ColorResolvable) {
        super({ intents: 32767 })

        this.login_token = token
        this.color = color || "#000000"
    }

    start () {
        this.login(this.login_token)
            .then(_ => console.log(`Logged in!`))
            .catch((error: Error) => console.log(`An error occurred!`, error))
    }
}