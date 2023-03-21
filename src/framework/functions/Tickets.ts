import {models} from "~/framework/database/Orm";
import {
    ActionRowBuilder, ButtonBuilder,
    ChannelType,
    EmbedBuilder,
    Guild,
    Interaction,
    PermissionFlagsBits,
    TextChannel,
    User
} from "discord.js";
import Bot from "~/framework/structures/Bot";
import {TicketType} from "~/framework/database/enums/TicketType";

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
        parent: TICKETS_PARENT_CATEGORY || '1060264157091479704'
    })

    await channel.send({
        content: `|| <@${member?.user.id}> ||`,
        embeds: [
            new EmbedBuilder()
                .setDescription(`:timer: Coming soon...`)
        ],
        components: [
            new ActionRowBuilder<ButtonBuilder>().setComponents(
                require('~/components/buttons/types/Event').build()
            ),
            new ActionRowBuilder<ButtonBuilder>().setComponents(
                require('~/components/buttons/CloseTicket').build()
            )
        ]
    })

    await channel.permissionOverwrites.create(guild.roles.everyone, {
        ViewChannel: false,
        SendMessages: true,
        EmbedLinks: true,
        AttachFiles: true,
        UseApplicationCommands: true,
        AddReactions: true,
        UseExternalEmojis: true
    })
    await channel.permissionOverwrites.create(member.user as User, {
        ViewChannel: true
    })

    await models.ticket.create({
        channel_id: channel.id,
        creator_id: member.user.id
    })

    return channel
}

export async function isTicket(channel: TextChannel): Promise<boolean> {
    return await models.ticket.findOne({ where: { channel_id: channel.id } })
}

export async function assignUser(channel: TextChannel, user: User): Promise<any> {
    const ticket: any = await models.ticket.findOne({ where: { channel_id: channel.id } })
    if (!ticket) throw new Error("Not found!")
    await channel.permissionOverwrites.create(user, {
        ViewChannel: true
    })

    return models.assign.create({
        ticket_id: ticket.id,
        user_id: user.id
    })
}

export async function unAssignUser(channel: TextChannel, user: User): Promise<any> {
    const ticket: any = await models.ticket.findOne({ where: { channel_id: channel.id } })
    if (!ticket) throw new Error("Not found!")
    await channel.permissionOverwrites.delete(user)

    return models.assign.destroy({ where: { ticket_id: ticket.id, user_id: user.id } })
}

export async function setType(channel: TextChannel, type: TicketType) {
    const ticket: any = await models.ticket.findOne({ where: { channel_id: channel.id } })
    if (!ticket) throw new Error("Not found!")

    return models.ticket.update({ type }, { where: { id: ticket.id } })
}

export async function close(channel: TextChannel) {
    const ticket: any = await models.ticket.findOne({ where: { channel_id: channel.id } })
    if (!ticket) throw new Error("Not found!")
    setTimeout(async () => await channel.delete(), 5000)

    return models.ticket.update({ channel_id: null }, { where: { id: ticket.id } })
}
