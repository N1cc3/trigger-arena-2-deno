import { listenAndServe } from 'https://deno.land/std@0.97.0/http/server.ts'
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
} from 'https://deno.land/std@0.97.0/ws/mod.ts'

listenAndServe({ port: 8080 }, (req) => {
  const { conn, r: bufReader, w: bufWriter, headers } = req
  acceptWebSocket({ conn, bufReader, bufWriter, headers })
    .then(handleWs)
    .catch(async (err) => {
      console.error(`Failed to accept websocket: ${err}`)
      await req.respond({ status: 400 })
    })
})

const handleWs = async (sock: WebSocket) => {
  console.log('socket connected!')
  try {
    for await (const ev of sock) {
      if (typeof ev === 'string') {
        // text message.
        console.log('ws:Text', ev)
        await sock.send(ev)
      } else if (ev instanceof Uint8Array) {
        // binary message.
        console.log('ws:Binary', ev)
      } else if (isWebSocketPingEvent(ev)) {
        const [, body] = ev
        // ping.
        console.log('ws:Ping', body)
      } else if (isWebSocketCloseEvent(ev)) {
        // close.
        const { code, reason } = ev
        console.log('ws:Close', code, reason)
      }
    }
  } catch (err) {
    console.error(`Failed to receive frame: ${err}`)
    if (!sock.isClosed) await sock.close(1000).catch(console.error)
  }
}
