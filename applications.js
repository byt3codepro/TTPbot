//©raltec 2021
//Heroku logs: https://dashboard.heroku.com/apps/ttp-bot-app/logs
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1dDs1zvYx4KUEwB1B9qRSsana0rRLw1UsPsaXUl7PF3g');
	
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
	const prefix = "/";
	
	if (message.guild === null) {
		receivedm(message)
	} else {
		if (message.content.startsWith(prefix)) {
			if (message.content == prefix + "results") {
				results(message)
			} else
			if (message.content == prefix + "dm") {
				dm(message)
			}
		}
	}
});

async function results(message) {
	var editor = ["746662409724231798","482586747201519617"]; //application editor Used IDs (can use /results cmd)
	if (editor.includes(message.author.id) == true) {
		// Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
		await doc.useServiceAccountAuth({
			client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			private_key: process.env.GOOGLE_PRIVATE_KEY,
		});
		await doc.loadInfo(); // loads document properties and worksheets
		const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
		await sheet.loadCells();
		const guild = await client.guilds.fetch('705686666043457606')
		for (let i = 2; i < 250; i++) {
			var resultsembed
			var reasons = ""
			var applicant
			const mark = sheet.getCellByA1('A' + i);
			const sent = sheet.getCellByA1('B' + i);
			const comments = sheet.getCellByA1('C' + i);
			const grammarfail = sheet.getCellByA1('D' + i);
			const tooshortfail = sheet.getCellByA1('E' + i);
			const appsforroleclosedfail = sheet.getCellByA1('F' + i);
			const unsatisfyingfail = sheet.getCellByA1('G' + i);
			const toomanyerrorsfail = sheet.getCellByA1('H' + i);
			const robloxuser = sheet.getCellByA1('L' + i);
			const tag = sheet.getCellByA1('M' + i);
			const rank = sheet.getCellByA1('P' + i);
			try {
				applicant = guild.members.cache.find((member) => member.user.tag == tag.value)
			} catch(err) {
				console.error(err)
			}
			if (mark.value === null) {
				break;
			} else {
				if (sent.value === "☐") {
					if (comments.value === null) {
						if (mark.value === "PASSED") {
							resultsembed = new Discord.MessageEmbed()
							.setColor('#2dcc70') //RED - #E74C3C | ORANGE - #CA6F1E | LUGANE GREEN - #2DCC70
							.setTitle("Application " + mark.value)
							.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. We're happy to announce that your application for " + rank.value + " within LAP has been **approved**. Information about training and ranking in the Roblox group and our Discord server will be done soon.")
							.setFooter('For any questions, feedback or errors - reply in this DM');
						} else if (mark.value === "AWAITING FURTHER CLARIFICATION") {
							resultsembed = new Discord.MessageEmbed()
							.setColor('#CA6F1E')
							.setTitle("Application " + mark.value)
							.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. Your application for " + rank.value + " within LAP has been marked as **AWAITING FURTHER CLARIFICATION**. Please see comments for more information.")
							.setFooter('For any questions, feedback or errors - reply in this DM');
						} else {
							if (grammarfail.value === "x") {
								reasons = reasons + "**Too bad grammar:** Your application had too many grammatical errors. Try improving your grammar skills and try applying again next time!\n"
							}
							if (tooshortfail.value === "x") {
								reasons = reasons + "**Too short answers:** Your answers were too short for us or didn't contain enough valuable content.\n"
							}
							if (appsforroleclosedfail.value === "x") {
								reasons = reasons + "**Applications for this role is closed:** Make sure to check if the applications are still open and demand is not met already!\n"
							}
							if (unsatisfyingfail.value === "x") {
								reasons = reasons + "**Non-satisfactory answers:** We wanted to hear something different from your answers. Next time try telling us about you and your hobbies in more detail and show why we should choose you above other applicants!\n"
							}
							if (toomanyerrorsfail.value === "x") {
								reasons = reasons + "**Too many errors on Basic knowledge test:** You received too less points in the test section, therefore, your application was automatically declined.\n"
							}
							if (reasons === "") {
								reasons = "N/A"	
							}
							resultsembed = new Discord.MessageEmbed()
							.setColor('#E74C3C')
							.setTitle("Application " + mark.value)
							.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. We're sorry to announce that your application for " + rank.value + " within LAP has been **rejected**. You can improve your application and re-apply.")
							.addFields(
								{ name: 'Reason(s)', value: reasons },
							)
							.setFooter('For any questions, feedback or errors - reply in this DM');
						}
					} else {
						if (mark.value === "PASSED") {
							resultsembed = new Discord.MessageEmbed()
							.setColor('#2dcc70') //RED - #E74C3C | ORANGE - #CA6F1E | LUGANE GREEN - #2DCC70
							.setTitle("Application " + mark.value)
							.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. We're happy to announce that your application for " + rank.value + " within LAP has been **approved**. Information about training and ranking in the Roblox group and our Discord server will be done soon.")
							.addFields(
								{ name: 'Comments', value: comments.value },
							)
							.setFooter('For any questions, feedback or errors - reply in this DM');
						} else if (mark.value === "AWAITING FURTHER CLARIFICATION") {
							resultsembed = new Discord.MessageEmbed()
							.setColor('#CA6F1E')
							.setTitle("Application " + mark.value)
							.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. Your application for " + rank.value + " within LAP has been marked as **AWAITING FURTHER CLARIFICATION**. Please see comments for more information.")
							.addFields(
								{ name: 'Comments', value: comments.value },
							)
							.setFooter('For any questions, feedback or errors - reply in this DM');
						} else {
							if (grammarfail.value === "x") {
								reasons = reasons + "**Too bad grammar:** Your application had too many grammatical errors. Try improving your grammar skills and try applying again next time!\n"
							}
							if (tooshortfail.value === "x") {
								reasons = reasons + "**Too short answers:** Your answers were too short for us or didn't contain enough valuable content.\n"
							}
							if (appsforroleclosedfail.value === "x") {
								reasons = reasons + "**Applications for this role is closed:** Make sure to check if the applications are still open and demand is not met already!\n"
							}
							if (unsatisfyingfail.value === "x") {
								reasons = reasons + "**Non-satisfactory answers:** We wanted to hear something different from your answers. Next time try telling us about you and your hobbies in more detail and show why we should choose you above other applicants!\n"
							}
							if (toomanyerrorsfail.value === "x") {
								reasons = reasons + "**Too many errors on Basic knowledge test:** You received too less points in the test section, therefore, your application was automatically declined.\n"
							}
							if (reasons === "") {
								reasons = "N/A"	
							}
							resultsembed = new Discord.MessageEmbed()
							.setColor('#E74C3C')
							.setTitle("Application " + mark.value)
							.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. We're sorry to announce that your application for " + rank.value + " within LAP has been **rejected**. You can improve your application and re-apply.")
							.addFields(
								{ name: 'Reason(s)', value: reasons },
								{ name: 'Comments', value: comments.value },
							)
							.setFooter('For any questions, feedback or errors - reply in this DM');
						}
					}
					sent.value = "☑"
					//console.log(applicant.id)
					applicant.send(resultsembed).catch(err => message.reply(err + "     ``USER:(" + tag.value + ")``"));
					await sheet.saveUpdatedCells();
					message.channel.send("``[✓] Results sent! (" + tag.value + ")``");
				} else {
					message.channel.send("``[!] Already sent! (" + tag.value + ")``");
				}
			}
		}
		message.reply("***END***");
		} else {
			message.channel.send("❗ Insufficient permissions")
		}
}
async function dm(message) {
	var admin = ["746662409724231798","482586747201519617"]; //can dm users via bot, using the /dm command
	if (admin.includes(message.author.id) == true) {
		const split = await message.content.split(",");
		const targetid = split[1]
		const message = split[2]
		if (targetid == "undefined" && message == "undefined") {
			message.channel.send("Command format: ``/dm,[USER_ID],[MESSAGE]``")
		} else
		if (targetid == "undefined") {
			message.channel.send("❗ Missing ``USER_ID``! Type ``/dm`` to see the full command.")
			message.react("❌")
		} else
		if (message == "undefined") {
			message.channel.send("❗ Missing ``MESSAGE``! Type ``/dm`` to see the full command.")
			message.react("❌")
		} else {
			try {
				client.users.fetch(targetid).then((user) => {user.send(message);});
				message.react("✅")
			} catch (err) {
				message.channel.send("❗ Something went wrong! Refer to the error log below.\n\n ``" + err + "``\n(Bot administrator contacted: <@746662409724231798>)")
				message.react("❌")
			}
		}
	} else {
		message.channel.send("❗ Insufficient permissions")
	}
}
async function receivedm(message) {
	if (message.attachments.size > 0) {
	    if (message.attachments.every(attachIsImage)){
		message.channel.send("❗ This bot cannot transfer images - please send a link of your image. The message you sent has been rejected - if you sent any text with the image, please include it in the next message you send.")
	    }
	}
	let botdms = client.channels.cache.get("799266353999642664")
	const dmreceivedEmbed = new Discord.MessageEmbed()
	.setColor('#2dcc70')
	.setAuthor(message.author.tag + "   |   " + message.author, message.author.avatarURL())
	.setDescription(message.content)
	botdms.send(dmreceivedEmbed);	
}

client.login(process.env.BOT_TOKEN);
//©raltec 2021
