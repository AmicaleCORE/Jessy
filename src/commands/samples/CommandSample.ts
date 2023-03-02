import Command from "~/framework/structures/Command";
import Bot from "~/framework/structures/Bot";
import {
    CommandInteraction,
    ApplicationCommandOptionType,
    ActionRowBuilder,
    ButtonBuilder,
    SelectMenuBuilder
} from "discord.js";

module.exports = new Command("sample", async (bot: Bot, interaction: CommandInteraction) => {
    const customName: string | null = interaction.options.get("custom-name")?.value as string | null

    if (!customName)
        return await interaction.reply({
            content: `No custom name given!`,
            ephemeral: true
        })

    await interaction.reply({
        content: `You're now registered as **${customName}** :clap:`,
        ephemeral: true,
        components: [
            new ActionRowBuilder<SelectMenuBuilder>().setComponents(require('~/components/menus/MenuSample').build()),
            new ActionRowBuilder<ButtonBuilder>().setComponents(require('~/components/buttons/ButtonSample').build())
        ]
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