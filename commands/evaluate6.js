// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "evaluate6",
    description: "completes final evaluation for hall of fame nominees",
    execute(msg, args) {
        // allow usage only if member is on the Nomination Committee
        if (msg.member.roles.cache.some(role => role.id === Data.nominationId)) {
            // if an invalid amount of scores are supplied
            if (args.length != 7) {
                const embed = new Discord.MessageEmbed()
                .setColor("#DD2E44")
                .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
                .setDescription(`You must enter **6 scores** and a [**link**](https://empty) with the **${Data.prefix}evaluate6** command to evaluate if a pet enters the ${Data.hallMention}!`)
                .setFooter(Data.footer.text, Data.footer.image);

                msg.channel.send(embed);

            // if invalid scores are supplied
            } else if (!module.exports.checkInput6(args[0], args[1], args[2], args[3], args[4], args[5])) {
                const embed = new Discord.MessageEmbed()
                .setColor("#DD2E44")
                .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
                .setDescription("Scores must be **numbers** within **0** and **5**!")
                .setFooter(Data.footer.text, Data.footer.image);

                msg.channel.send(embed);

            } else {
                let score1 = parseFloat(args.shift());
                let score2 = parseFloat(args.shift());
                let score3 = parseFloat(args.shift());
                let score4 = parseFloat(args.shift());
                let score5 = parseFloat(args.shift());
                let score6 = parseFloat(args.shift());
                let link = args.shift();

                let finalEval = (score1 + score2 + score3 + score4 + score5 + score6) / 6;
                let post = "**Final Evaluation:** " + finalEval.toFixed(2) + " / 5"
                    + "\n**Pet:** [Link](" + link + ")";

                if (finalEval >= 3.5) {
                    post += `\n**Status:** This pet **enters** the ${Data.hallMention}!`;
                } else {
                    post += `\n**Status:** This pet **does not enter** the ${Data.hallMention}!`;
                }

                const embed = new Discord.MessageEmbed()
                .setColor("#FFCC4D")
                .setTitle(":trophy: **━━━━━ HALL OF FAME EVALUATION ━━━━━** :trophy:")
                .setDescription(post)
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.text, Data.footer.image);

                msg.channel.send(embed);
            }
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("#DD2E44")
            .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
            .setDescription(`You must be on the ${Data.nominationMention} to use this command!`)
            .setFooter(Data.footer.text, Data.footer.image);

            msg.channel.send(embed);
        }
    },
    checkInput6(val1, val2, val3, val4, val5, val6) {
        // if scores are not numbers or are out of bounds
        if (!Number.isInteger(parseInt(val1)) || !Number.isInteger(parseInt(val2)) || !Number.isInteger(parseInt(val3)) || !Number.isInteger(parseInt(val4))
            || !Number.isInteger(parseInt(val5)) || !Number.isInteger(parseInt(val6)) || val1 < 0 || val1 > 5 || val2 < 0 || val2 > 5 || val3 < 0 || val3 > 5 
            || val4 < 0 || val4 > 5 || val5 < 0 || val5 > 5 || val6 < 0 || val6 > 5) {
            return false;
        }

        return true;
    }
}