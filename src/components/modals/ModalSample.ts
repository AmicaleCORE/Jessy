import {Modal, ModalOptions, TextInput, TextInputOptions} from "~/framework/structures/Component";
import Bot from "~/framework/structures/Bot";
import {ModalSubmitInteraction, TextInputStyle} from "discord.js";

module.exports = new Modal("modal-sample", async (bot: Bot, interaction: ModalSubmitInteraction, placeholder?: string) => {
    await interaction.reply({
        content: interaction.fields.getTextInputValue("modal-input-sample"),
        ephemeral: true
    })
}, new ModalOptions("Welcome!", [
    new TextInput("modal-input-sample", "Nickname", new TextInputOptions(TextInputStyle.Short, undefined, undefined, true))
]))