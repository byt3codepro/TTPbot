//©raltec 2019

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    let ttpTestChannel = client.channels.get("642490607079653416")
    ttpTestChannel.send("Bot restarted - " + Date())
    //xmas 641978767337586708
    let xmas = client.channels.get("642490607079653416")
    xmas.send('*TTP Administration team wishes you* ***Happy Christmas!***\nDuring this time we encourage you to spend time with your family and have fun gifting and receiving gifts!\n||@everyone||', {files: ['https://i.gyazo.com/a7c7bb0f17c7a02abab776f7f6a48de7.png']})
    client.user.setActivity('with Christmas cards', { type: 'PLAYING' }); //PLAYING / STREAMING / LISTENING / WATCHING
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
                    var a = ['no', 'leave me alone', 'you aint worth my time', 'why do u even want ur ping', 'ask another bot im busy', 'not you again', 'god help me', '*Ping Service 1x* has been added to your cart\nNew Total: € 6.90', 'noobs doesnt even have a ping', '**666 ms!** ***Burn in hell!***', 'GET LOST', 'im tired of you', 'idk', 'you get coal from me this christmas, only normal people get a ping present', 'This is a Premium feature! You are too poor to afford Premium of such cool bot!']
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
        if (message.content.startsWith('/ttp')) {
            var lang = message.content.split(" ");
            if (lang[1] == 'lv') {
                message.channel.send(">>> <:TTP:642373499205451797> **TRAMVAJU UN TROLEJBUSU PĀRVALDE**\n────────────────────────────\nDibināta 1944.gada oktobrī kā Rīgas pilsētas darbaļaužu deputātu padomes IK Rīgas pilsētas satiksmes un transporta pārvalde.\n\nNo 19.01.1945.g. pārvalde tiek pārdēvēta par Rīgas pilsētas satiksmes un transporta trestu.\n\nNo 01.01.1955.g. trests tiek pārdēvēts par Rīgas pilsētas tramvaju un trolejbusu trestu.\n\nNo 30.12.1961.g. trests pārdēvēts par Tramvaju un trolejbusu pārvaldi.\n\nNo 1991.g. Rīgas pilsētas pašvaldības uzņēmums 'Tramvaju un trolejbusu pārvalde'.\n\nSaskaņā ar RD lēmumu Nr.3171 'Par SIA 'Tramvaju un trolejbusu pārvalde' pievienošanu SIA 'Rīgas satiksme'' un SIA 'Rīgas satiksme' dalībnieku 23.09.2004. kopsapulces lēmumu pievienota SIA 'Rīgas satiksme'.", {files: ['https://i.gyazo.com/c2da46134a992ace4d9ee3cda7cfe8b2.png', 'https://i.gyazo.com/e6b60cb753ffad8b3b4d91cfdb13fdbf.jpg']});
            } else {
                if (lang[1] == 'en') {
                    message.channel.send(">>> <:TTP:642373499205451797> **TRAMVAJU UN TROLEJBUSU PĀRVALDE**\n( *Tram and Trolleybus Management* )\n────────────────────────────\nEstablished in October 1944 as the 'Riga City Traffic and Transport Department' of the Riga City Workers Deputy Council.\n\n01/19/1945 - renamed to 'Riga City Traffic and Transport Trust'.\n\n01/01/1955 - renamed to 'Riga City Tram and Trolleybus Trust'.\n\n12/30/1961 - renamed to 'Tram and Trolleybus Management'.\n\nSince 1991 - Riga City Municipal Enterprise (Rīgas domes SIA) 'Tram and Trolley Management'.\n\nFollowing Riga Council Resolution No. 3171 on the 'incorporation of 'Tram and Trolley Management' into the members of SIA 'Rīgas satiksme'' and SIA 'Rīgas satiksme' 23.09.2004. the decision of the Board Meeting was attached to SIA 'Rīgas satiksme'.", {files: ['https://i.gyazo.com/c2da46134a992ace4d9ee3cda7cfe8b2.png', 'https://i.gyazo.com/e6b60cb753ffad8b3b4d91cfdb13fdbf.jpg']});
                } else {
                    if (lang[1] == 'lt') {
                    message.channel.send(">>> <:TTP:642373499205451797> **TRAMVAJU UN TROLEJBUSU PĀRVALDE**\n( *Tramvajų ir troleibusų vadyba* )\n────────────────────────────\nĮkurtas 1944 Spalį 'Rygos miesto ir transporto departamentas' Rygos Miesto Darbininkų taryboje.\n\n01/19/1945 pervadintas į 'Rygos Miesto eismo ir transporto vadyba'\n\n01/01/1955 pervadintas į 'Rygos Miesto tramvajų ir troleibusų vadyba'\n\n12/30/1961 - pervadintas į 'Tramvajų ir Troleibusų vadyba'\n\nNuo 1991-  Rygos Miesto Savivaldybės įmonė (Rīgas domes SIA)\n\nRygos miesto savivaldybės nutarimu Nr. 3171, bendrovė 'Tramvajų ir troleibusų vadyba' 2004 metų rugsėjo 23 dieną buvo prijungta į vieną įmonę- 'Rygos eismas' SIA 'Rīgas satiksme'.\n\n\n`Translated EN --> LT; SlayerzPlayz`", {files: ['https://i.gyazo.com/c2da46134a992ace4d9ee3cda7cfe8b2.png', 'https://i.gyazo.com/e6b60cb753ffad8b3b4d91cfdb13fdbf.jpg']});
                    } else {
                        if (lang[1] == 'pl') {
                            message.channel.send(">>> <:TTP:642373499205451797> **TRAMVAJU UN TROLEJBUSU PĀRVALDE**\n( *Zarząd Tramwajów i Trolejbusów* )\n────────────────────────────\nUtworzony w październiku 1944 r. jako 'Wydział Ruchu i Transportu Miasta Rygi', będący częścią Rady Ryskich Pracowników Miejskich.\n\n01/19/1945 r. - przemianowany został na 'Urząd ds. Ruchu i Komunikacji Miejskiej w Rydze'.\n\n01/01/1955 - przemianowany został na 'Urząd ds. Ryskich Tramwajów i Trolejbusów'.\n\n12/30/1961 - przemianowany został na 'Zarząd Tramwajów i Trolejbusów'.\n\nOd 1991 r. do teraz - Miejske Przedsiębiorstwo Komunalne Miasta Rygi (Rīgas domes SIA) 'Zarząd Tramwajów i Trolejbusów'.\n\nJako następstwo uchwały Rady Rygi nr 3171 w sprawie 'włączenia zarządzania tramwajami i trolejbusami do członków SIA Rīgas satiksme' z dnia 23 września 2004 r. decyzja zarządu została dołączona do istniejącego SIA 'Rīgas satiksme'.\n\n\n`Translated EN --> PL; sthakrk`", {files: ['https://i.gyazo.com/c2da46134a992ace4d9ee3cda7cfe8b2.png', 'https://i.gyazo.com/e6b60cb753ffad8b3b4d91cfdb13fdbf.jpg']});
                        } else {
                            message.channel.send("❗ Invalid language   ``/ttp [en/lv/lt/pl]``")
                        }
                    }
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
