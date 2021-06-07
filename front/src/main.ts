import Phaser, { GameObjects } from 'phaser'
import cardImg from './card.png'

class GameScene extends Phaser.Scene {
  handArray: GameObjects.GameObject[] = []

  public preload() {
    this.load.image('card', cardImg)
  }

  public create() {
    setTimeout(() => this.createCard(), 0)
    setTimeout(() => this.createCard(), 500)
    setTimeout(() => this.createCard(), 1000)

    this.input.on('drag', (pointer: any, gameObject: any) => {
      safeInvoke(gameObject.getData('callback')?.drag, pointer, gameObject)
    })
    this.input.on('dragstart', (pointer: any, gameObject: any) => {
      safeInvoke(gameObject.getData('callback')?.dragstart, pointer)
    })
    this.input.on('dragend', (pointer: any, gameObject: any) => {
      safeInvoke(gameObject.getData('callback')?.dragend, pointer)
    })
  }

  public update() {
    // TODO
  }

  private createCard() {
    const card = this.add.sprite(window.innerWidth / 2, window.innerHeight + 200, 'card')
    card.setData('isCard', true)
    this.handArray.push(card)
    this.handArray.forEach((c, idx) => {
      c.setData('handIdx', idx)
      this.tweens.add({
        targets: c,
        x: (idx + 1) * (window.innerWidth / (this.handArray.length + 1)),
        y: window.innerHeight - 400,
        duration: 200,
      })
    })
    card.setInteractive({
      draggable: true,
    } as Phaser.Types.Input.InputConfiguration)

    card.setData('callback', {
      drag: (pointer: any, gameObject: any) => {
        this.tweens.add({
          targets: gameObject,
          x: pointer.x,
          y: pointer.y,
          duration: 50,
        })
      },
      dragstart: (pointer: any) => {
        this.tweens.add({
          targets: card,
          scale: 1.5,
          depth: 1,
          duration: 200,
        })
      },
      dragend: (pointer: any) => {
        this.tweens.add({
          targets: card,
          x: (card.getData('handIdx') + 1) * (window.innerWidth / (this.handArray.length + 1)),
          y: window.innerHeight - 400,
          scale: 1,
          depth: 0,
          duration: 200,
        })
      },
    })

    return card
  }
}

const safeInvoke = (func?: Function, ...args: any[]) => func && func(...args)

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: new GameScene({}),
})
