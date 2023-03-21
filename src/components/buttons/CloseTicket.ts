import {Button, ButtonOptions} from "~/framework/structures/Component";
import Bot from "~/framework/structures/Bot";
import {ButtonInteraction, ButtonStyle, EmbedBuilder, TextChannel} from "discord.js";
import {close, isTicket} from "~/framework/functions/Tickets";

module.exports = new Button("btn-close", async (bot: Bot, interaction: ButtonInteraction) => {
    const channel: TextChannel = interaction.channel as TextChannel
    if (!await isTicket(channel)) return await interaction.reply({
        content: undefined,
        ephemeral: true,
        embeds: [
            new EmbedBuilder()
                .setColor('#F11')
                .setDescription(`:x: Ce channel n'est pas un ticket !`)
        ]
    })

    close(channel)
        .then(async () => {
            await interaction.reply({
                content: undefined,
                embeds: [
                    new EmbedBuilder()
                        .setColor('#11F')
                        .setDescription(`Le ticket sera supprimé dans 5 secondes...`)
                ]
            })
        })
}, new ButtonOptions("Fermer", "🗑️", ButtonStyle.Danger))
