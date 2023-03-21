import {models} from "~/framework/database/Orm";
import {ChannelType, Guild, Interaction, PermissionFlagsBits, TextChannel} from "discord.js";
import Bot from "~/framework/structures/Bot";

export async function createTicket(bot: Bot, interaction: Interaction): Promise<TextChannel> {
    const { TICKETS_PARENT_CATEGORY } = process.env
    const member = interaction.member
    const guild: Guild | null = interaction.guild

    if (!guild) throw new Error("Guild not found!")
    if (!member) throw new Error("Member not found!")

    const channel: TextChannel = await guild.channels.create({
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
    await models.ticket.create({
        channel_id: channel.id,
        creator_id: member.user.id
    })

    return channel
}
