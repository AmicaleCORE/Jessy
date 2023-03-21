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
                .setTitle(`Tickets`)
                .setDescription(`Bienvenue dans notre système de tickets.
                
                **__Pourquoi ont-ils été fais__ ?**
                :point_right: Les tickets sont faits pour proposer des choses, discuter et centraliser les informations d'un événement en particulier ou tout simplement d'un projet.
                Ils sont avant tout un outil nous permettant de gagner en qualité de notre organisation mais également supprimer du contenu dont nous n'avons plus besoin une fois l'événement passé ou le projet terminé.
                
                **__Comment créer un ticket__ ?**
                :point_right: Ils vous suffit de cliquer sur le bouton attaché à ce message et suivre les informations qui vous seront données par la suite.
                
                Merci d'utiliser le Bot à bon escient et de ne pas en abuser.
                :warning: **Tout abus sera sanctionné !**`)
                .setColor('#438fc9')
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
