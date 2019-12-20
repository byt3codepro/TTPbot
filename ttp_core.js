const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    //client.user.setActivity('with a ČKD Tatra T6B5');
});

client.on('message', message => {
    if (message.content == 'ping?') {
        message.react('🇧').then((message) => message.react('🇷')).then((message) => message.react('🇺')).then((message) => message.react('🇭'))
    	message.reply('oh fuck off its late and im tired');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
