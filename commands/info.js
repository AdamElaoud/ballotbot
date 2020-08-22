// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "info",
    description: "Developer data for Ballot Bot",
    execute(bot, msg) {
        // allow usage only if user is the owner (below ID is @Sap#5703's ID)
        if (msg.member.id == Data.ownerId) {
            let servers = bot.guilds.cache.array();
            let serverPrintout = "";

            servers.forEach(ele => serverPrintout += "\n:white_small_square:" + ele.name);

            const embed = new Discord.MessageEmbed()
            .setColor("#00A3C2")
            .setTitle(":chart_with_upwards_trend: **━━━━━ BOT DATA ━━━━━** :chart_with_upwards_trend:")
            .setDescription(`Logged in as **${bot.user.tag}**!`
                        + `\nUsed in **${bot.guilds.cache.size}** server(s):${serverPrintout}`)
            .addField("\u200b", "\u200b")
            .setFooter(footer, footerImage);

            msg.channel.send(embed);

        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`You must be the bot owner, ${Data.ownerMention} to use this command!`)
            .setFooter(footer, footerImage);

            msg.channel.send(embed);
        }
    }
}