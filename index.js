const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION']
})
const config = require('./config/config.json')
const WOKCommands = require('wokcommands')

client.on('ready', () => {

    new WOKCommands(client, {
        commandsDir: 'commands',
        featuresDir: 'features',
        messagesPath: '',
        showWarns: true,
        del: -1,
        defaultLangauge: "english",
        ignoreBots: false
    })
})

client.login(config.token)