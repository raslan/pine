import { get, set } from '../../store/init.mjs'
const skip = {
  name: 'skip',
  description: 'Skip the current track.',
  execute: async (query, message, client, Discord) => {
    const server = get().globalQueue.get(message.guild.id)
    if (!server) return
    else server.connection.dispatcher.end()
  },
}

export default skip
