//©raltec 2019


const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    //let ttpTestChannel = client.channels.get("642490607079653416")
    //ttpTestChannel.send("Bot restarted - " + Date())
	//let bitch = client.channels.get("685936439925407753")
    //bitch.send("***slayerzplayerz mom smells 😹 @everyone ***")  
    //client.user.setActivity('nil', { type: 'nil' }); //PLAYING / STREAMING / LISTENING / WATCHING         MAINTENANCE
    client.user.setStatus('online') //online - user is online / idle - user is AFK / offline - user is offline or invisible / dnd - user is in Do Not Disturb
});

client.on('message', message => {
var whitelist = ["179654608371712000", "514127283636797450"];
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
            if (whitelist.includes(message.author.id) == true) {
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
		if (whitelist.includes(message.author.id) == true) {
			if (message.content == '/announce help') {
				message.author.send("**System announcements**\nThere are 4 parts in the command - Channel ID, Tag, Header and the announcement text (Description).\n/announce[]Channel ID[]Tag[]Header[]Description\n\n1. Channel ID - ID of the channel you want your announcement to appear in\n2. Tag - You can tag everyone/here by writing the tag without an **@** symbol. To tag a specific role, put the role ID in this place. To not tag anyone, type **x** (lower-case) in this place.\n3. Header - text above the actual announement, in the announcement box\n4. Description - announcement text. You can write using all text formatting options given and it will display in the announcement (new line (Shift+Enter) will display too).\n\n*Example:*\n/announce[] *servers only, not DMs* []x[]Super cool announcement[]This is an ***announcement*** *command* example!\n\n**:)** 😉\n\n*Output:*", {files: ['https://i.gyazo.com/6472724170e662eb31fad2a705b9dfe1.png']})
			} else {
				var announcesplit = message.content.split("[]");
				let announcementchannel = client.channels.get(announcesplit[1])
				const announcementembed = new Discord.RichEmbed()
					.setColor('#d4af37')
					.setTitle(announcesplit[3])
					.setDescription(announcesplit[4])
					.setFooter('Luganes autobusu parks');
				if (announcesplit[2] == 'x') {
					announcementchannel.send(announcementembed);
				} else {
					if (announcesplit[2] == "everyone") {
						announcementchannel.send("@everyone", announcementembed);
					} else {
						if (announcesplit[2] == "here") {
							announcementchannel.send("@here", announcementembed);
						} else {
						announcementchannel.send("<@&" + announcesplit[2] + ">", announcementembed);
						}
					}
				}
			}
		} else {
			message.channel.send('❗ Insufficient permissions');
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
	if (message.content.startsWith('/getrole')) {
            if (message.content != '/purge') {
                if (whitelist.includes(message.author.id) == true) {
                    var delnum = message.content.split(" ");
			message.member.addRole(delnum[1])
		    message.react('✅')
		} else {
			message.channel.send('❗ Insufficient permissions');
		}
	    }
        }
	if (message.content.startsWith('/removerole')) {
            if (message.content != '/purge') {
                if (whitelist.includes(message.author.id) == true) {
                    var delnum = message.content.split(" ");
			message.member.removeRole(delnum[1])
		    message.react('✅')
		} else {
			message.channel.send('❗ Insufficient permissions');
		}
	    }
        }
	    
	    
	    
	    
	    
	    
	    
	    
	    if (message.content == '/kevinreys') {
            message.channel.send('Marked: ***EPIC***. Not an idiot without bad grammar, but has parkinsons disease, currently working in WMP Roblox as CHIEF Superintendant for the most active unit in the force and owns the best force in Roblox - brit bus cops (BBC). Severe addiction to pot noodles. \n     */ Wikipedia - The Free Encyclopedia /*', {files: ['https://cdn.discordapp.com/attachments/622531501413892135/657994077178036263/Screenshot_1425.png']});
        }
        if (message.content == '/ralfotr') {
            message.channel.send('Rightful owner of the well known TTP bot that provides real information across multiple Discord servers. Also known as a great developer in Roblox, specialising in development of public transport and urban infrastructure. \n     */ Wikipedia - The Free Encyclopedia /*', {files: ['https://image.prntscr.com/image/XIN6YMgfSZS1C8m9X6O7CQ.png']});
        }
        if (message.content == '/iiapp') {
            message.channel.send("iiApp was the first leader of North Korea which he ruled from the country's establishment in 1948 until his death in 1994. He held the posts of Premier from 1948 to 1972 and President from 1972 to 1994. He was also the leader of the Workers' Party of Korea (WPK) from 1949 to 1994 (titled as Chairman from 1949 to 1966 and as General Secretary after 1966). Coming to power after the end of Japanese rule in 1945, he authorized the invasion of South Korea in 1950, triggering an intervention in defense of South Korea by the United Nations led by the United States. Following the military stalemate in the Korean War, a ceasefire was signed on 27 July 1953. He was the third longest-serving non-royal head of state/government in the 20th century, in office for more than 45 years. \n     */ Wikipedia - The Free Encyclopedia /*", {files: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Kim_Il-sung_in_1950.jpg/220px-Kim_Il-sung_in_1950.jpg']});
        }
        if (message.content == '/ciaranoshea') {
            message.channel.send("Single father, working full time at West Midlands Police made by iiApp `see more: /iiApp`. Severe issues with malnutrition - charged with murder after eating his child, pleaded not guilty after realising that a PCSO can't afford food. \n     */ Wikipedia - The Free Encyclopedia /*", {files: ['https://cdn.discordapp.com/attachments/622531501413892135/658042057289629707/Screenshot_1271.png']});
        }
        if (message.content == '/brianmcaskill') {
            message.channel.send("Running the most inactive and useless unit in West Midlands Police - OSU. Got the job after threats from iiApp `see more: /iiApp` who knew that Mr. McCaskill was exploiting underage children at his 'StateFarm' credit and insurance company. He has also been accused of 3x Credit Fraud, Threats to a goverment official and 19x Urinating in public (not guilty due to bladder management issues). \n     */ Wikipedia - The Free Encyclopedia /*", {files: ['https://pbs.twimg.com/media/C9OhQiGXoAQT1aM.jpg']});
        }
        if (message.content == '/thomasbaker') {
            if (message.author.id == 179654608371712000) {
                message.channel.send("The hot handsome man that everyone keeps talking about but has never seen. Spends free time participating in mainly policing roleplay but also can't resist some furry and *Roblox Rule 34* roleplay in Roblox. Roleplaying in West Midlands Police Thomas has been interacting to undarge children like the developer of this bot, who was left frightened after seeing good grammar on his DMs. \n     */ Wikipedia - The Free Encyclopedia /*", {files: ['https://i.gyazo.com/66dbb90831844d2433fb804bf1d4df7f.jpg']});
            }
        }
	    
	    
	    
	    
	    
	    
	    
	    
	    
    }
});

client.login(process.env.BOT_TOKEN);
//©raltec 2019 ©raltec 2020
