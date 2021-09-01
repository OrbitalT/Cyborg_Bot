module.exports = {
    commands: 'ping',
    descripting: 'Pings things',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.reply('Pong')
    },
}