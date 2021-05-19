import { get, set } from '../../store/init.mjs'
const queue = {
  name: 'queue',
  description: 'Some description',
  execute: async (query, message, client, Discord) => {
    const server = get().globalQueue.get(message.guild.id)
    if (!server || !server?.songs?.length)
      message.reply(
        `Sorry, there's nothing in the queue. You can add things to queue using \`pine play\``
      )
    else {
      message.reply(
        `\`\`\`${server.songs.map(
          (song, index) =>
            `${index === 0 ? 'Up next' : index + 1}: ${song.title}`
        ).join`\n`}\`\`\``
      )
    }
  },
}

export default queue
