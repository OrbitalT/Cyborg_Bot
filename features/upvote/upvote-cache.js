const upvotesSchema = require('../../schemas/upvotes-schema')

const cache = {} // { guildId: [message, { Emoji: RoleID }] }

const fetchCache = (guildId) => cache[guildId] || []

//Video Timestamp is 32 mins

const addToCache = async (guildId, message) => {
  const array = cache[guildId] || [message]

  await message.channel.messages.fetch(message.id, true, true)

  cache[guildId] = array
}

const handleReaction = async (reaction, user, adding) => {
  const channelTag = '884574659230728243'
  const botID = '882110782538670161'
  const { message } = reaction
  const { guild } = message

  if (user.id === botID) {
    return
  }

  //If User Upvotes a video then the reactCounter goes up
  //Video Timestamp is 36 mins

  const [fetchedMessage] = fetchCache(guild.id)

  if (!fetchedMessage) {
    return
  }

  //Fetchedmessage is last message cached, does not loop through cached messages
  if (fetchedMessage.id === message.id) {
    console.log(fetchedMessage.id, reaction.count);

    const obj = {
      guildId: guild.id,
      channelId: fetchedMessage.channel.id,
      messageId: fetchedMessage.id,
    }

    await upvotesSchema.findOneAndUpdate(
      obj,
      {
        ...obj,
        $set: {
          reactCount: reaction.count,
        },
      },
      {
        upsert: true,
      }
    )
  }
}

module.exports = async (client) => {
  client.on('messageReactionAdd', (reaction, user) => {
    handleReaction(reaction, user, true)
  })

  client.on('messageReactionRemove', (reaction, user) => {
    handleReaction(reaction, user, false)
  })

  //Getting Data from DB
  const results = await upvotesSchema.find()

  for (const result of results) {
    const { guildId, channelId, messageId, reactCount } = result

    const guild = await client.guilds.cache.get(guildId)

    if (!guild) {
      console.log(`Removing guild ID "${guildId}" from the database`)
      await upvotesSchema.deleteOne({ guildId })
      return
    }

    const channel = await guild.channels.cache.get(channelId)

    if (!channel) {
      console.log(`Removing channel ID "${channelId}" from the database`)
      await upvotesSchema.deleteOne({ channelId })
      return
    }

    try {
      const cacheMessage = true
      const skipCache = true
      const fetchedMessage = await channel.messages.fetch(
        messageId,
        cacheMessage,
        skipCache
      )

      if (fetchedMessage) {
        cache[guildId] = [fetchedMessage]
        // console.log(cache[guildId]);
      }
    } catch (e) {
      console.log(`Removing message ID "${messageId}" from the database`)
      await upvotesSchema.deleteOne({ messageId })
    }
  }
}

module.exports.fetchCache = fetchCache
module.exports.addToCache = addToCache

module.exports.config = {
  // The display name that server owners will see.
  // This can be changed at any time.
  displayName: 'Upvotes Cache Check',

  // The name the database will use to set if it is enabled or not.
  // This should NEVER be changed once set, and users cannot see it.
  dbName: 'UPCACHECHECK',

  // Being true means a database connection must be present before the
  // feature is enabled.
  loadDBFirst: false
}