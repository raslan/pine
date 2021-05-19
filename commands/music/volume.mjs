import { get, set } from '../../store/init.mjs'

const volume = {
  name: 'volume',
  description: 'Controls volume',
  execute: async (query, message, client, Discord) => {
    if (!Number(query))
      return message.reply(`Please provide a number between 1 and 100.`)
    const newVolume = +query / 10
    const server = get().globalQueue.get(message.guild.id)
    if (!server) return message.reply(`There's no music currently playing.`)
    server.volume = newVolume
    const { dispatch } = server
    if (dispatch) {
      dispatch.setVolume(newVolume / 10)
    }
    message.reply(`Set volume to ${+query}%`)
  },
}

export default volume
