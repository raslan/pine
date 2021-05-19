'use strict'

import Discord from 'discord.js'
import dotenv from 'dotenv'
import commands from './commands/index.mjs'

dotenv.config()

const client = new Discord.Client()

client.commands = new Discord.Collection()

commands.forEach((command) => {
  client.commands.set(command.name, command)
})

const parseCommand = (command, message) => {
  const [action, ...args] = command.split(/ +/)
  const query = args.join` `
  client.commands.get(action)?.execute(query, message, client, Discord)
}

client.on('message', async (message) => {
  const content = message.content.toLowerCase()
  if (!message.author.bot && content.includes('israel'))
    message.channel.send(`Fuck Israel :flag_ps:`)
  if (!message.author.bot && content.includes('ping'))
    message.channel.send(`Pong :ping_pong:`)
  if (message.author.bot || !content.startsWith(process.env.PREFIX)) return
  try {
    parseCommand(content.slice(process.env.PREFIX.length + 1), message)
  } catch (error) {
    message.reply(`Sorry, I didn't get that :disappointed:`)
  }
})

client.on('ready', () => {
  console.log('Connected as ' + client.user.tag)
  client.user.setActivity('文化', { type: 'LISTENING' })
})

process.on('unhandledRejection', (error) =>
  console.error('Uncaught Promise Rejection', error)
)

client.login(process.env.BOT_TOKEN)
