import { get } from '../../store/init.mjs'
const leave = {
  name: 'leave',
  description: 'Leave the current channel.',
  execute: async (query, message, client, Discord) => {
    const server = get().globalQueue.get(message.guild.id)
    if (!server) return
    else {
      server.voiceChannel.leave()
    }
  },
}

export default leave
