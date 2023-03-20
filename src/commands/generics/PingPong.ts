import Bot from "~/framework/structures/Bot";
import {CommandInteraction} from "discord.js";
import Command from "~/framework/structures/Command";

module.exports = new Command("ping", async (bot: Bot, interaction: CommandInteraction) => {
    await interaction.reply({
        content: 'Pong :ping_pong:',
        ephemeral: true
    })
}, {
    description: "Te prendre un revers dans le coin.",
    category: "Generics"
})
