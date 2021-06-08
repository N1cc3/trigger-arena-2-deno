import { createWebSocket } from './api'
import { GAME_SCENE } from './GameScene'

createWebSocket()

export const GAME = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: GAME_SCENE,
})
