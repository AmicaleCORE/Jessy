import Command from "~/framework/structures/Command";
import Bot from "~/framework/structures/Bot";
import {ActionRowBuilder, ButtonBuilder, CommandInteraction, EmbedBuilder, Guild} from "discord.js";

module.exports = new Command("setup", async (bot: Bot, interaction: CommandInteraction) => {
    const { CREATE_TICKET_CHANNEL } = process.env
    const guild: Guild | null = interaction.guild
    const channel: any = await guild?.channels.cache.get(CREATE_TICKET_CHANNEL || '1060523352105697390')

    if (!channel) return await interaction.reply({
        content: undefined,
        embeds: [
            new EmbedBuilder()
                .setDescription(":x: J'crois que tu ne cherches pas au bon endroit !")
                .setColor('#F11')
        ],
        ephemeral: true
    })

    channel.send({
        content: undefined,
        embeds: [
            new EmbedBuilder()
                .setDescription(":timer: Coming soon...")
        ],
        components: [
            new ActionRowBuilder<ButtonBuilder>().setComponents(require('~/components/buttons/OpenTicket').build())
        ]
    })
        .then(async () => {
            await interaction.reply({
                content: undefined,
                embeds: [
                    new EmbedBuilder()
                        .setDescription(":white_check_mark: Les consignes ont été transmises ! Bip boup...")
                        .setColor('#1F1')
                ],
                ephemeral: true
            })
        })
}, {
    description: "*Balancer du dossier sur les tickets.",
    category: 'Generics'
})
