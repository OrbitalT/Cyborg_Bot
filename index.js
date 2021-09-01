const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config/config.json')
const loadCommands = require('./commands/load-commands')

client.on('ready', () => {
    console.log('Bot Ready!')

    loadCommands(client)
})

client.login(config.token)