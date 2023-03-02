import Command from "~/framework/structures/Command";
import Bot from "~/framework/structures/Bot";
import {CommandInteraction,ApplicationCommandOptionType} from "discord.js";

module.exports = new Command("sample", async (bot: Bot, interaction: CommandInteraction) => {
    const customName: string | null = interaction.options.get("custom-name")?.value as string | null

    if (!customName)
        return await interaction.reply({
            content: `No custom name given!`,
            ephemeral: true
        })

    await interaction.reply({
        content: `You're now registered as **${customName}** :clap:`,
        ephemeral: true
    })
}, {
    description: "Remove this command in your new bot.",
    category: "Sample",
    options: [
        {
            required: true,
            name: "custom-name",
            description: "Enter your custom name.",
            type: ApplicationCommandOptionType.String
        }
    ]
})