//©raltec 2021
//Heroku logs: https://dashboard.heroku.com/apps/ttp-bot-app/logs
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1dDs1zvYx4KUEwB1B9qRSsana0rRLw1UsPsaXUl7PF3g');
const testmode = false
const testmodeoverride = false
const prefix = "-"

const announceWhitelist = ["290452091946663936","216455849382510593","749330903632707727", "746662409724231798", "562556023861280768", "482586747201519617", "320510178023702528"];
	
const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"]  });

async function startdoc() { 
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	});
	await doc.loadInfo(); // loads document properties and worksheets 
}
startdoc() 

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

client.on('ready', () => {
	if (testmode === true) {
		client.user.setPresence({ activities: [{ name: 'Undergoing mainentance' }], status: 'dnd' });
	} else {
		statusroll(15)
	}
	client.channels.cache.get("799266353999642664").send("Logged in as ``" + client.user.tag + "`` at <t:" + Math.floor(Date.now()/1000) + ":T>") //bot-feed: 797253920421576725 //bot: 799266353999642664
  });

client.on('guildMemberAdd', member => {
	const welcomeEmbed = new Discord.MessageEmbed()
		.setColor('#28cf70') //RED - #E74C3C | ORANGE - #CA6F1E | LUGANE GREEN - #2DCC70 
		.setTitle("👋 Hiya! Welcome to Lugane!")
		.setDescription("**We're glad that you've decided to join our server and become a part of our community. Feel free to DM this bot and our Public Relations team will get back to you as fast as they can.**\n\n📢  For general announcements click here: <#706091363963240472>\n❓  For frequently asked questions click here: <#910412809609830410>\n⏰  For shift times click here: <#739210818666758226>\n📰  For job offers click here: <#742486789310119979>\n✨  For development peeks click here: <#731868485944082492>\n\n\n🇱🇻 Want to access the Latvian channel? Ask this bot for a Latvian role in Latvian language, so we know that you're really Latvian.")
		.setFooter("For any questions, feedback or errors - reply in this DM and we'll get back to you as soon as we can!");
	member.send(welcomeEmbed);
});

client.on('messageCreate', message => {
	if (client.user.presence.status != 'online' && testmodeoverride == false && message.author.id != "746662409724231798") {
		if (message.author != client.user.id) {
			if (message.channel.type === 'DM') {
				message.reply("❗ Bot is currently undergoing maintenance and is not available. Your message **was not** sent to Customer support. Please try again once the bot status shows that the bot is online.")
			}else{
				if (message.content.startsWith(prefix)) {
					message.reply("❗ Bot is currently undergoing maintenance and is not available. Your command was not executed. Please try again once the bot status shows that the bot is online.")
				}
			}
		}
	}else{
		if (message.channel.type === 'DM') {
			if (message.author != client.user.id) {
				receivedm(message)
			}
		} else {
			if (message.channel.id === "811369640390950922") {
				replydm(message)
			} else if (message.content.startsWith(prefix))  {
				if (message.content == prefix + "results") {
					results(message)
				} else
				if (message.content.startsWith(prefix + "dm")) {
					dm(message)
				} else
				if (message.content.startsWith(prefix + "fine")) {
					issuefine(message)
				} else
				if (message.content.startsWith(prefix + "announce")) {
					announce(message)
				} else
				if (message.content.startsWith(prefix + "ping")) {
					ping(message)
				}
				if (message.content.startsWith(prefix + "lban")) {
					ban(message)
				}
				if (message.content.startsWith(prefix + "myid")) {
					myid(message)
				}
			}
		}
	}
});
async function statusroll(time) {
	while (true) {
		client.user.setPresence({ activities: [{ name: 'with Volvo 8700LE', type: 'PLAYING' }], status: 'online' });
		await delay(time);
		client.user.setPresence({ activities: [{ name: 'with MB O530 Citaro', type: 'PLAYING' }], status: 'online' });
		await delay(time);
		client.user.setPresence({ activities: [{ name: 'with SOR CN 10.5', type: 'PLAYING' }], status: 'online' });
		await delay(time);
		client.user.setPresence({ activities: [{ name: 'with MB Türk O345', type: 'PLAYING' }], status: 'online' });
		await delay(time);
	}
}
async function results(message) {
	var editor = ["749330903632707727","746662409724231798","482586747201519617","216455849382510593"]; //application editor Used IDs (can use /results cmd)
	let trainingchannel = client.channels.cache.get("748638653705748480")
	let staffchannel = client.channels.cache.get("707583248817061972")
	if (editor.includes(message.author.id) == true) {
		const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
		await sheet.loadCells();
		const guild = await client.guilds.fetch('705686666043457606')
		var newsent = 0
		var alreadysent = 0
		var errorsent = 0
		var output = "```"
		var applicant_amount = 0
		var passed_applicants = []
		var arrivals
		for (let i = 2; i < 250; i++) {
			var errored = false
			var resultsembed
			var welcomeembed
			var reasons = ""
			var applicant
			const mark = sheet.getCellByA1('A' + i);
			const sent = sheet.getCellByA1('B' + i);
			const comments = sheet.getCellByA1('C' + i);
			const grammarfail = sheet.getCellByA1('D' + i);
			const tooshortfail = sheet.getCellByA1('E' + i);
			const appsforroleclosedfail = sheet.getCellByA1('F' + i);
			const unsatisfyingfail = sheet.getCellByA1('G' + i);
			const toomanyerrorsfail = sheet.getCellByA1('H' + i);
			const robloxuser = sheet.getCellByA1('L' + i);
			const tag = sheet.getCellByA1('M' + i);
			const rank = sheet.getCellByA1('P' + i);
			applicant = guild.members.cache.get(tag.value)
			/*try {
				//applicant = client.users.cache.get(tag.value) guild.members.cache.get(memberID)
				applicant = guild.members.cache.get(tag.value) //client.users.cache.find(member => member.user.id == tag.value) //guild.members.cache.find(member => member.user.tag == tag.value)
			} catch(err) {
				console.error(err)
			}*/
			if (mark.value === null) {
				break;
			} else {
				if (applicant != undefined) {
					if (sent.value === "☐") {
						if (comments.value === null) {
							if (mark.value === "PASSED") {
								applicant_amount = applicant_amount + 1
								passed_applicants[applicant_amount] = tag.value
								if (rank.value == "Driver") {
									applicant.roles.add('729096087733796871')
									trainingchannel.send("<@" + tag.value + "> --- <@&760023801022251038> / <@&867375330092253184>")
								} else if (rank.value == "Technician") {
									applicant.roles.add('729721228457410642')
									trainingchannel.send("<@" + tag.value + "> --- <@&760023575566090271> / <@&867375235669032960>")
								} else if (rank.value == "Ticket Inspector") {
									applicant.roles.add('729721437371236404')
									trainingchannel.send("<@" + tag.value + "> --- <@&760023575566090271> / <@&867375235669032960>")
								}
								applicant.roles.add('705755874718777397')
								applicant.roles.add('756557729790689421')
								resultsembed = new Discord.MessageEmbed()
								.setColor('#2dcc70') //RED - #E74C3C | ORANGE - #CA6F1E | LUGANE GREEN - #2DCC70
								.setTitle("Application " + mark.value)
								.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. We're happy to announce that your application for " + rank.value + " within LAP has been **approved**. Information about training and ranking in the Roblox group and our Discord server will be done soon.")
								.setFooter('For any questions, feedback or errors - reply in this DM');
							} else if (mark.value === "AWAITING FURTHER CLARIFICATION") {
								resultsembed = new Discord.MessageEmbed()
								.setColor('#CA6F1E')
								.setTitle("Application " + mark.value)
								.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. Your application for " + rank.value + " within LAP has been marked as **AWAITING FURTHER CLARIFICATION**. Please see comments for more information.")
								.setFooter('For any questions, feedback or errors - reply in this DM');
							} else {
								if (grammarfail.value === "x") {
									reasons = reasons + "**Too bad grammar:** Your application had too many grammatical errors. Try improving your grammar skills and try applying again next time!\n"
								}
								if (tooshortfail.value === "x") {
									reasons = reasons + "**Too short answers:** Your answers were too short for us or didn't contain enough valuable content.\n"
								}
								if (appsforroleclosedfail.value === "x") {
									reasons = reasons + "**Applications for this role is closed:** Make sure to check if the applications are still open and demand is not met already!\n"
								}
								if (unsatisfyingfail.value === "x") {
									reasons = reasons + "**Non-satisfactory answers:** We wanted to hear something different from your answers. Next time try telling us about you and your hobbies in more detail and show why we should choose you above other applicants!\n"
								}
								if (toomanyerrorsfail.value === "x") {
									reasons = reasons + "**Too many errors on Basic knowledge test:** You received too less points in the test section, therefore, your application was automatically declined.\n"
								}
								if (reasons === "") {
									reasons = "N/A"	
								}
								resultsembed = new Discord.MessageEmbed()
								.setColor('#E74C3C')
								.setTitle("Application " + mark.value)
								.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. We're sorry to announce that your application for " + rank.value + " within LAP has been **rejected**. You can improve your application and re-apply.")
								.addFields(
									{ name: 'Reason(s)', value: reasons },
								)
								.setFooter('For any questions, feedback or errors - reply in this DM');
							}
						} else {
							if (mark.value === "PASSED") {
								resultsembed = new Discord.MessageEmbed()
								.setColor('#2dcc70') //RED - #E74C3C | ORANGE - #CA6F1E | LUGANE GREEN - #2DCC70
								.setTitle("Application " + mark.value)
								.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. We're happy to announce that your application for " + rank.value + " within LAP has been **approved**. Information about training and ranking in the Roblox group and our Discord server will be done soon.")
								.addFields(
									{ name: 'Comments', value: comments.value },
								)
								.setFooter('For any questions, feedback or errors - reply in this DM');
							} else if (mark.value === "AWAITING FURTHER CLARIFICATION") {
								resultsembed = new Discord.MessageEmbed()
								.setColor('#CA6F1E')
								.setTitle("Application " + mark.value)
								.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. Your application for " + rank.value + " within LAP has been marked as **AWAITING FURTHER CLARIFICATION**. Please see comments for more information.")
								.addFields(
									{ name: 'Comments', value: comments.value },
								)
								.setFooter('For any questions, feedback or errors - reply in this DM');
							} else {
								if (grammarfail.value === "x") {
									reasons = reasons + "**Too bad grammar:** Your application had too many grammatical errors. Try improving your grammar skills and try applying again next time!\n"
								}
								if (tooshortfail.value === "x") {
									reasons = reasons + "**Too short answers:** Your answers were too short for us or didn't contain enough valuable content.\n"
								}
								if (appsforroleclosedfail.value === "x") {
									reasons = reasons + "**Applications for this role is closed:** Make sure to check if the applications are still open and demand is not met already!\n"
								}
								if (unsatisfyingfail.value === "x") {
									reasons = reasons + "**Non-satisfactory answers:** We wanted to hear something different from your answers. Next time try telling us about you and your hobbies in more detail and show why we should choose you above other applicants!\n"
								}
								if (toomanyerrorsfail.value === "x") {
									reasons = reasons + "**Too many errors on Basic knowledge test:** You received too less points in the test section, therefore, your application was automatically declined.\n"
								}
								if (reasons === "") {
									reasons = "N/A"	
								}
								resultsembed = new Discord.MessageEmbed()
								.setColor('#E74C3C')
								.setTitle("Application " + mark.value)
								.setDescription("Hello, " + robloxuser.value + "!\nThank you for your interest in our group. We're sorry to announce that your application for " + rank.value + " within LAP has been **rejected**. You can improve your application and re-apply.")
								.addFields(
									{ name: 'Reason(s)', value: reasons },
									{ name: 'Comments', value: comments.value },
								)
								.setFooter('For any questions, feedback or errors - reply in this DM');
							}
						}
						sent.value = "☑"
						try {
							applicant.send({embeds: [resultsembed] }); //applicant.send(resultsembed)
						} catch (err) {
							if (err == "TypeError: Cannot read property 'send' of undefined") {
								output = output + "[!] ==================================\n[!] Failed to send results! (" + tag.value + ")\n" + err + "\nThis error usually happens when the tag provided in application from is invalid - missing a number/letter, having spaces at begging or end, etc. Check the user tag for issues and try again or contact bot administrator!\n[!] ==================================\n"
							} else {
								output = output + "[!] ==================================\n[!] Failed to send results! (" + tag.value + ")\n" + err + "\nWe haven't heard of this error! Tag a bot developer for additional help.\n[!] ==================================\n"
							}
							errored = true
							sent.value = "☐"
							errorsent = errorsent + 1
						}
						await sheet.saveUpdatedCells();
						if (errored === false) {
							output = output + "[+] Sent! (" + applicant.tag + ")\n"
							newsent = newsent + 1
						}
					} else {
						output = output + "    Already sent! (" + applicant.tag + ")\n"
						alreadysent = alreadysent + 1
					}
				} else {
					console.log(applicant)
					comments.value = "BOT: ⚠️ Unable to retrive user"
					output = output + "[!] UTRU! (" + tag.value + ")\n"
					//await sheet.saveUpdatedCells();
				}
			}
		}
		if(applicant_amount == 1) {
			arrivals = "<@" + passed_applicants[1] + "> as our new staff member!"
		} else if(applicant_amount == 2) {
			arrivals = "<@" + passed_applicants[1] + "> and <@" + passed_applicants[2] + "> as our new staff members!"
		} else if(applicant_amount > 2) {
			arrivals = "<@" + passed_applicants[1] + ">"
			for (let i = 2; i <= applicant_amount; i++) {
				if(i != applicant_amount) {
					arrivals = arrivals + ", <@" + passed_applicants[i] + ">"
				} else {
					arrivals = arrivals + " and <@" + passed_applicants[i] + "> as our new staff members!"
				}
			}
		}
		welcomeembed = new Discord.MessageEmbed()
		.setColor('#2dcc70')
		.setTitle("New arrivals!   🎉")
		.setDescription("Welcome " + arrivals)
		if(applicant_amount > 0) {
			staffchannel.send(welcomeembed)
		}
		
		message.channel.send(output + "```")
		message.channel.send("```All results sent!\n-----------------\nResults sent: " + newsent + "\nAlready sent: " + alreadysent + "\nFailed to send: " + errorsent + "```")
		} else {
			message.channel.send("❗ Insufficient permissions")
		}
}
function dm(message) {
	var admin = ["216455849382510593","749330903632707727","746662409724231798","482586747201519617","290452091946663936","320510178023702528","562556023861280768","198890577578819585","328485845298577408"]; //can dm users via bot, using the /dm command
	if (admin.includes(message.author.id) == true) {
		const split = message.content.split("[]");
		const targetid = split[1]
		const letter = split[2]
		if (targetid == "undefined" || targetid == null || targetid == "" && letter == "undefined" || letter == null || letter == "") {
			message.channel.send("Command format: ``/dm[]USER_ID[]MESSAGE``\nExample: ``/dm[]746662409724231798[]Noob.``")
		} else
		if (targetid == "undefined" || targetid == null || targetid == "") {
			message.channel.send("❗ Missing ``USER_ID``!\nType ``/dm`` to see the full command.")
			message.react("❌")
		} else
		if (letter == "undefined" || letter == null || letter == "") {
			message.channel.send("❗ Missing ``MESSAGE``!\nType ``/dm`` to see the full command.")
			message.react("❌")
		} else {
			client.users
				.fetch(targetid)
				.then(user => {
					user.send(letter)
					message.react('✅')
				})
				.catch(err => {
					if (err === "DiscordAPIError: 404: Not Found") {
						message.channel.send("❗ Something went wrong! Refer to the error log below.\n\n``User with this ID hasn't been found! Error:\n" + err + '``')
					} else {
						message.channel.send('❗ Something went wrong! Refer to the error log below.\n\n``' + err + '``\n(Bot administrator contacted: <@746662409724231798>)')
					}
					message.react('❌')  
    				})
		}
	} else {
		message.channel.send("❗ Insufficient permissions")
	}
}
function receivedm(message) { //message.content.MessageEmbed.footer
	var blacklisted = ["859153940435042314","932253527760310313","880688403228819456","648995356650242082","476029033109258241","936928864926588940","922448364275122218","579580251202519043","923908127143911494","918886797541523527","513862371987423234","925694943639511131","917010013539684412","885951568103477289","546039054886502408","807264669500047461","655454890029613066","863478930803130378","737567769087967245","506061677972815883","886206679400742963","839236488582660156","664649027593437204","900431815645478972","692365185314455653","695646717860642916","373856836002119681","457956134993657866","771110812873916437","872147309092274186","874637732641636403"]
	if (message.attachments.size > 0) {
		message.channel.send(">>> ❗ This bot cannot transfer images or files - please send a link of your image or file.\nThe message you sent has been rejected - if you sent any text with the image, please include it in the next message you send.")
	} else {
		let botdms = client.channels.cache.get("811369640390950922")
		const dmsentGifs = ["https://i.giphy.com/media/vDQN570C3aYX1erWy2/giphy.gif","https://c.tenor.com/WBVlD1FOwWwAAAAC/emoji-wink.gif","https://c.tenor.com/ZIwQnXr5OPYAAAAC/epico-cat-epico.gif","https://c.tenor.com/BTsxYqK20hwAAAAC/monkey-going-crazy.gif","https://c.tenor.com/UEYxx6a-VtgAAAAd/brick-eating.gif","https://c.tenor.com/B5_eef4LpXAAAAAd/fast-and-furious-fast-and-furious-bus.gif","https://i.giphy.com/media/QT6wp4ZXed5AO2OD2z/giphy.gif","https://c.tenor.com/pMhSj9NfCXsAAAAd/saul-goodman-better-call-saul.gif","https://cdn.discordapp.com/emojis/866514719783124993.gif"]
		const blacklistedEmbed = new Discord.MessageEmbed()
		.setColor('#2dcc70')
		.setTitle("⛔  Blocked")
		.setDescription("You've been blocked from reaching our Support. This mostly happens because an individual has spammed our support, sent dangerous or NSFW content to the bot or done other actions that made us block communications with you.\n\nIf you wish to appeal this contact the server owner.\nPlease note that your message was not sent.")
		const dmreceivedEmbed = new Discord.MessageEmbed()
		.setColor('#2dcc70')
		.setAuthor(message.author.tag + "   |   " + message.author, message.author.avatarURL())
		.setDescription(message.content)
		const dmsentEmbed = new Discord.MessageEmbed()
		.setColor('#28cf70') //RED - #E74C3C | ORANGE - #CA6F1E | LUGANE GREEN - #2DCC70 
		.setTitle("📬 Your message has been sent and will be processed soon.")
		.setDescription("💢 Our customer support team should not take longer than 72 hours to answer - please **do not DM again** to remind or inquire about the answer status\n🤝 When possible, include everything you would like to ask us in a single message - this will make the response quicker!\n👋 Please do not just greet the bot as you can be ignored by doing this - ask your question along with the greeting in a single message!\n🚌 Please note that if there is an active shift at the moment, we might answer only after the shift has ended!\n")
		.setImage(dmsentGifs[Math.floor(Math.random()*dmsentGifs.length)]);
		if(blacklisted.includes(message.author.id) == true) {
			message.reply({embeds: [blacklistedEmbed] });
		} else {
			message.reply({embeds: [dmsentEmbed] });
			botdms.send({embeds: [dmreceivedEmbed] });
		}
	}
}
async function issuefine(message) {
	if (message.channel.id == "799266353999642664") {
		var speeder
		const split = message.content.split("[]");
		const username = split[1]
		const plate = split[2]
		const allowedspeed = split[3]
		const actualspeed = split[4]
		const date = split[5]
		const time = split[6]
		const location = split[7]
		const difference = Number(actualspeed) - Number(allowedspeed)
		
		var today = new Date();
		var dd = String(today.getDate());
		var mm = String(today.getMonth()); //January is 0!
		var yyyy = today.getFullYear();
		const monthNamesArray = ["Janvārī", "Februārī", "Martā", "Aprīlī", "Maijā", "Jūnijā", "Jūlijā", "Augustā", "Septembrī", "Oktobrī", "Novembrī", "Decembrī"];
		var monthName = monthNamesArray[today.getMonth()]
		
		const fineEmbed = new Discord.MessageEmbed()
		.setColor('#011d4d')
		.setTitle('ADMINISTRATĪVĀ PĀRKĀPUMA\nPROTOKOLS-PAZIŅOJUMS')
		.setAuthor("Valsts policijas Vidzemes reģiona pārvalde")
		.setThumbnail('https://i.gyazo.com/fe9f314bd6df1ec33e7c26df5014076b.jpg')
		.setDescription("Sastādīts Luganes pilsētā, Šautuves ielā 2, " + yyyy + ". gada " + dd + ". " + monthName + ".")
		.addFields(
		{ name: 'Atļautais ātrums', value: allowedspeed + " km/h", inline: true },
		{ name: 'Faktiskais ātrums', value: actualspeed + " (+" + difference + ")" + " km/h", inline: true },
		{ name: 'Vadītāja ID', value: username, inline: false },
		{ name: 'Numurzīme', value: plate, inline: true },
		{ name: 'Pārkāpums fiksēts', value: date + ", " + time + ", " + location, inline: false }
		)
		const guild = await client.guilds.fetch('705686666043457606')
		speeder = guild.members.cache.find((member) => member.displayName == username)
		speeder.send(fineEmbed)
	}
}
function ping(message) {
	var whitelistA = ["749330903632707727", "179654608371712000", "514127283636797450", "746662409724231798", "562556023861280768", "482586747201519617"];
	if (whitelistA.includes(message.author.id) == true) {
                message.react('❤️')
                message.channel.send("🏓")
                message.channel.send("*** Pong!***");
        } else {        
                var a = ['no', 'leave me alone', 'you aint worth my time', 'why do u even want ur ping', 'ask another bot im busy', 'not you again', 'god help me', '*Ping Service 1x* has been added to your cart\nNew Total: € 6.90', 'noobs doesnt even have a ping', '**666 ms!** ***Burn in hell!***', 'GET LOST', 'im tired of you', 'idk', 'you get coal from me this christmas, only normal people get a ping present', 'This is a Premium feature! You are too poor to afford Premium of such cool bot!']
                message.react('⛔')
                message.channel.send(a[Math.floor(Math.random() * a.length)]);
        }
}
function announce(message) {
	if (announceWhitelist.includes(message.author.id) == true) {
		if (message.content == prefix + 'announce help') {
			message.author.send("**System announcements**\nThere are 4 parts in the command - Channel ID, Tag, Header and the announcement text (Description).\n/announce[]Channel ID[]Tag[]Header[]Description\n\n1. Channel ID - ID of the channel you want your announcement to appear in\n2. Tag - You can tag everyone/here by writing the tag without an **@** symbol. To tag a specific, put the role ID in this place. To not tag anyone, type **x** (lower-case) in this place.\n3. Header - text above the actual announement, in the announcement box\n4. Description - announcement text. You can write using all text formatting options given and it will display in the announcement (new line (Shift+Enter) will display too).\n\n*Example:*\n/announce[] *servers only, not DMs* []x[]Super cool announcement[]This is an ***announcement*** *command* example!\n\n**:)** 😉\n\n*Output:*", {files: ['https://i.gyazo.com/6472724170e662eb31fad2a705b9dfe1.png']})
		} else {
			let announcementchannel
			var announcesplit = message.content.split("[]");
			if (message.content == prefix + "announce[]") {
				announcesplit[1] = undefined
				announcesplit[2] = undefined
			}
			if (announcesplit[1] != undefined) {
				if (announcesplit[1].startsWith("<#") && announcesplit[1].endsWith(">")) {
					announcesplit[1] = announcesplit[1].slice(2, -1)
					announcementchannel = client.channels.cache.get(announcesplit[1])
				} else if (isNaN(announcesplit[1]) === false) {
					announcementchannel = client.channels.cache.get(announcesplit[1])
				} else {
					announcementchannel = "pizda"
				}
			}
			if (announcementchannel != "pizda" && announcementchannel != undefined && announcesplit[1] != undefined && announcesplit[2] != undefined) {
				if(announcesplit[3] == undefined || announcesplit[4] == undefined) {
					message.reply("❗ Missing announcement title and/or description! (If made empty on purpose - make sure to include brackets ``[]``)")
				} else {
					const announcementembed = new Discord.MessageEmbed()
					.setColor('#2dcc70')
					.setTitle(announcesplit[3])
					.setDescription(announcesplit[4])
					.setFooter('LUGANE | DM me for assistance or information!');
					if (announcesplit[2] == 'x') {
						announcementchannel.send({ embeds: [announcementembed] });
						message.reply("Sucessfuly announced **" + announcesplit[3] + "** in <#" + announcesplit[1] + ">!\nAnnouncement made by <@" + message.author.id + "> (" + message.author.id + ") at <t:" + Math.floor(Date.now()/1000) + ">")
					} else if (announcesplit[2] == "everyone" || announcesplit[2] == "@everyone") {
						announcementchannel.send({content: "@everyone", embeds: [announcementembed] });
						message.reply("Sucessfuly announced **" + announcesplit[3] + "** in <#" + announcesplit[1] + ">!\nAnnouncement made by <@" + message.author.id + "> (" + message.author.id + ") at <t:" + Math.floor(Date.now()/1000) + ">")
					} else if (announcesplit[2] == "here" || announcesplit[2] == "@here") {
						announcementchannel.send({content: "@here", embeds: [announcementembed] });
						message.reply("Sucessfuly announced **" + announcesplit[3] + "** in <#" + announcesplit[1] + ">!\nAnnouncement made by <@" + message.author.id + "> (" + message.author.id + ") at <t:" + Math.floor(Date.now()/1000) + ">")
					} else if (announcesplit[2].startsWith("<@&") && announcesplit[2].endsWith(">")) {
						if (message.guild.roles.cache.get(announcesplit[2].slice(3, -1)) == undefined) {
							message.reply("❗ Mentioned role not found (does not exist or is deleted)!")
						} else {
							announcementchannel.send({content: announcesplit[2], embeds: [announcementembed] });
							message.reply("Sucessfuly announced **" + announcesplit[3] + "** in <#" + announcesplit[1] + ">!\nAnnouncement made by <@" + message.author.id + "> (" + message.author.id + ") at <t:" + Math.floor(Date.now()/1000) + ">")
						}
					} else if (isNaN(announcesplit[2]) === false) {
						if (message.guild.roles.cache.get(announcesplit[2]) == undefined) {
							message.reply("❗ Mentioned role not found (does not exist or is deleted)!")
						} else {
							announcementchannel.send({content: "<@&" + announcesplit[2] + ">", embeds: [announcementembed] });
							message.reply("Sucessfuly announced **" + announcesplit[3] + "** in <#" + announcesplit[1] + ">!\nAnnouncement made by <@" + message.author.id + "> (" + message.author.id + ") at <t:" + Math.floor(Date.now()/1000) + ">")
						}
					} else {
						message.reply("❗ Incorrect mention type!\n(``x`` OR `` `` (space) (no mention) / ``here`` OR ``@here`` / ``everyone`` OR ``@everyone`` / ``ROLE_MENTION`` / ``ROLE_ID``)")
					}
				}
			} else if (announcementchannel == "pizda" || announcementchannel == undefined || announcesplit[1] == undefined) {
				message.reply("❗ Incorrect channel or channel not found!\n(``ID`` / ``TEXT_CHANNEL``)")
			} else {
				message.reply("❗ Incorrect mention type!\n(``x`` OR `` `` (space) (no mention) / ``here`` OR ``@here`` / ``everyone`` OR ``@everyone`` / ``ROLE_MENTION`` / ``ROLE_ID``)")
			}
		}
	} else {
		message.reply('❗ Insufficient permissions');
	}	
}
function ban(message) {
	/*if(message.member.permissions.has("ADMINISTRATOR")) {
		message.channel.send("ADMINISTRATOR TRUE")
	}else{
		message.channel.send("❗ Insufficient permissions")
	}
	const split = message.content.split(" ");
		const target = split[1]
		if(target.startsWith("<@")) {

		}
		if(isNaN(split[2])) { //checks if 2nd variable is a number (day count OR reason)
			const days = 0
			const reason = split[2]
		}else{
			const days = split[2]
			const reason = split[3]
		}*/
		
		

	/*message.author.ban({days: 1, reason: 'test'})
		.then(console.log)
		.catch(console.error);*/
}
async function replydm(message) {
	const messagerefrence = await message.fetchReference().catch(console.log)
	if (messagerefrence != undefined && messagerefrence.author.id === client.user.id && messagerefrence.embeds[0] != undefined) {
		var replydmsplit = messagerefrence.embeds[0].author.name.split("   |   ");
		const userid = replydmsplit[1]
		const senderuser = await client.users.cache.get(userid)
		var createddm
		if (senderuser != undefined) {
			createddm = await senderuser.createDM()
		} else {
			createddm = undefined
		}
		if (message.content === prefix + "answered" || message.content === prefix + "ignored" || message.content === prefix + "block" || message.content === prefix + "ignore" || message.content === prefix + "blocked") {
			if (message.content === prefix + "answered") {
				messagerefrence.edit("✅ Answered by <@" + message.author.id + "> (" + message.author.id + "): *Marked answered by command*")
				message.delete()
			} else if (message.content === prefix + "ignored" || message.content === prefix + "ignore") {
				messagerefrence.edit("🛑 Ignored by <@" + message.author.id + "> (" + message.author.id + ")")
				message.delete()
			} else {
				messagerefrence.edit("⛔ Block request by <@" + message.author.id + "> (" + message.author.id + ")\n*(Administrator ping: <@746662409724231798>)*")
				message.delete()
			}
		} else {
			if (senderuser === undefined || senderuser === null || createddm === undefined) {
				messagerefrence.edit("⚠️ Unable to retrive user")
				client.channels.cache.get("799266353999642664").send("<@" + message.author.id + ">\n❗ User cannot be retrived (most probably left the server or blocked the bot user)!")
				message.delete()
			} else {
				messagerefrence.edit("✅ Answered by <@" + message.author.id + "> (" + message.author.id + "): ```" + message.content + "```")
				createddm.send(message.content)
				message.delete()
			}
		}
	} else if (message.author != client.user) {
		client.channels.cache.get("799266353999642664").send("<@" + message.author.id + ">, please use <#811369640390950922> only to reply to customer service messages. Do this by using the reply function. General communication within <#811369640390950922> is strictly prohibited!\n\nThe ``" + prefix + "dm`` command can be executed in this channel.")
		message.delete()
	}
}
function myid(message) {
	message.reply(message.author.id)
}

client.login(process.env.BOT_TOKEN);
//©raltec 2021 2022