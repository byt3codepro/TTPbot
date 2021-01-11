//©raltec 2021
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
		if (message.content == "?testing") {
			listMajors();
		}
});

client.login(process.env.BOT_TOKEN);
//©raltec 2021
