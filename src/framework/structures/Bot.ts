import {Client, Collection, ColorResolvable} from "discord.js";
import Command from "~/framework/structures/Command";
import Event from "~/framework/structures/Event";
import {Button, Component, Menu, Modal} from "~/framework/structures/Component";

export default class Bot extends Client {
    login_token: string
    color: ColorResolvable
    commands: Collection<string, Command>
    modals: Collection<string, Modal>
    buttons: Collection<string, Button>
    menus: Collection<string, Menu>

    constructor (token: string, color?: ColorResolvable) {
        super({ intents: 32767 })

        // Private data
        this.login_token = token
        this.color = color || "#000000" // Default embed color
        // Collections
        this.menus = new Collection()
        this.modals = new Collection()
        this.buttons = new Collection()
        this.commands = new Collection()
    }

    registerEvent (event: Event) {
        if (event.once) this.once(event.name, event.callback.bind(null, this))
        else this.on(event.name, event.callback.bind(null, this))
    }

    registerCommand (command: Command) {
        this.commands.set(command.name, command)
    }

    registerComponent (component: Component) {
        if (component instanceof Button) {
            this.buttons.set(component.id.includes('%') ? component.id.split('%')[0] : component.id, component)
            return "Button"
        } else if (component instanceof Modal) {
            this.modals.set(component.id.includes('%') ? component.id.split('%')[0] : component.id, component)
            return "Modal"
        } else if (component instanceof Menu) {
            this.menus.set(component.id.includes('%') ? component.id.split('%')[0] : component.id, component)
            return "Menu"
        }

        return "-"
    }

    start () {
        require('~/framework/handlers/EventHandler')(this)
        require('~/framework/handlers/CommandHandler')(this)
        require('~/framework/handlers/ComponentHandler')(this)

        this.login(this.login_token)
            .then(_ => console.log(`Logged in!`))
            .catch((error: Error) => console.log(`An error occurred!`, error))
    }
}