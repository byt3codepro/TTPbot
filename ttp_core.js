const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    //client.user.setActivity('with a ČKD Tatra T6B5');
});

client.on('message', message => {
    if (message.content == 'ping?') {
        var a = ['no', 'leave me alone', 'GET LOST', 'im tired of you', 'idk', 'This is a Premium feature! You are too poor to afford Premium of such cool bot!']
        message.react('⛔')
    	message.send(a[Math.floor(Math.random() * a.length)]);
  	}
});

client.login(process.env.BOT_TOKEN);
