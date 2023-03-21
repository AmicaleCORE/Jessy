import Bot from "~/framework/structures/Bot";
import {CommandInteraction, ApplicationCommandOptionType, TextChannel, User, EmbedBuilder} from "discord.js";
import Command from "~/framework/structures/Command";
import {isTicket, unAssignUser} from "~/framework/functions/Tickets";

module.exports = new Command("unassign", async (bot: Bot, interaction: CommandInteraction) => {
    const channel: TextChannel = interaction.channel as TextChannel
    if (!await isTicket(channel)) return await interaction.reply({
        content: ':x:',
        ephemeral: true
    })

    const user: User | null = interaction.options.getUser('user')
    if (!user) return await interaction.reply({
        content: undefined,
        ephemeral: true,
        embeds: [
            new EmbedBuilder()
                .setColor('#F11')
                .setDescription(`:x: Aucun utilisateur donné, c'est du foutage de gueule mon petit !`)
        ]
    })

    unAssignUser(channel, user)
        .then(async () => {
            await interaction.reply({
                content: undefined,
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setColor('#F11')
                        .setDescription(`:white_check_mark: Utilisateur <@${user.id}> retiré du ticket !`)
                ]
            })
        })
        .catch((error: Error) => {
            console.log(error)
        })
}, {
    description: "Retire l'assignation d'un utilisateur.",
    category: "Tickets",
    options: [
        {
            name: "user",
            description: "Utilisateur à retirer du ticket.",
            required: true,
            type: ApplicationCommandOptionType.User
        }
    ]
})
