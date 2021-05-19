const clear = {
  name: 'clear',
  description: 'Deletes a specified number of messages',
  execute: async (query, message, client, Discord) => {
    if (!query.length || !Number(query))
      return message.reply(`You have to give me a number of messages.`)
    const amount = +query
    if (amount > 100 || amount < 1)
      return message.reply(`Sorry, that's not a valid value :disappointed:`)
    const messages = await message.channel.messages.fetch({ limit: amount })
    await message?.channel?.bulkDelete?.(messages)
  },
}

export default clear
