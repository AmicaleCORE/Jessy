import Bot from "~/framework/structures/Bot";
import Event from "~/framework/structures/Event";
const Ascii = require('ascii-table')

module.exports = (bot: Bot) => {
    const events: string[] = require(`~/framework/handlers/FileHandler`)(`./src/events/`, true)
    const table = new Ascii(`Events`)

    if (events.length === 0) {
        table.addRow("No data!")
        return console.log(table.toString())
    }

    events.forEach((path: string) => {
        const event: Event = require(`~/events/${path}`)

        if (!event.name) return table.addRow("?", event.once ? "✔" : "❌", "🔸 ÉCHOUÉ", "Event's name is missing!")
        if (!event.callback) return table.addRow(event.name, event.once ? "✔" : "❌", "🔸 ÉCHOUÉ", "Event's callback is missing!")

        bot.registerEvent(event)
        table.addRow(event.name, event.once ? "✔" : "❌", "🔹 SUCCÈS")
    })

    return console.log(table.toString())
}