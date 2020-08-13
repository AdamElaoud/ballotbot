// invite link: https://discordapp.com/oauth2/authorize?&client_id=733764727053746187&scope=bot&permissions=8
// developer portal: https://discord.com/developers/applications
// discord.js API: https://discordjs.guide/
// launch command: nodemon --inspect ballotbot.js

// created by Adam Elaoud (Sap#5703)
// copyright (c) 2020

// require discord.js module
const Discord = require("discord.js");
//require dotenv-flow to load environment variables
require("dotenv-flow").config();
// create new client
const client = new Discord.Client();

// command prefix
const prefix = "!";

client.on("ready", () => {
	client.user.setActivity("❓ Use !votehelp");
});

const uniquenessWeight = 0.35;
const rarityWeight = 0.3;
const difficultyWeight = 0.15;
const personalEvalWeight = 0.2;

// !vote command
client.on("message", message => {
	// (FOR DEBUGGING)
	//console.log("Message Parsed [" + message.attachments.size + "]: \"" + message.content + "\"");

	// if another bot sent the message, do nothing
	if (message.author.bot)
		return;

	// collect prefix used
	let prefixCheck = message.content.substring(0);
	// parsing command and arguments beginning after the prefix
	let args = message.content.substring(prefix.length).split(/[\s|\r?\n|\r]/);
	args = args.filter(ele => ele !== "" && ele !== " ");

	// (FOR DEBUGGING) clear out \n characters
	//console.log(args);

	// parse command if proper prefix is used and there are no attachments (i.e. no only image messages)
	if (message.attachments.size == 0 && prefixCheck[0].localeCompare(prefix) == 0) {
		// checking command request
		switch(args[0]) {
			case "info":
				// allow usage only if user is the owner
				if (message.member.id.localeCompare("193427298958049280") == 0) {
					let servers = client.guilds.cache.array();
					let serverPrintout = "";

					servers.forEach(ele => serverPrintout += "\n:white_small_square:" + ele);

					message.channel.send(`Logged in as ${client.user.tag}!`
						+ `\nUsed in ${client.guilds.cache.size} servers:${serverPrintout}`);
					
				} else {
					message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
					+ "\nYou must be the bot owner to use this command!");
				}
				break;
			case "votehelp":
				// allow usage only if member is on the Nomination Committee
				if (message.member.roles.cache.some(role => role.name === "Nomination Committee")) {
					message.channel.send(":question: **━━━━━ VOTE HELP ━━━━━** :question:"
						+ "\n*Numbers must be within 0 and 5*"
						+ "\n*The order of values is important*"
						+ "\n\n:small_blue_diamond: To calculate your evaluation score, use the **!score** command:"
						+ "\n\n!score   [**uniqueness/creativity**]   [**rarity**]   [**difficulty**]   [**personal eval**]"
						+ "\n*Note: the \"!score\" command is not for voting, use the \"!vote\" command to submit a vote*"
						+ "\n\n> **ex.**\n> !score 2.5 1.3 4 3"
						+ "\n\n:small_blue_diamond: To submit a vote, use the **!vote** command:"
						+ "\n\n!vote   [**uniqueness/creativity**]   [**rarity**]   [**difficulty**]   [**personal eval**]   [**link to pet**]   [**reasoning**]"
						+ "\n\n> **ex.**\n> !vote 2.5 1.3 4 3 **link** Meh pet, joke of a submission lol");

				} else {
					message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
					+ "\nYou must be on the Nomination Committee to use this command!");
				}
				break;
			case "score":
				// allow usage only if member is on the Nomination Committee
				if (message.member.roles.cache.some(role => role.name === "Nomination Committee")) {

					// (FOR DEBUGGING)
					//console.log(args + "\n" + Number.isInteger(args[1]) + " " + Number.isInteger(args[2]) + " " + Number.isInteger(args[3]) + " " + Number.isInteger(args[4]));

					// if an invalid amount of scores are supplied
					if (args.length != 5) {
						message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
						+ "\nYou must enter **4 scores** with the \"!score\" command to have your evaluation calculated!"
						+ "\n*(Note: the \"!score\" command is not for voting, please use the \"!vote\" command to submit an evaluation)*");

					// if invalid scores are supplied
					} else if (args[1] < 0 || args[1] > 5 || args[2] < 0 || args[2] > 5 || args[3] < 0 || args[3] > 5 || args[4] < 0 || args[4] > 5
						|| !Number.isInteger(parseInt(args[1])) || !Number.isInteger(parseInt(args[2])) || !Number.isInteger(parseInt(args[3])) || !Number.isInteger(parseInt(args[4]))) {
						message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
						+ "\nScores must be **numbers** within **0** and **5**!");

					} else {
						let finalScore = ((args[1] / 5 * uniquenessWeight) + (args[2] / 5 * rarityWeight) + (args[3] / 5 * difficultyWeight) + (args[4] / 5 * personalEvalWeight)) * 5;
						message.channel.send(":ballot_box: **━━━━━ YOUR EVALUATION ━━━━━** :ballot_box:"
							+ "\nUniqueness/Creativity: "+ "**" + args[1] + "**"
							+ "\nRarity: " + "**" + args[2] + "**"
							+ "\nDifficulty To Make: " + "**" + args[3] + "**"
							+ "\nPersonal Evaluation: " + "**" + args[4] + "**"
							+ "\n\nOverall Score: " + "**" + finalScore.toFixed(2) + "** / 5");
						// delete command message after completion
						message.delete();
					}
				} else {
					message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
					+ "\nYou must be on the Nomination Committee to use this command!");
				}
				break;
			case "vote":
				// allow usage only if member is on the Nomination Committee
				if (message.member.roles.cache.some(role => role.name === "Nomination Committee")) {
					// if an invalid amount of scores are supplied
					if (args.length < 7) {
						message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
						+ "\nYou must enter **4 scores**, a **link**, and your **reasoning** with the \"!vote\" command to submit a vote!");

					// if invalid scores are supplied
					} else if (args[1] < 0 || args[1] > 5 || args[2] < 0 || args[2] > 5 || args[3] < 0 || args[3] > 5 || args[4] < 0 || args[4] > 5
						|| !Number.isInteger(parseInt(args[1])) || !Number.isInteger(parseInt(args[2])) || !Number.isInteger(parseInt(args[3])) || !Number.isInteger(parseInt(args[4]))) {
						message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
						+ "\nScores must be **numbers** within **0** and **5**!");

					} else {
						let finalScore = ((args[1] / 5 * uniquenessWeight) + (args[2] / 5 * rarityWeight) + (args[3] / 5 * difficultyWeight) + (args[4] / 5 * personalEvalWeight)) * 5;
						let reasoning = "";
						let i;

						for (i = 0; i < args.length - 6; i++) {
							reasoning += args[6 + i] + " ";
						}

						message.channel.send(":ballot_box: **━━━━━ PET EVALUATION ━━━━━** :ballot_box:"
							+ "\nUniqueness/Creativity: "+ "**" + args[1] + "**"
							+ "\nRarity: " + "**" + args[2] + "**"
							+ "\nDifficulty To Make: " + "**" + args[3] + "**"
							+ "\nPersonal Evaluation: " + "**" + args[4] + "**"
							+ "\n\n**Overall Score:** " + finalScore.toFixed(2) + " / 5"
							+ "\n**Reviewer:** <@" + message.author.id + ">"
							+ "\n**Pet:** " + args[5]
							+ "\n**Reasoning:** " + reasoning);
						// delete command message after completion
						message.delete();
					}
				} else {
					message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
					+ "\nYou must be on the Nomination Committee to use this command!");
				}
				break;
			case "evaluate7":
				// allow usage only if member is on the Nomination Committee
				if (message.member.roles.cache.some(role => role.name === "Nomination Committee")) {

					// if an invalid amount of scores are supplied
					if (args.length != 9) {
						message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
						+ "\nYou must enter **7 scores** and a **link** with the \"!evaluate7\" command to evaluate if a pet enters the hall of fame!");

					// if invalid scores are supplied
					} else if (args[1] < 0 || args[1] > 5 || args[2] < 0 || args[2] > 5 || args[3] < 0 || args[3] > 5 || args[4] < 0 || args[4] > 5 || args[5] < 0 || args[5] > 5
						|| args[6] < 0 || args[6] > 5 || args[7] < 0 || args[7] > 5
						|| !Number.isInteger(parseInt(args[1])) || !Number.isInteger(parseInt(args[2])) || !Number.isInteger(parseInt(args[3])) || !Number.isInteger(parseInt(args[4]))
						|| !Number.isInteger(parseInt(args[5])) || !Number.isInteger(parseInt(args[6])) || !Number.isInteger(parseInt(args[7]))) {
						message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
						+ "\nScores must be **numbers** within **0** and **5**!");

					} else {
						let finalEval = (parseFloat(args[1]) + parseFloat(args[2]) + parseFloat(args[3]) + parseFloat(args[4]) + parseFloat(args[5]) + parseFloat(args[6]) + parseFloat(args[7])) / 7;
						let post = ":ballot_box: **━━━━━ HALL OF FAME EVALUATION ━━━━━** :ballot_box:"
							+ "\n**Final Evaluation:** " + finalEval.toFixed(2) + " / 5"
							+ "\n**Pet:** " + args[8];

						if (finalEval >= 3.5) {
							post += "\n**Status:** This pet **enters** the 🏆hall-of-fame!";
						} else {
							post += "\n**Status:** This pet **does not enter** the 🏆hall-of-fame!";
						}

						message.channel.send(post);
					}
				} else {
					message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
					+ "\nYou must be on the Nomination Committee to use this command!");
				}

				// delete command message after completion
				message.delete();
				break;
			case "evaluate6":
				// allow usage only if member is on the Nomination Committee
				if (message.member.roles.cache.some(role => role.name === "Nomination Committee")) {

					// if an invalid amount of scores are supplied
					if (args.length != 8) {
						message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
						+ "\nYou must enter **6 scores** and a **link** with the \"!evaluate6\" command to evaluate if a pet enters the hall of fame!");

					// if invalid scores are supplied
					} else if (args[1] < 0 || args[1] > 5 || args[2] < 0 || args[2] > 5 || args[3] < 0 || args[3] > 5 || args[4] < 0 || args[4] > 5 || args[5] < 0 || args[5] > 5
						|| args[6] < 0 || args[6] > 5
						|| !Number.isInteger(parseInt(args[1])) || !Number.isInteger(parseInt(args[2])) || !Number.isInteger(parseInt(args[3])) || !Number.isInteger(parseInt(args[4]))
						|| !Number.isInteger(parseInt(args[5])) || !Number.isInteger(parseInt(args[6]))) {
						message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
						+ "\nScores must be **numbers** within **0** and **5**!");

					} else {
						let finalEval = (parseFloat(args[1]) + parseFloat(args[2]) + parseFloat(args[3]) + parseFloat(args[4]) + parseFloat(args[5]) + parseFloat(args[6])) / 6;
						let post = ":ballot_box: **━━━━━ HALL OF FAME EVALUATION ━━━━━** :ballot_box:"
							+ "\n**Final Evaluation:** " + finalEval.toFixed(2) + " / 5"
							+ "\n**Pet:** " + args[7];

						if (finalEval >= 3.5) {
							post += "\n**Status:** This pet **enters** the 🏆hall-of-fame!";
						} else {
							post += "\n**Status:** This pet **does not enter** the 🏆hall-of-fame!";
						}

						message.channel.send(post);
					}
				} else {
					message.channel.send(":exclamation: **━━━━━ ERROR ━━━━━** :exclamation:"
					+ "\nYou must be on the Nomination Committee to use this command!");
				}

				// delete command message after completion
				message.delete();
				break;
		}
	}
});

// login to Discord with bot token
client.login(process.env.BALLOTBOTTOKEN);