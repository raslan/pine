import searchYouTube from 'yt-search'
import ytdl from 'ytdl-core'
import { get } from '../../store/init.mjs'

const stream = async (message, client, Discord) => {
  try {
    const server = get().globalQueue.get(message.guild.id)
    if (server.playing) return
    else {
      server.playing = true
      if (server.songs.length) {
        // There are songs in the queue.
        const video = server.songs[0]
        // Remove song from queue
        server.songs.shift()
        // Get song stream
        const audioStream = await ytdl(video.url || video.videoId, {
          filter: 'audioonly',
          highWaterMark: 1 << 25,
        })
        // Play
        const dispatch = server.connection.play(audioStream, {
          seek: 0,
          volume: server.volume,
        })
        client.user.setActivity('世界一周', { type: 'LISTENING' })
        // Save dispatch in global state
        server.dispatch = dispatch
        // Recurse over queue when done
        dispatch.on('finish', () => {
          server.playing = false
          stream(message, client, Discord)
        })
        return
      } else {
        // Queue is done.
        server.voiceChannel.leave()
        const { globalQueue } = get()
        globalQueue.delete(message.guild.id)
        return
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const play = {
  name: 'play',
  description: 'Play music from YouTube',
  execute: async (query, message, client, Discord) => {
    const { channel } = message?.member?.voice ?? {}
    if (!channel)
      return message.reply(`Please join a voice channel to use music commands.`)
    else {
      const { globalQueue } = get()
      const serverQueue = globalQueue.get(message.guild.id)
      const userPermissions = channel?.permissionsFor(message.client.user)
      if (!userPermissions?.has('CONNECT') || !userPermissions?.has('SPEAK'))
        return message.reply(
          `You aren't authorized to play music on this channel.`
        )
      const isUrl = query?.includes('https://www.youtube.com')
      const params = isUrl
        ? new URLSearchParams(
            message?.content
              ?.slice(process.env.PREFIX.length + 1)
              ?.split('?')?.[1]
          )
        : ''
      const listId = params?.get?.('list')?.toString()
      const videoId = params?.get?.('v')?.toString()
      const response = !isUrl
        ? await searchYouTube(query)
        : await searchYouTube(
            videoId
              ? {
                  videoId: videoId,
                }
              : {
                  listId: listId,
                }
          )
      const videos = response?.videos
      const video = !videoId ? videos?.[0] : response
      if (videos?.length > 1) videos?.shift()
      if (!serverQueue) {
        const server = {
          textChannel: message.channel,
          voiceChannel: channel,
          dispatch: null,
          connection: null,
          songs: [],
          volume: 0.1,
          playing: false,
        }
        globalQueue.set(message.guild.id, server)
        server.songs.push(video)
        const connection = await channel.join()
        server.connection = connection
        if (listId && !videoId)
          videos.forEach((vid) => {
            try {
              server.songs.push(vid)
            } catch (error) {
              console.log(error)
            }
          })
      } else {
        await serverQueue.songs.push(video)
        if (listId && !videoId)
          videos.forEach(async (vid) => {
            try {
              await serverQueue.songs.push(vid)
            } catch (error) {
              console.log(error)
            }
          })
        await message.reply(`Added to queue.`)
      }
      const embed = new Discord.MessageEmbed()
        .setColor('#e0aca8')
        .setTitle(`${video?.title}`)
        .setURL(`https://www.youtube.com/watch?v=${video.videoId}`)
        .setImage(`${video?.thumbnail}`)
        .setTimestamp()
        .addFields(
          {
            name: `Duration`,
            value: `${video?.duration}`,
          },
          {
            name: `Uploaded By`,
            value: `${video?.author?.name}`,
          }
        )
      await message.reply(embed)
      await stream(message, client, Discord)
    }
  },
}

export default play
