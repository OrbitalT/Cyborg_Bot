const { MongoClient } = require('mongodb')
const { MongoDBProvider } = require('commando-provider-mongo')
const path = require('path')
const Commando = require('discord.js-commando')

const config = require('./config/config.json')
const loadCommands = require('./commands/load-commands')
const commandBase = require('./commands/command-base')
const loadFeatures = require('./features/load-features')
const mongo = require('./util/mongo')

const modLogs = require('./features/features/mod-logs')

const client = new Commando.CommandoClient({
  owner: '210004181845671936',
  commandPrefix: config.prefix,
})

client.setProvider(
  MongoClient.connect(config.mongoPath, {
    useUnifiedTopology: true
  })
    .then((client) => {
      return new MongoDBProvider(client, 'CyberBot')
    })
    .catch((err) => {
      console.error(err)
    })
)

client.on('ready', async () => {
  console.log('The client is ready!')

  await mongo()

  client.registry
    .registerGroups([
      ['misc', 'misc commands'],
      ['moderation', 'moderation commands'],
      ['economy', 'Commands for the economy system']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'cmds'))

  // commandBase.loadPrefixes(client)
  // loadCommands(client)
  loadFeatures(client)

  modLogs(client)
})

client.login(config.token)