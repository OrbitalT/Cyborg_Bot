const client = require('discord.js')

module.exports = {
    commands: ['server', 'ss'],
    descripting: 'List all servers',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        client.guilds.cache.forEach((guild) => {
            console.log(guild);
        })
    },
}