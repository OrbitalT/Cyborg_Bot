module.exports = (client) => {
    const channelId = '882689807573200936'
  
    const updateMembers = (guild) => {
      const channel = guild.channels.cache.get(channelId)
      if (channel) {
        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
      }
    }
  
    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
    client.on('guildMemberRemove', (member) => updateMembers(member.guild))
  
    const guild = client.guilds.cache.get('881842671960850452')
    updateMembers(guild)
  }