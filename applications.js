//©raltec 2021
const { GoogleSpreadsheet } = require('google-spreadsheet');

// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1dDs1zvYx4KUEwB1B9qRSsana0rRLw1UsPsaXUl7PF3g');

async function padla() {
	// Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
	//await doc.useServiceAccountAuth({
	  //client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	  //private_key: process.env.GOOGLE_PRIVATE_KEY,
	//});

	await doc.loadInfo(); // loads document properties and worksheets
	console.log(doc.title);
	await doc.updateProperties({ title: 'renamed doc' });

	const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
	console.log(sheet.title);
	console.log(sheet.rowCount);
}
	
	
	
	
	
	
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
		if (message.content == "?testing") {
			padla();
		}
});

client.login(process.env.BOT_TOKEN);
//©raltec 2021
