const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    let ttpTestChannel = client.channels.get("642490607079653416")
    //client.user.setActivity('with a ČKD Tatra T6B5');
    ttpTestChannel.send(d)
});

client.on('message', message => {
    if (message.content == 'ping?') {
    	message.reply('oh fuck off its late and im tired');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
