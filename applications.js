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
	for (let i = 2; i < 250; i++) {
		var resultsembed
		const mark = sheet.getCellByA1('A' + i);
		const sent = sheet.getCellByA1('B' + i);
		const comments = sheet.getCellByA1('C' + i);
		const grammarfail = sheet.getCellByA1('D' + i);
		const tooshortfail = sheet.getCellByA1('E' + i);
		const appsforroleclosedfail = sheet.getCellByA1('F' + i);
		const unsatisfyingfail = sheet.getCellByA1('G' + i);
		const toomanyerrorsfail = sheet.getCellByA1('H' + i);
		const robloxuser = sheet.getCellByA1('L' + i);
		const rank = sheet.getCellByA1('P' + i);
		if (mark.value === null) {
			break;
		} else {
			if (sent.value === "☐") {
				if (mark.value === "PASSED") {
					resultsembed = new Discord.MessageEmbed()
					.setColor('#2dcc70') //RED - #E74C3C            ORANGE - #CA6F1E
					.setTitle("Application " + mark.value)
					.setDescription("Hello, " + robloxuser + "! Thank you for your interest in our group. We're happy to announce that your application for " + rank + " within LAP has been **approved**. Information about training and ranking in the Roblox group and our Discord server will be done soon.")
					.setFooter('For any questions, feedback or errors - reply in this DM');
				} else {
					resultsembed = new Discord.MessageEmbed()
					.setColor('#2dcc70') //RED - #E74C3C            ORANGE - #CA6F1E
					.setTitle("Application " + mark.value)
					.setDescription("Hello, " + robloxuser + "! Thank you for your interest in our group. We're sorry to announce that your application for " + rank + " within LAP has been **rejected**. You can improve your application and re-apply.")
					.setFooter('For any questions, feedback or errors - reply in this DM');
				}
				message.reply(resultsembed);
				sent.value = "☑"
				await sheet.saveUpdatedCells();
			} else {
				message.reply("Already sent!     #" + i);
			}
		}
	}
	message.reply("***END***");
}

client.login(process.env.BOT_TOKEN);
//©raltec 2021
