const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    //client.user.setActivity('with a ČKD Tatra T6B5');
});

client.on('message', message => {
    if (message.content == 'ping?') {
        //if (message.author == <@179654608371712000>) {
            //message.react('<:verigood:641748105049407488>')
    	    //message.reply("🏓 *Pong!*");
            //}
        var a = ['no', 'leave me alone', 'GET LOST', 'im tired of you', 'idk', 'you get coal from me this christmas, only normal people get a ping present', 'This is a Premium feature! You are too poor to afford Premium of such cool bot!']
        message.react('⛔')
    	message.reply(a[Math.floor(Math.random() * a.length)]);
            }
});

client.login(process.env.BOT_TOKEN);
