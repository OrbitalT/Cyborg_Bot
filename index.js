const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
const config = require('./config/config.json')

const { Intents } = DiscordJS

const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

client.on('ready', () => {
  // The client object is required as the first argument.
  // The second argument is the options object.
  // All properties of this object are optional.

  new WOKCommands(client, {
      // The name of the local folder for your command files
      commandsDir: path.join(__dirname, 'commands'),
      
      // The name of the local folder for your feature files
      featuresDir: path.join(__dirname, 'features'),
      
      // The name of the local file for your message text and translations
      // Omitting this will use the built-in message path
      messagesPath: '',
      
      // If WOKCommands warning should be shown or not, default true
      showWarns: true,
      
      // How many seconds to keep error messages before deleting them
      // -1 means do not delete, defaults to -1
      delErrMsgCooldown: -1,
      defaultLangauge: 'english',
      
      // If your commands should not be ran by a bot, default false
      ignoreBots: false,
      dbOptions: {
          keepAlive: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
      },
      
      // What built-in commands should be disabled.
      // Note that you can overwrite a command as well by using
      // the same name as the command file name.
      disabledDefaultCommands: [
          // 'help',
          // 'command',
          // 'language',
          // 'prefix',
          // 'requiredrole'
      ]
  })
      .setDefaultPrefix('!')
      .setColor(0xff0000)
      .setMongoPath(config.mongoPath)
      .setBotOwner('210004181845671936')
})

client.login(config.token)