import {Menu, MenuField, MenuOptions} from "~/framework/structures/Component";
import Bot from "~/framework/structures/Bot";
import {SelectMenuInteraction} from "discord.js";

module.exports = new Menu("menu-sample", async (bot: Bot, interaction: SelectMenuInteraction, placeholder?: string) => {
    await interaction.reply({
        content: interaction.values.toString(),
        ephemeral: true
    })
}, [
    new MenuField("lvl1", '😀', "Niveau 1", "Premier niveau de jeu."),
    new MenuField("lvl2", '😎', "Niveau 10", "Dixième niveau de jeu."),
    new MenuField("lvl3", '🤯', "Niveau 100", "Centième niveau de jeu.")
], new MenuOptions(false, "Yolo", 1, 2))