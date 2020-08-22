// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "score",
    description: "previews score calculation for hall of fame voting",
    execute(msg, args) {
        // allow usage only if member is on the Nomination Committee
        if (msg.member.roles.cache.some(role => role.id === Data.nominationId)) {
            // if an invalid amount of scores are supplied
            if (args.length != 4) {
                const embed = new Discord.MessageEmbed()
                .setColor("#DD2E44")
                .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
                .setDescription(`You must enter **ONLY 4 scores** with the **${Data.prefix}score** command to preview your evaluation score!`
                    + `\n\n*Note: the **${Data.prefix}score** command is **NOT** for voting, please use the **${Data.prefix}vote** command to submit an evaluation*`)
                    .setFooter(Data.footer.text, Data.footer.image);

                msg.channel.send(embed);

            // if invalid scores are supplied
            } else if (!Data.checkInput(args[0], args[1], args[2], args[3])) {
                const embed = new Discord.MessageEmbed()
                .setColor("#DD2E44")
                .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
                .setDescription("Scores must be **numbers** within **0** and **5**!")
                .setFooter(Data.footer.text, Data.footer.image);

                msg.channel.send(embed);

            } else {
                let unique = args.shift();
                let rarity = args.shift();
                let diff = args.shift();
                let eval = args.shift();

                let finalScore = ((unique / 5 * Data.uniqueness) + (rarity / 5 * Data.rarity) + (diff / 5 * Data.difficulty) + (eval / 5 * Data.personal)) * 5;

                const embed = new Discord.MessageEmbed()
                .setColor("#D5AB88")
                .setTitle(":abacus: **━━━━━ SCORE CALCULATION ━━━━━** :abacus:")
                .setDescription("Uniqueness/Creativity: "+ "**" + unique + "**"
                    + "\nRarity: " + "**" + rarity + "**"
                    + "\nDifficulty To Make: " + "**" + diff + "**"
                    + "\nPersonal Evaluation: " + "**" + eval + "**"
                    + "\n\nOverall Score: " + "**" + finalScore.toFixed(2) + "** / 5")
                .addField("\u200b", "\u200b")
                .setFooter(Data.footer.text, Data.footer.image);

                msg.channel.send(embed);
                
                // delete command message after completion
                msg.delete();
            }
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