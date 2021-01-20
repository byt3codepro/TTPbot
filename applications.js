//©raltec 2021
//Heroku logs: https://dashboard.heroku.com/apps/ttp-bot-app/logs
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1dDs1zvYx4KUEwB1B9qRSsana0rRLw1UsPsaXUl7PF3g');
	
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
	const prefix = "/";
	
	if (message.guild === null) {
		if (message.author != client.user.id) {
			receivedm(message)
		}
	} else {
		if (message.content.startsWith(prefix)) {
			if (message.content == prefix + "results") {
				results(message)
			} else
			if (message.content.startsWith(prefix + "dm")) {
				dm(message)
			}
			if (message.content.startsWith(prefix + "fine")) {
				issuefine(message)
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
		var newsent = 0
		var alreadysent = 0
		var errorsent = 0
		var output = "```"
		for (let i = 2; i < 250; i++) {
			var errored = false
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
					try {
						applicant.send(resultsembed)
					} catch (err) {
						if (err == "TypeError: Cannot read property 'send' of undefined") {
							output = output + "[!] ==================================\n[!] Failed to send results! (" + tag.value + ")\n" + err + "\nThis error usually happens when the tag provided in application from is invalid - missing a number/letter, having spaces at begging or end, etc. Check the user tag for issues and try again or contact bot administrator!\n[!] ==================================\n"
						} else {
							output = output + "[!] ==================================\n[!] Failed to send results! (" + tag.value + ")\n" + err + "\nWe haven't heard of this error! Tag a bot developer for additional help.\n[!] ==================================\n"
						}
						errored = true
						sent.value = "☐"
						errorsent = errorsent + 1
					}
					await sheet.saveUpdatedCells();
					if (errored === false) {
						output = output + "[+] Results sent! (" + tag.value + ")\n"
						newsent = newsent + 1
					}
				} else {
					output = output + "    Already sent! (" + tag.value + ")\n"
					alreadysent = alreadysent + 1
				}
			}
		}
		message.channel.send(output + "```")
		message.channel.send("```All results sent!\n-----------------\nResults sent: " + newsent + "\nAlready sent: " + alreadysent + "\nFailed to send: " + errorsent + "```")
		} else {
			message.channel.send("❗ Insufficient permissions")
		}
}
function dm(message) {
	var admin = ["746662409724231798","482586747201519617","290452091946663936"]; //can dm users via bot, using the /dm command
	if (admin.includes(message.author.id) == true) {
		const split = message.content.split(",");
		const targetid = split[1]
		const letter = split[2]
		if (targetid == "undefined" || targetid == null || targetid == "" && letter == "undefined" || letter == null || letter == "") {
			message.channel.send("Command format: ``/dm,[USER_ID],[MESSAGE]``")
		} else
		if (targetid == "undefined" || targetid == null || targetid == "") {
			message.channel.send("❗ Missing ``USER_ID``!\nType ``/dm`` to see the full command.")
			message.react("❌")
		} else
		if (letter == "undefined" || letter == null || letter == "") {
			message.channel.send("❗ Missing ``MESSAGE``!\nType ``/dm`` to see the full command.")
			message.react("❌")
		} else {
			client.users
				.fetch(targetid)
				.then(user => {
					user.send(letter)
					message.react('✅')
				})
				.catch(err => {
					if (err === "DiscordAPIError: 404: Not Found") {
						message.channel.send("❗ Something went wrong! Refer to the error log below.\n\n``User with this ID hasn't been found! Error:\n" + err + '``')
					} else {
						message.channel.send('❗ Something went wrong! Refer to the error log below.\n\n``' + err + '``\n(Bot administrator contacted: <@746662409724231798>)')
					}
					message.react('❌')  
    				})
		}
	} else {
		message.channel.send("❗ Insufficient permissions")
	}
}
function receivedm(message) {
	if (message.attachments.size > 0) {
		message.channel.send(">>> ❗ This bot cannot transfer images or files - please send a link of your image or file.\nThe message you sent has been rejected - if you sent any text with the image, please include it in the next message you send.")
	} else {
	let botdms = client.channels.cache.get("799266353999642664")
	const dmreceivedEmbed = new Discord.MessageEmbed()
	.setColor('#2dcc70')
	.setAuthor(message.author.tag + "   |   " + message.author, message.author.avatarURL())
	.setDescription(message.content)
	botdms.send(dmreceivedEmbed);
	}
}
function issuefine(message) {
	if (message.channel.id == "799266353999642664") {
		const split = message.content.split(" ");
		const userid = split[1]
		const plate = split[2]
		const allowedspeed = split[3]
		const actualspeed = split[4]
		const date = split[5]
		const time = split[6]
		const location = split[7]
		const difference = Number(actualspeed) - Number(allowedspeed)
		
		var today = new Date();
		var dd = String(today.getDate());
		var mm = String(today.getMonth()); //January is 0!
		var yyyy = today.getFullYear();
		const monthNamesArray = ["Janvārī", "Februārī", "Martā", "Aprīlī", "Maijā", "Jūnijā", "Jūlijā", "Augustā", "Septembrī", "Oktobrī", "Novembrī", "Decembrī"];
		var monthName = monthNamesArray[today.getMonth()]
		
		const fineEmbed = new Discord.MessageEmbed()
		.setColor('#011d4d')
		.setTitle('ADMINISTRATĪVĀ PĀRKĀPUMA\nPROTOKOLS-PAZIŅOJUMS')
		.setAuthor("Valsts policijas Vidzemes reģiona pārvalde")
		.setThumbnail('https://i.gyazo.com/fe9f314bd6df1ec33e7c26df5014076b.jpg')
		.setDescription("Sastādīts Luganes pilsētā, Šautuves ielā 2, " + yyyy + ". gada " + dd + ". " + monthName + ".")
		.addFields(
		{ name: 'Atļautais ātrums', value: allowedspeed, inline: true },
		{ name: 'Faktiskais ātrums', value: actualspeed + "(+" + difference + ")", inline: true },
		{ name: 'Vadītāja ID', value: userid, inline: false },
		{ name: 'Numurzīme', value: plate, inline: true },
		{ name: 'Pārkāpums fiksēts', value: date + ", " + time + ", " + location, inline: false }
		)
		client.users
				.fetch(userid)
				.then(user => {
					user.send(fineEmbed)
					message.react('✅')
				})
				.catch(err => {
					if (err === "DiscordAPIError: 404: Not Found") {
						message.channel.send("❗ Something went wrong! Refer to the error log below.\n\n``User with this ID hasn't been found! Error:\n" + err + '``')
					} else {
						message.channel.send('❗ Something went wrong! Refer to the error log below.\n\n``' + err + '``\n(Bot administrator contacted: <@746662409724231798>)')
					}
					message.react('❌')  
    				})
	}
}

client.login(process.env.BOT_TOKEN);
//©raltec 2021
