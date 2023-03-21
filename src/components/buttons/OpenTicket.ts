import {Button, ButtonOptions} from "~/framework/structures/Component";
import Bot from "~/framework/structures/Bot";
import {
    ButtonInteraction,
    PermissionFlagsBits,
    ChannelType,
    ButtonStyle,
    EmbedBuilder
} from "discord.js";
import {createTicket} from "~/framework/functions/Tickets";

module.exports = new Button("btn-create-ticket", async (bot: Bot, interaction: ButtonInteraction) => {
    createTicket(bot, interaction)
        .then(async () => {
            await interaction.reply({
                content: undefined,
                embeds: [
                    new EmbedBuilder()
                        .setColor('#1F1')
                        .setDescription(":white_check_mark: Le ticket a été ouvert !")
                ],
                ephemeral: true
            })
        }).catch(async (error: Error) => {
            if (error.message.includes("Member")) return await interaction.reply({
                content: undefined,
                embeds: [
                    new EmbedBuilder()
                        .setColor('#F11')
                        .setDescription(":x: Mais, t'es où ?")
                ],
                ephemeral: true
            })
            if (error.message.includes("Guild")) return await interaction.reply({
                content: undefined,
                embeds: [
                    new EmbedBuilder()
                        .setColor('#F11')
                        .setDescription(":x: Jessy, nous avons un problème...")
                ],
                ephemeral: true
            })
            await interaction.reply({
                content: undefined,
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setColor("#F11")
                        .setDescription(":x: Une erreur est survenue...")
                ]
            })
        })
}, new ButtonOptions(
    "Créer un ticket",
    "📩",
    ButtonStyle.Secondary
))
