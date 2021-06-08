import { GameObjects, Input } from 'phaser'
import { GAME_SCENE } from './GameScene'

type PointerEvent = (pointer: Input.Pointer, gameObject: GameObjects.GameObject) => void

export const createCard = () => {
  const container = GAME_SCENE.add.container(window.innerWidth / 2, window.innerHeight + 200)
  const card = GAME_SCENE.add.sprite(0, 0, 'card')
  container.add(card)
  GAME_SCENE.hand.add(container)
  GAME_SCENE.hand.getChildren().forEach((c, idx) => {
    GAME_SCENE.tweens.add({ targets: c, x: handPosX(idx), y: window.innerHeight - 400, duration: 200 })
  })

  container.setSize(card.width, card.height)
  container.setInteractive()
  GAME_SCENE.input.setDraggable(container)
  // container.setInteractive({ draggable: true })

  container.on('drag', ((pointer) => {
    GAME_SCENE.tweens.add({ targets: container, x: pointer.x, y: pointer.y, duration: 50 })
  }) as PointerEvent)

  container.on('dragstart', (() => {
    GAME_SCENE.tweens.add({ targets: container, scale: 1.5, depth: 1, duration: 200 })
  }) as PointerEvent)

  container.on('dragend', (() => {
    GAME_SCENE.tweens.add({
      targets: container,
      x: handPosX(GAME_SCENE.hand.getChildren().indexOf(container)),
      y: window.innerHeight - 400,
      scale: 1,
      depth: 0,
      duration: 200,
    })
  }) as PointerEvent)

  const style = {
    font: '32px Arial',
    color: 'black',
  }

  const text = GAME_SCENE.add.text(-card.width / 2 + 10, -150, `Takes damage`, style)
  container.add(text)

  return container
}

const handPosX = (idx: number) => (idx + 1) * (window.innerWidth / (GAME_SCENE.hand.getLength() + 1))
