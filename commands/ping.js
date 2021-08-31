module.exports = {
    category: 'Utility',
    description: 'Replies with "Pong"!',
    callback: ({ message }) => {
        message.reply("Pong!")
    }
}