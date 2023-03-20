import Bot from "~/framework/structures/Bot";
import Command from "~/framework/structures/Command";
const Ascii = require('ascii-table')

module.exports = (bot: Bot) => {
    const commands: string[] = require(`~/framework/handlers/FileHandler`)(`./src/commands/`, true)
    const table = new Ascii(`Commands`)

    if (commands.length === 0) {
        table.addRow('No data!')
        return console.log(table.toString())
    }

    commands.forEach((path: string) => {
        const command: Command = require(`~/commands/${path}`)

        if (!command.name) return table.addRow("?", command.description ?? "?", command.category, "🔸 FAILED", "Command's name missing!")
        if (!command.description) return table.addRow(command.name, "?", command.category, "🔸 FAILED", "Command's description missing!")
        if (!command.callback) return table.addRow(command.name, command.description, command.category, "🔸 FAILED", "Command's callback missing!")

        bot.registerCommand(command)
        table.addRow(command.name, command.description, command.category, "🔹 SUCCÈS")
    })

    return console.log(table.toString())
}
