// require discord.js module
const Discord = require("discord.js");
// require data.js module
const Data = require("../data.js");

module.exports = {
    name: "vote",
    description: "submits vote for hall of fame nominee",
    execute(msg, args) {
        // allow usage only if member is on the Nomination Committee
        if (msg.member.roles.cache.some(role => role.id === Data.nominationId)) {
            // if an invalid amount of scores are supplied
            if (args.length < 6) {
                const embed = new Discord.MessageEmbed()
                .setColor("#DD2E44")
                .setTitle(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:")
                .setDescription(`You must enter **4 scores**, a [**link**](https://empty), and your **reasoning** with the **${Data.prefix}vote** command to submit a vote!`)
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
                let link = args.shift();
                let reasoning = args.join(" ");

                let finalScore = ((unique / 5 * Data.uniqueness) + (rarity / 5 * Data.rarity) + (diff / 5 * Data.difficulty) + (eval / 5 * Data.personal)) * 5;

                const embed = new Discord.MessageEmbed()
                .setColor("#00A3C2")
                .setTitle(":ballot_box: **━━━━━ VOTE SUBMISSION ━━━━━** :ballot_box:")
                .setDescription("\nUniqueness/Creativity: "+ "**" + unique + "**"
                    + "\nRarity: " + "**" + rarity + "**"
                    + "\nDifficulty To Make: " + "**" + diff + "**"
                    + "\nPersonal Evaluation: " + "**" + eval + "**"
                    + "\n\n**Overall Score:** " + finalScore.toFixed(2) + " / 5"
                    + "\n**Reviewer:** <@" + msg.author.id + ">"
                    + "\n**Pet:** [Link](" + link + ")"
                    + "\n**Reasoning:** " + reasoning)
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