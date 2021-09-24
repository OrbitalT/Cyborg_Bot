const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const upvotesSchema = new mongoose.Schema({
  guildId: reqString,
  channelId: reqString,
  messageId: reqString,
  reactCount: reqString,
})

module.exports = mongoose.model('upvotes-schema', upvotesSchema)