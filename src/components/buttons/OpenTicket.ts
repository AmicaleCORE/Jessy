import {Button, ButtonOptions} from "~/framework/structures/Component";
import Bot from "~/framework/structures/Bot";
import {
    ButtonInteraction,
    PermissionFlagsBits,
    ChannelType,
    ButtonStyle,
    EmbedBuilder,
    Guild,
    TextChannel
} from "discord.js";
import {createTicket} from "~/framework/functions/Tickets";

module.exports = new Button("btn-create-ticket", async (bot: Bot, interaction: ButtonInteraction) => {
    const { TICKETS_PARENT_CATEGORY } = process.env
    const member = interaction.member
    const guild: Guild | null = interaction.guild

    if (!guild) return await interaction.reply({
        content: undefined,
        embeds: [
            new EmbedBuilder()
                .setDescription(":x: Impossible de trouver ton serveur mon petit...")
                .setColor('#F11')
        ],
        ephemeral: true
    })
    if (!member) return await interaction.reply({
        content: undefined,
        embeds: [
            new EmbedBuilder()
                .setDescription(":x: Le membre, il existe au moins ?")
                .setColor('#F11')
        ],
        ephemeral: true
    })

    guild.channels.create({
        name: '📩・ticket',
        reason: "Ouverture d'un ticket par le membre du bureau (ou étendu)",
        type: ChannelType.GuildText,
        parent: TICKETS_PARENT_CATEGORY || '1060264157091479704',
        permissionOverwrites: [
            {
                id: guild.roles.everyone,
                deny: [
                    PermissionFlagsBits.ViewChannel
                ],
                allow: [
                    PermissionFlagsBits.UseApplicationCommands,
                    PermissionFlagsBits.EmbedLinks,
                    PermissionFlagsBits.AttachFiles,
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ReadMessageHistory
                ]
            },
            {
                id: bot.user?.id || '1087493802383650867',
                allow: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.ManageChannels
                ]
            },
            {
                id: member.user.id,
                allow: [
                    PermissionFlagsBits.ViewChannel
                ]
            }
        ]
    })
        .then(async (channel: TextChannel) => {
            if (!channel) return await interaction.reply({
                content: undefined,
                embeds: [
                    new EmbedBuilder()
                        .setColor('#F11')
                        .setDescription(":x: Impossible de trouver le channel que je viens de créer... Merde !")
                ],
                ephemeral: true
            })

            createTicket(channel.id, member.user.id).then(async () => {
                await channel.send({
                    content: `|| <@${member.user.id}> ||`,
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(":timer: Coming soon...")
                    ]
                })
                await interaction.reply({
                    content: undefined,
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#1F1')
                            .setDescription(":white_check_mark: Le ticket a été ouvert !")
                    ],
                    ephemeral: true
                })
            }).catch((error: Error) => {
                console.log(error)
            })
        })
}, new ButtonOptions(
    "Créer un ticket",
    "📩",
    ButtonStyle.Secondary
))
