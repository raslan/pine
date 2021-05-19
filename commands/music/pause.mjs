import { get, set } from '../../store/init.mjs'
const pause = {
  name: 'pause',
  description: 'Pause the current track.',
  execute: async (query, message, client, Discord) => {
    const server = get().globalQueue.get(message.guild.id)
    if (!server) return
    else server.connection.dispatcher.pause()
  },
}

export default pause
