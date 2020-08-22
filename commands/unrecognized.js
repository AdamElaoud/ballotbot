// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "unrecognized",
    description: "incorrect command output for Ballot Bot",
    execute(msg, cmd) {
        const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`Unrecognized command: **${cmd}**`
                            + `\n\nUse the **${Data.prefix}help** command for a list of Ballotbot's commands`)
            .addField("\u200b", "\u200b")
            .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed);
    }
}