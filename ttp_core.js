const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setActivity('with a ČKD Tatra T6B5', { type: 'PLAYING' }); //PLAYING / STREAMING / LISTENING / WATCHING
    client.user.setStatus('online') //online - user is online / idle - user is AFK / offline - user is offline or invisible / dnd - user is in Do Not Disturb
});

client.on('message', message => {
    if (message.guild === null) {
        //space for dm commands
    } else {
        if (message.content == 'ping?') {
            if (message.author.id == 179654608371712000) {
                message.react('❤️')
                message.channel.send("🏓")
                message.channel.send("*** Pong!***");
                } else {        
                    var a = ['no', 'leave me alone', 'ask another bot im busy', '*Ping Service 1x* has been added to your cart\nNew Total: € 6.90', 'noobs doesnt even have a ping', '**666 ms!** ***Burn in hell!***', 'GET LOST', 'im tired of you', 'idk', 'you get coal from me this christmas, only normal people get a ping present', 'This is a Premium feature! You are too poor to afford Premium of such cool bot!']
                    message.react('⛔')
                    message.channel.send(a[Math.floor(Math.random() * a.length)]);
                }
            }
        if (message.content == '/cmds') {
            message.channel.send('Due to budget cuts, this command has been disabled\nWe apologise for any inconvenience caused', {files: ['https://cdn.drawception.com/drawings/LrK4OWAvPQ.png']});
        }
        if (message.content == '/help') {
            message.channel.send({files: ['https://i.imgur.com/FaxXyCs.jpg']});
        }
        if (message.content == '/kevinreys') {
            message.channel.send('Not an idiot without bad grammar, currently working in WMP Roblox as Superintendant for the most active unit in the force. Severe addiction to pot noodles. \n     */ Википедия — свободная энциклопедия /*', {files: ['https://cdn.discordapp.com/attachments/622531501413892135/657994077178036263/Screenshot_1425.png']});
        }
        if (message.content == '/ralfotr') {
            message.channel.send('Rightful owner of the well known TTP bot that provides real information across multiple Discord servers. Also known as a great developer in Roblox, specialising in development of public transport and urban infrastructure. \n     */ Википедия — свободная энциклопедия /*', {files: ['https://image.prntscr.com/image/XIN6YMgfSZS1C8m9X6O7CQ.png']});
        }
        if (message.content == '/iiapp') {
            message.channel.send("iiApp was the first leader of North Korea which he ruled from the country's establishment in 1948 until his death in 1994. He held the posts of Premier from 1948 to 1972 and President from 1972 to 1994. He was also the leader of the Workers' Party of Korea (WPK) from 1949 to 1994 (titled as Chairman from 1949 to 1966 and as General Secretary after 1966). Coming to power after the end of Japanese rule in 1945, he authorized the invasion of South Korea in 1950, triggering an intervention in defense of South Korea by the United Nations led by the United States. Following the military stalemate in the Korean War, a ceasefire was signed on 27 July 1953. He was the third longest-serving non-royal head of state/government in the 20th century, in office for more than 45 years. \n     */ Википедия — свободная энциклопедия /*", {files: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Kim_Il-sung_in_1950.jpg/220px-Kim_Il-sung_in_1950.jpg']});
        }
        if (message.content == '/ciaranoshea') {
            message.channel.send("Single father, working full time at West Midlands Police made by iiApp `see more: /iiApp`. Severe issues with malnutrition - charged with murder after eating his child, pleaded not guilty after realising that a PCSO can't afford food. \n     */ Википедия — свободная энциклопедия /*", {files: ['https://cdn.discordapp.com/attachments/622531501413892135/658042057289629707/Screenshot_1271.png']});
        }
        if (message.content == '/TTP') {
            message.channel.send(">>> <:TTP:642373499205451797> **TRAMVAJU UN TROLEJBUSU PĀRVALDE**\n────────────────────────────\nDibināta 1944.gada oktobrī kā Rīgas pilsētas darbaļaužu deputātu padomes IK Rīgas pilsētas satiksmes un transporta pārvalde.\nNo 19.01.1945.g. pārvalde tiek pārdēvēta par Rīgas pilsētas satiksmes un transporta trestu.\nNo 01.01.1955.g. trests tiek pārdēvēts par Rīgas pilsētas tramvaju un trolejbusu trestu.\nNo 30.12.1961.g. trests pārdēvēts par Tramvaju un trolejbusu pārvaldi.\nNo 1991.g. Rīgas pilsētas pašvaldības uzņēmums 'Tramvaju un trolejbusu pārvalde'.\nSaskaņā ar RD lēmumu Nr.3171 'Par SIA 'Tramvaju un trolejbusu pārvalde'pvienošanu ar SIA 'Rīgas satiksme''un SIA 'Rīgas satiksme' dalībnieku 23.09.2004. kopsapulces lēmumu pievienota SIA 'Rīgas satiksme'.", {files: ['https://i.ibb.co/6vmt1Kh/TTP.png', 'https://i.ibb.co/dgjCy82/bruh.jpg']});
        }
        if (message.content.startsWith('/purge')) {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                var delnum = message.content.split(" ");
                message.delete()
                message.channel.bulkDelete(parseInt(delnum[1]))
                if (parseInt(delnum[1]) > 100) {
                    message.reply("❗ You can only delete 100 or less messages at once").then(msg => {msg.delete(5000)}).catch()
                } else {
                    message.reply("Deleted **" + delnum[1] + "** messages!").then(msg => {msg.delete(5000)}).catch()
                }
            } else {
                message.channel.send('❗ Insufficient permissions');
            }
        }
    }
});

client.login(process.env.BOT_TOKEN);
