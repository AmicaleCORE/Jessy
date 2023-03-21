import {Button, ButtonOptions} from "~/framework/structures/Component";
import Bot from "~/framework/structures/Bot";
import {ButtonInteraction, ButtonStyle, EmbedBuilder, TextChannel} from "discord.js";
import {isTicket, setType} from "~/framework/functions/Tickets";
import {TicketType} from "~/framework/database/enums/TicketType";

module.exports = new Button("btn-type-event", async (bot: Bot, interaction: ButtonInteraction) => {
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

    setType(channel, TicketType.EVENTS)
        .then(async () => {
            await interaction.reply({
                content: undefined,
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setColor('#1F1')
                        .setDescription(`:white_check_mark: Type sélectionné : Événement.`)
                ]
            })
        })
}, new ButtonOptions("Événement", "🧭", ButtonStyle.Secondary))
