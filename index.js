const Discord = require('discord.js'),
    client = new Discord.Client(),
    {
        perspective,
        token
    } = require('./config'),
    AntiToxic = require('./AntiToxic')

let Toxic = new AntiToxic(perspective)

client.on('ready', () => {
    console.clear()
    console.log(`${client.user.username} is online!`)
})

client.on('message', async message => {
    if(message.author.bot || message.attachments?.first()) return;
    let toxicPercent = await Toxic.init(message.content)
    if(toxicPercent) {
        if(message.deletable) await message.delete().catch(e => {
            console.error(e)
        })
        message.channel.send("You sent a toxic message!")
    }
})

client.login(token)