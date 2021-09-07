const firstMessage = require('../util/first-message')

module.exports = (client) => {
  const channelId = '882453693868433469'

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    lexcorp: 'LexCorp',
    teentitans: 'Teen Titans',
    secretsocietyofsupervillains: 'Secret Society of Super-Villains',
    justiceleague: 'Justice League',
    leagueofassassins: 'League Of Assassins',
    wayneenterprise: 'Wayne Enterprise',
    legionofsuperpets: 'Legion Of Super-Pets',
    orderofstdumas: 'Order of St. Dumas',
    suicidesquad: 'Suicide Squad'
  }

  const reactions = []

  let emojiText = 'Add a reaction to claim a role\n\n'
  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    const role = emojis[key]
    emojiText += `${emoji} = ${role}\n`
  }

  firstMessage(client, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if (user.id === '882110782538670161') {
      return
    }

    const emoji = reaction._emoji.name

    const { guild } = reaction.message

    const roleName = emojis[emoji]
    if (!roleName) {
      return
    }

    const role = guild.roles.cache.find((role) => role.name === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)

    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
    }
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}

module.exports.config = {
  // The display name that server owners will see.
  // This can be changed at any time.
  displayName: 'Role Claim',
  
  // The name the database will use to set if it is enabled or not.
  // This should NEVER be changed once set, and users cannot see it.
  dbName: 'ROLE CLAIM',
  
  // Being true means a database connection must be present before the
  // feature is enabled.
  loadDBFirst: false
}