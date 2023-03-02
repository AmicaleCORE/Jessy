import Event from "~/framework/structures/Event";
import Bot from "~/framework/structures/Bot";
import {ButtonInteraction} from "discord.js";
import {Button} from "~/framework/structures/Component";

module.exports = new Event("interactionCreate", async (bot: Bot, interaction: ButtonInteraction) => {
    if (!interaction.isButton())
        return

    const customId: string = interaction.customId
    const id: string = customId.includes('%') ? customId.split('%')[0] : customId
    const placeholder: string | undefined = customId.includes('%') ? customId.split('%')[1] : undefined

    const component: Button | undefined = bot.buttons.get(id)
    if (!component) return
    await component.callback(bot, interaction, placeholder)
})