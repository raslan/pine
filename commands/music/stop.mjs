import { get } from '../../store/init.mjs'
const stop = {
  name: 'stop',
  description: 'Stop playing.',
  execute: async (query, message, client, Discord) => {
    const server = get().globalQueue.get(message.guild.id)
    if (!server) return
    else {
      server.songs = []
      server.connection.dispatcher.end()
    }
  },
}

export default stop
