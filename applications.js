//©raltec 2021


const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    
});

client.on('message', message => {
		//   space for dm commands  
		
		if (message.content == "?testing") {
			message.reply("Tested!")
		}
		
		//   space for dm commands  
    //} else {
		//   space for server commands  
		
		
		
		//   space for server commands  
    }
});

client.login(process.env.BOT_TOKEN);
//©raltec 2021
