import {Button, ButtonOptions} from "~/framework/structures/Component";
import Bot from "~/framework/structures/Bot";
import {ButtonInteraction} from "discord.js";

module.exports = new Button("button-sample", async (bot: Bot, interaction: ButtonInteraction, placeholder?: string) => {
    await interaction.showModal(require('~/components/modals/ModalSample').build())
}, new ButtonOptions("Click to see", "👀"))