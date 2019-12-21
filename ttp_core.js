const Discord = require('discord.js');
const client = new Discord.Client();

function sleep(milliseconds) { 
            let timeStart = new Date().getTime(); 
            while (true) { 
                let elapsedTime = new Date().getTime() - timeStart; 
                if (elapsedTime > milliseconds) { 
                    break; 
                } 
            } 
        }

client.on('ready', () => {
    client.user.setActivity('BOT OFFLINE FOR MAINENTANCE', { type: 'STREAMING' });
});

client.on('message', message => {
    if (message.content == 'ping?') {
        if (message.author.id == 179654608371712000) {
            message.react('❤️')
    	    message.channel.send("🏓")
            message.channel.send("*** Pong!***");
            } else {        
                var a = ['no', 'leave me alone', 'noobs doesnt even have a ping', '**666 ms!** ***Burn in hell!***', 'GET LOST', 'im tired of you', 'idk', 'you get coal from me this christmas, only normal people get a ping present', 'This is a Premium feature! You are too poor to afford Premium of such cool bot!']
                message.react('⛔')
    	        message.channel.send(a[Math.floor(Math.random() * a.length)]);
            }
        }
});

client.login(process.env.BOT_TOKEN);
