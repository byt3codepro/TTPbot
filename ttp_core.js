//connect - node ttp_core.js

const Discord = require('discord.js')
const client = new Discord.Client()


client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    client.user.setActivity('with a ČKD Tatra T6B5')
    let publicAnnouncements = client.channels.get('641978767337586708')
    let staffAnnouncements = client.channels.get('641984322303164426')
    let publicGeneral = client.channels.get('641731631287238669')
    let staffGeneral = client.channels.get('641983971504160770')
    let ttpTestChannel = client.channels.get('642490607079653416')
    let autsim = client.channels.get('622531501413892135')
    //desiredChannel.send('where am i?')
    client.on('message', (message) => {
        if(message.content == 'ping?'){
                message.react('🤔')
                message.channel.send('idk\n***bruh***');
            }
        });
    console.log('   >>> SCRIPT EXECUTED')
})

client.login(process.env.BOT_TOKEN);

/*

const attachment = new Discord.Attachment("https://cdn.discordapp.com/attachments/437328470750789632/657533568121307177/1962-gads-pirmais-tramvajs-rvz-6-121-dodas-uz-11-marsruta-sliedem_977254667.png")
staffAnnouncements.send(">>> <:TTP:642373499205451797> ***POLL***\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\nShould we have uniforms like these?\nCast your votes with :white_check_mark: and :negative_squared_cross_mark:!", attachment,)
staffAnnouncements.send("||@everyone||")
client.on("message", (message) => {
    if(message.author == client.user){
            message.react("✅")
            message.react("❎")
            if(message.content == "||@everyone||"){
                message.delete()
            }
        }
    });
    
    
*/
