const loadCommands = require('./load-commands')
const { prefix } = require("../config/config.json")

module.exports = {
    commands: ['help', 'h'],
    description: "Describes all bot commands",
    callback: (message, arguments, text) => {
        let reply = 'I am Cyborg, here are my commands:\n\n'

        const commands = loadCommands()

        for (const command of commands) {
            let permissions = command.permission

            if (permissions) {
                let hasPermission = true
                if (typeof permission === 'string') {
                    permissions = [permissions]
                }

                for (const permission of permissions) {
                    if (!message.member.hasPermission(permission)) {
                        hasPermission = false
                        break
                    }
                }

                if (!haspermission) {
                    continue
                }
            }

            const mainCommand = 
                typeof command.commands === 'string' 
                ? command.commands 
                : command.commands[0]
            const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
            const { description } = command

            reply += `**${mainCommand}${args}** = ${description}\n`
        }

        message.channel.send(reply)
    },
}