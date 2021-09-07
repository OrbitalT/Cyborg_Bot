const profileSchema = require('../schemas/profile-schema')

module.exports = (client) => {
  client.on('message', (message) => {
    const { guild, member } = message

    addXP(guild.id, member.id, 23, message)
  })
}

const getNeededXP = (level) => level * level * 100

const addXP = async (guildId, userId, xpToAdd, message) => {
  const result = await profileSchema.findOneAndUpdate(
    {
      guildId,
      userId,
    },
    {
      guildId,
      userId,
      $inc: {
        xp: xpToAdd,
      },
    },
    {
      upsert: true,
      new: true,
    }
  )

  let { xp, level } = result
  const needed = getNeededXP(level)

  if (xp >= needed) {
    ++level
    xp -= needed

    message.reply(
      `You are now level ${level} with ${xp} experience! You now need ${getNeededXP(
        level
      )} XP to level up again.`
    )

    await profileSchema.updateOne(
      {
        guildId,
        userId,
      },
      {
        level,
        xp,
      }
    )
  }
}

module.exports.addXP = addXP

module.exports.config = {
  // The display name that server owners will see.
  // This can be changed at any time.
  displayName: 'Levels',
  
  // The name the database will use to set if it is enabled or not.
  // This should NEVER be changed once set, and users cannot see it.
  dbName: 'LEVELS',
  
  // Being true means a database connection must be present before the
  // feature is enabled.
  loadDBFirst: true
}