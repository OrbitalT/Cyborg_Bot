const upvotesSchema = require('../../schemas/upvotes-schema')
const config = require('../../config/config.json')

module.exports = (client) => {
    const channelTag = '884574659230728243'
    const botID = '882110782538670161'
    client.on('message', async message => {
        if (message.channel.id === channelTag && message.author !== botID && !message.content.startsWith(config.prefix)) {
            try {
                await message.react('👍');
                await message.react('👎');
            } catch (err) {
                console.error(err);
            }
        }

        const { guild, mentions } = message
        const { channels } = mentions
        const targetChannel = channels.first() || message.channel

        const newMessage = message

        // console.log(guild.id, targetChannel.id, newMessage.id);

        new upvotesSchema({
            guildId: guild.id,
            channelId: targetChannel.id,
            messageId: newMessage.id,
            reactCount: 1,
          })
            .save()
            .catch(() => {
              message
                .reply('Failed to save to the database, please report this!')
                .then((message) => {
                  message.delete({
                    timeout: 1000 * 10,
                  })
                })
            })
    });
}

module.exports.config = {
    // The display name that server owners will see.
    // This can be changed at any time.
    displayName: 'New Upvotes',

    // The name the database will use to set if it is enabled or not.
    // This should NEVER be changed once set, and users cannot see it.
    dbName: 'VOTES',

    // Being true means a database connection must be present before the
    // feature is enabled.
    loadDBFirst: false
}