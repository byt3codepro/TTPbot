//©raltec 2021
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
		if (message.content == "?testing") {
			accessSpreadsheet();
		}
});

client.login(process.env.BOT_TOKEN);
//©raltec 2021


async function accessSpreadsheet() {
	const doc = new GoogleSpreadsheet('1dDs1zvYx4KUEwB1B9qRSsana0rRLw1UsPsaXUl7PF3g');
	await promisify(doc.useServiceAccountAuth)(creds);
	const info = await promisify(doc.getInfo)();
	const sheet = info.worksheets[0]
	console.log('Title: ${sheet.title}', Rows: ${sheet.rowCount}')
}
				
				
