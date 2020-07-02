import Phaser from 'phaser'
import card from './card.png'

class GameScene extends Phaser.Scene {
  constructor() {
    super({})
  }

  public preload() {
    this.load.image('card', card)
  }

  public create() {
    var particles = this.add.particles('card')

    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 0.1, end: 0 },
      blendMode: 'ADD',
    })

    var logo = this.physics.add.image(400, 100, 'card')

    logo.setScale(0.1)
    logo.setVelocity(100, 200)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)

    emitter.startFollow(logo)
  }

  public update() {
    // TODO
  }
}

var game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: new GameScene(),
})
