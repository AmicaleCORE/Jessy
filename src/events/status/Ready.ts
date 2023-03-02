import Event from "~/framework/structures/Event";
import Bot from "~/framework/structures/Bot";
import {ActivityType, Guild} from "discord.js";

module.exports = new Event("ready", (bot: Bot) => {
    bot.user?.setPresence({
        activities: [
            {
                name: 'GitHub',
                type: ActivityType.Watching,
                url: 'https://www.github.com/SkillSwap-Service/TPL-Discord-Bot'
            }
        ]
    })

    const guild: Guild | undefined = bot.guilds.cache.get(process.env.GUILD_ID || '1075182284338118789')
    guild?.commands.set(bot.commands.map(cmd => cmd))
}, true)