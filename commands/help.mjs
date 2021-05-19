import { get } from '../store/init.mjs'
const help = {
  name: 'help',
  description: 'Ask the bot for help',
  execute: async (query, message, client, Discord) => {
    console.log(get())
    await message.channel.send(
      `<@${process.env.OWNER_ID}> hasn't added a help command for me yet. So here's a picture of a bear\n`
    )
    await message.channel.send({
      files: [
        {
          attachment: `https://source.unsplash.com/collection/8997949`,
          name: 'thisisjustabear.jpeg',
        },
      ],
    })
  },
}

export default help
