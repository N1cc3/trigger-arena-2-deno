export const createWebSocket = () => {
  const websocket = new WebSocket('ws://localhost:8080/')
  websocket.onopen = () => {
    setInterval(() => {
      websocket.send(`Client says hello`)
    }, 1000)
  }
  websocket.onmessage = (ev) => {
    console.log(ev.data)
  }
}
