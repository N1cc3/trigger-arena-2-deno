import Phaser from 'phaser'
import { createCard } from './Card'
import cardImg from './card.png'

class GameScene extends Phaser.Scene {
  hand = new Phaser.GameObjects.Group(this)

  public preload() {
    this.load.image('card', cardImg)
  }

  public create() {
    setTimeout(() => createCard(), 0)
    setTimeout(() => createCard(), 500)
    setTimeout(() => createCard(), 1000)
  }

  public update() {
    // TODO
  }
}
export const GAME_SCENE = new GameScene({})
