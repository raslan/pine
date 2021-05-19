import { get, set } from '../store/init.mjs'
const empty = {
  name: 'empty',
  description: 'Some description',
  execute: async (query, message, client, Discord) => {},
}

export default empty
