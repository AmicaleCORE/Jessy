import Bot from "~/framework/structures/Bot";
import {Component} from "~/framework/structures/Component";
const Ascii = require('ascii-table')

module.exports = (bot: Bot) => {
    const components: string[] = require("~/framework/handlers/FileHandler")('./src/components/', true)
    const table = new Ascii("Components")

    if (components.length === 0) {
        table.addRow("No data!")
        return console.log(table.toString())
    }

    components.forEach((path: string) => {
        const component: Component = require(`~/components/${path}`)

        if (!component.id) return table.addRow("?", "?", "🔸 FAILED", "Component's ID is missing!")

        const type: string = bot.registerComponent(component)
        table.addRow(component.id, type, "🔹 SUCCESS")
    })

    return console.log(table.toString())
}