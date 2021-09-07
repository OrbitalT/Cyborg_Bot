// Basic welcome message feature
module.exports = (client, instance) => {
  // Listen for new members joining a guild
  client.on("guildMemberAdd", (member) => {
    // Access the guild that they joined
    const { guild } = member

    // Get the channel named "welcome"
    const channel = guild.channels.cache.find(
      (channel) => channel.name === "welcome"
    )
    
    // Ensure this channel exists
    if (!channel) {
      return
    }

    // Send the welcome message
    channel.send(`Welcome ${member} to the server!`)
  })
}

// Configuration for this feature
module.exports.config = {
  // The display name that server owners will see.
  // This can be changed at any time.
  displayName: 'Welcome Message',
  
  // The name the database will use to set if it is enabled or not.
  // This should NEVER be changed once set, and users cannot see it.
  dbName: 'WELCOME MESSAGE',
  
  // Being true means a database connection must be present before the
  // feature is enabled.
  loadDBFirst: true
}