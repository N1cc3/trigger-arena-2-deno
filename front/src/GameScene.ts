import Phaser from 'phaser'
import cardImg from './assets/card.png'
import gameMusic from './assets/game.ogg'
import menuMusic from './assets/menu.ogg'
import { createCard } from './Card'

class GameScene extends Phaser.Scene {
  hand = new Phaser.GameObjects.Group(this)

  public preload() {
    this.load.image('card', cardImg)
    this.load.audio('game', gameMusic)
    this.load.audio('menu', menuMusic)
  }

  public create() {
    setTimeout(() => createCard(), 0)
    setTimeout(() => createCard(), 500)
    setTimeout(() => createCard(), 1000)

    const music = this.sound.add('menu', { loop: true })
    music.play()
  }

  public update() {
    // TODO
  }
}
export const GAME_SCENE = new GameScene({})
