import Phaser from 'phaser'
import backgroundImg from './assets/background2.png'
import cardImg from './assets/card3.png'
import cardBackImg from './assets/card3_back.png'
import gameMusic from './assets/game.ogg'
import menuMusic from './assets/menu.ogg'
import triggerImg from './assets/trigger.png'
import { createCard } from './Card'

class GameScene extends Phaser.Scene {
  hand = new Phaser.GameObjects.Group(this)

  public preload() {
    this.load.image('background', backgroundImg)
    this.load.image('card', cardImg)
    this.load.image('cardBack', cardBackImg)
    this.load.audio('game', gameMusic)
    this.load.audio('menu', menuMusic)
    this.load.image('trigger', triggerImg)
  }

  public create() {
    const music = this.sound.add('game', { loop: true })
    music.play()

    const background = this.add.image(0, 0, 'background').setOrigin(0, 0)
    background.setScale(Math.max(window.innerWidth / background.width, window.innerHeight / background.height))

    setTimeout(() => createCard(), 0)
    setTimeout(() => createCard(), 500)
    setTimeout(() => createCard(), 1000)
  }

  public update() {
    // TODO
  }
}
export const GAME_SCENE = new GameScene({})
