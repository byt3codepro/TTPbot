//©raltec 2021
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1dDs1zvYx4KUEwB1B9qRSsana0rRLw1UsPsaXUl7PF3g');
	
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
		if (message.content == "/results") {
			results(message);
		}
});

async function results(message) {
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
				console.log(applicant.id)
				//applicantid.send(resultsembed).catch(err => message.reply(err + "     ``USER:(" + tag.value + ")``"));
				await sheet.saveUpdatedCells();
			} else {
				message.reply("Already sent! (" + tag.value + ")");
			}
		}
	}
	message.reply("***END***");
}

client.login(process.env.BOT_TOKEN);
//©raltec 2021
