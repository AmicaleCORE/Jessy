import Event from "~/framework/structures/Event";
import Bot from "~/framework/structures/Bot";
import {SelectMenuInteraction} from "discord.js";
import {Menu} from "~/framework/structures/Component";

module.exports = new Event("interactionCreate", async (bot: Bot, interaction: SelectMenuInteraction) => {
    if (!interaction.isAnySelectMenu())
        return

    const customId: string = interaction.customId
    const id: string = customId.includes('%') ? customId.split('%')[0] : customId
    const placeholder: string | undefined = customId.includes('%') ? customId.split('%')[1] : undefined

    const component: Menu | undefined = bot.menus.get(id)
    if (!component) return
    await component.callback(bot, interaction, placeholder)
})