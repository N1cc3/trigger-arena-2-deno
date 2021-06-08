import { GameObjects, Input, Types } from 'phaser'
import { GAME_SCENE } from './GameScene'

type PointerEvent = (pointer: Input.Pointer, gameObject: GameObjects.GameObject) => void

export const createCard = () => {
  const card = GAME_SCENE.add.sprite(window.innerWidth / 2, window.innerHeight + 200, 'card')
  GAME_SCENE.hand.add(card)
  GAME_SCENE.hand.getChildren().forEach((c, idx) => {
    GAME_SCENE.tweens.add({ targets: c, x: handPosX(idx), y: window.innerHeight - 400, duration: 200 })
  })

  card.setInteractive({ draggable: true } as Types.Input.InputConfiguration)

  card.on('drag', ((pointer) => {
    GAME_SCENE.tweens.add({ targets: card, x: pointer.x, y: pointer.y, duration: 50 })
  }) as PointerEvent)

  card.on('dragstart', (() => {
    GAME_SCENE.tweens.add({ targets: card, scale: 1.5, depth: 1, duration: 200 })
  }) as PointerEvent)

  card.on('dragend', (() => {
    GAME_SCENE.tweens.add({
      targets: card,
      x: handPosX(GAME_SCENE.hand.getChildren().indexOf(card)),
      y: window.innerHeight - 400,
      scale: 1,
      depth: 0,
      duration: 200,
    })
  }) as PointerEvent)

  return card
}

const handPosX = (idx: number) => (idx + 1) * (window.innerWidth / (GAME_SCENE.hand.getLength() + 1))
