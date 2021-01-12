//©raltec 2021
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1dDs1zvYx4KUEwB1B9qRSsana0rRLw1UsPsaXUl7PF3g');
	
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
		if (message.content == "/results") {
			results();
		}
});

async function reults() {
	// Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	});
	await doc.loadInfo(); // loads document properties and worksheets
	const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
	for (let i = 1; i < array.length; i++) {
		if (sheet.getCellByA1('B' + i) == "FALSE") {
			const mark = sheet.getCellByA1('A' + i);
			message.channel.send(mark.value)
		} else {
			message.channel.send("Already sent!");
		}
	}
}

client.login(process.env.BOT_TOKEN);
//©raltec 2021
