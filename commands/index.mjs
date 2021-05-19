import help from './help.mjs'
import clear from './clear.mjs'

import play from './music/play.mjs'
import volume from './music/volume.mjs'
import leave from './music/leave.mjs'
import skip from './music/skip.mjs'
import stop from './music/stop.mjs'
import queue from './music/queue.mjs'
import pause from './music/pause.mjs'

const commands = [play, help, clear, volume, leave, skip, stop, queue, pause]

export default commands
