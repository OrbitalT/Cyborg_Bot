module.exports = {
    category: 'Misc',
    description: 'Replies with pong', // Required for slash commands
    slash: 'both', // Create both a slash and legacy command
    callback: ({ message, interaction }) => {
      const reply = 'Pong!'
  
      // message is provided only for a legacy command
      if (message) {
        message.reply({
          content: reply
        })
        return
      }
  
      // interaction is provided only for a slash command
      interaction.reply({
        content: reply
      })
    },
}