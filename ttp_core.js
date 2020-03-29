//©raltec 2019

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    //let ttpTestChannel = client.channels.get("642490607079653416")
    //ttpTestChannel.send("Bot restarted - " + Date())
	//let bitch = client.channels.get("685936439925407753")
    //bitch.send("***slayerzplayerz mom smells 😹 @everyone ***")
    //client.user.setActivity('PowerPoint', { type: 'PLAYING' }); //PLAYING / STREAMING / LISTENING / WATCHING         MAINTENANCE
    client.user.setStatus('online') //online - user is online / idle - user is AFK / offline - user is offline or invisible / dnd - user is in Do Not Disturb
});

client.on('message', message => {
    if (message.guild === null) {
        // space for dm commands
    } else {
       if (message.content == '/results') {
            let ttpResultsChannel = client.channels.get("662034469708103690")
			var temp
		   	ttpResultsChannel.fetchMessage('662034597508546582').then(results => {
				var resultSplit = results.content.split("{}")
				var userIDposition = resultSplit.indexOf(message.author.id)
				if (userIDposition == -1) {
					message.channel.send("❗ Application not found. If you applied, contact an Administrator for support.")
				} else {
					var userID = resultSplit[userIDposition]
					var mark = resultSplit[userIDposition+1]
					var comment = resultSplit[userIDposition+2]
					var role = resultSplit[userIDposition+3]
					var specialRole = "Feel free to re-apply next time we're hiring!"
					if (mark == "PASSED") {
						var specialRole = "You have been automaticially roled"
						if (role == "Tram Driver") {
							message.member.addRole('641984034397749258') //Staff
							message.member.addRole('645398767633170462') //LR
							message.member.addRole('643841138482216979') //Passenger Service
							message.member.addRole('642382484968833024') //Tram Driver
						} else {
							if (role == "Technician") {
								message.member.addRole('641984034397749258') //Staff
								message.member.addRole('645398767633170462') //LR
								message.member.addRole('643841189669240852') //Fleet Service
								message.member.addRole('642478589186408470') //Technician
							} else {
								if (role == "Dispatcher") {
									message.member.addRole('641984034397749258') //Staff
									message.member.addRole('645398767633170462') //LR
									message.member.addRole('643841357248724992') //Dispatch Service
									var specialRole = "❗ Please contact the Chief Central Dispatcher to get ranked Station or Central Dispatcher." 
								} else {
									var specialRole = "❗ We had trouble automaticially adding you roles. Please contact an administrator to role you."
								}
							}
						}
					}
					var color
					message.channel.send("Results sent, check your DMs!")
					if (mark == "PASSED") {
						color = '#008000'
					} else {
						color = '#800000'
					}
					const resultsEmbed = new Discord.RichEmbed()
					.setColor(color)
					.setTitle('Application results')
					.setDescription(mark)
					.addField('User ID', userID)
					.addField('Notes', "Applied for: " + role + "\n" + comment)
					.addField(specialRole, "─────────────────────")
					.setTimestamp()
					.setFooter('TRAMVAJU UN TROLEJBUSU PĀRVALDE', 'https://i.gyazo.com/c2da46134a992ace4d9ee3cda7cfe8b2.png');

					message.author.send(resultsEmbed);
				}
        	})
        }
        if (message.content == 'ping?') {
            if (message.author.id == 179654608371712000) {
                message.react('❤️')
                message.channel.send("🏓")
                message.channel.send("*** Pong!***");
                } else {        
                    var a = ['no', 'leave me alone', 'you aint worth my time', 'why do u even want ur ping', 'ask another bot im busy', 'not you again', 'god help me', '*Ping Service 1x* has been added to your cart\nNew Total: € 6.90', 'noobs doesnt even have a ping', '**666 ms!** ***Burn in hell!***', 'GET LOST', 'im tired of you', 'idk', 'you get coal from me this christmas, only normal people get a ping present', 'This is a Premium feature! You are too poor to afford Premium of such cool bot!']
                    message.react('⛔')
                    message.channel.send(a[Math.floor(Math.random() * a.length)]);
                }
            }
        if (message.content == '/cmds') {
            message.channel.send('Due to budget cuts, this command has been disabled\nWe apologise for any inconvenience caused', {files: ['https://cdn.drawception.com/drawings/LrK4OWAvPQ.png']});
	}
	if (message.content.startsWith('/announce')) {
		var announcesplit = message.content.split("[]");
		let announcetag = announcesplit[2]
		let announcementchannel = client.channels.get(announcesplit[1])
		const announcementembed = new Discord.RichEmbed()
			.setColor('#d4af37')
			.setTitle(announcesplit[3])
			.setDescription(announcesplit[4])
			.setFooter('AS Pasažieru Vilciens');
		if announcetag == "here" or "everyone" {
			announcementchannel.send("@" + announcetag, announcementembed);
		} else {
			if announcetag == "x" {
				announcementchannel.send(announcetag, announcementembed);
			} else {
				announcementchannel.send(<@announcesplit[2]>, announcementembed);
			}
		}
	}
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
        if (message.content.startsWith('/purge')) {
            if (message.content != '/purge') {
                if (message.member.hasPermission("ADMINISTRATOR")) {
                    var delnum = message.content.split(" ");
                    var bulkError = false
                    if (parseInt(delnum[1]) > 100) {
                        message.channel.send("❗ You can only delete 100 or less messages at once").then(msg => {msg.delete(5000)})
                    } else {
                        message.channel.bulkDelete(parseInt(delnum[1])).catch(error => bulkError = true && message.channel.send(`❗ Couldn't delete messages because of: ${error}`));
                        if (bulkError == false) {
                            message.channel.send("Deleted **" + delnum[1] + "** messages!").then(msg => {msg.delete(5000)})
                        } else {
                            bulkError = false;
                        }
                    }
                } else {
                    message.channel.send('❗ Insufficient permissions');
                }
            } else {
                message.channel.send('❗ Enter valid amount   ``/purge [amount]``');
            }   
        }
    }
});

client.login(process.env.BOT_TOKEN);
//©raltec 2019
