const channel = client.channels.cache.get(channelId);

channel.messages.fetch({
    limit: 100
}).then(messages => {
    console.log(`Received ${messages.size} messages`);
    messages.forEach(message => console.log(message.id))
})

client.on('messageReactionAdd', (reaction, user) => {
    if (message.channel.id === channelId && user.id !== botID) {
        const emoji = reaction._emoji.name
        console.log(reaction.message.id)
    }
})