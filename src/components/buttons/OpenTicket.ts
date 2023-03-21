import {Button, ButtonOptions} from "~/framework/structures/Component";
import Bot from "~/framework/structures/Bot";
import {ButtonInteraction, lazy} from "discord.js";

module.exports = new Button("btn-create-ticket", (bot: Bot, interaction: ButtonInteraction) => {
    // TODO: create ticket
    console.log(`Ticket creation initiated by: ${interaction.member?.user.username}`)
}, new ButtonOptions(
    "Créer un ticket",
    "📩"
))
