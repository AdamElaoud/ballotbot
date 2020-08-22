// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "help",
    description: "provides info on all commands for Ballotbot",
    execute(msg) {
        // allow usage only if member is on the Nomination Committee
        if (msg.member.roles.cache.some(role => role.id === Data.nominationId)) {
            const embed = new Discord.MessageEmbed()
            .setColor("#FFD983")
            .setTitle(":scroll: **━━━━━ VOTE HELP ━━━━━** :scroll:")
            .setDescription(`*List of Ballotbot's commands (prefix is: **${Data.prefix}**)*`
                + `\n\n:small_blue_diamond: **${Data.prefix}vote**`
                + `\n*submit a nomination vote*`
                + `\n\n> ${Data.prefix}vote [**unique/creative**] [**rare**] [**difficult**] [**personal eval**] [[**link**](https://empty)] [**reason**]`
                + `\n> **ex.**\n> ${Data.prefix}vote 2.5 1.3 4 3 [**link**](https://empty) Meh pet, joke of a submission lol`
                + `\n\n:small_blue_diamond: **${Data.prefix}score**`
                + `\n*preview your evaluation score*`
                + `\n\n> ${Data.prefix}score [**unique/creative**] [**rare**] [**difficult**] [**personal eval**]`
                + `\n> **ex.**\n> ${Data.prefix}score 2.5 1.3 4 3`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed);

        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`You must be on the ${Data.nominationMention} to use this command!`)
            .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed);
        }
    }
}