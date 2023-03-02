import Bot from "~/framework/structures/Bot";
import Event from "~/framework/structures/Event";
import {ModalSubmitInteraction} from "discord.js";
import {Modal} from "~/framework/structures/Component";

module.exports = new Event("interactionCreate", async (bot: Bot, interaction: ModalSubmitInteraction) => {
    if (!interaction.isModalSubmit())
        return

    const customId: string = interaction.customId
    const id: string = customId.includes('%') ? customId.split('%')[0] : customId
    const placeholder: string | undefined = customId.includes('%') ? customId.split('%')[1] : undefined

    const component: Modal | undefined = bot.modals.get(id)
    if (!component) return
    await component.callback(bot, interaction, placeholder)
})