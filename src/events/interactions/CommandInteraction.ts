import Event from "~/framework/structures/Event";
import Bot from "~/framework/structures/Bot";
import {CommandInteraction} from "discord.js";
import Command from "~/framework/structures/Command";

module.exports = new Event("interactionCreate", (bot: Bot, interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return

    const command: Command | undefined = bot.commands.get(interaction.commandName)
    if (!command) return
    command.callback(bot, interaction)
})