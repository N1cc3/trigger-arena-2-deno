import { GameObjects, Input } from 'phaser'
import { GAME_SCENE } from './GameScene'

type PointerEvent = (pointer: Input.Pointer, gameObject: GameObjects.GameObject) => void

export const createCard = () => {
  const container = GAME_SCENE.add.container(window.innerWidth / 2, window.innerHeight + 200)
  const cardBack = GAME_SCENE.add.sprite(0, 0, 'cardBack')
  const card = GAME_SCENE.add.sprite(0, 0, 'card')

  GAME_SCENE.hand.add(container)
  GAME_SCENE.hand.getChildren().forEach((c, idx) => {
    GAME_SCENE.tweens.add({ targets: c, x: handPosX(idx), y: window.innerHeight - 400, duration: 200 })
  })

  container.setSize(card.width, card.height)
  container.setInteractive()
  GAME_SCENE.input.setDraggable(container)

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
    font: '24px Odibee Sans',
    color: 'white',
    stroke: '#000',
    strokeThickness: 3,
  }

  const triggerBg = GAME_SCENE.add.sprite(0, -100, 'trigger')
  const triggerText = GAME_SCENE.add.text(0, -115, `Takes damage`, style).setOrigin(0.5, 0)

  const damage = 5
  const effectBg = GAME_SCENE.add.sprite(0, 0, 'trigger')
  const effectText = GAME_SCENE.add.text(0, -15, `Deals ${damage} damage`, style).setOrigin(0.5, 0)

  const targetBg = GAME_SCENE.add.sprite(0, 100, 'trigger')
  const targetText = GAME_SCENE.add.text(0, 85, `Everyone`, style).setOrigin(0.5, 0)

  container.add(cardBack)
  container.add(triggerBg)
  container.add(effectBg)
  container.add(targetBg)
  container.add(card)
  container.add(triggerText)
  container.add(effectText)
  container.add(targetText)

  return container
}

const handPosX = (idx: number) => (idx + 1) * (window.innerWidth / (GAME_SCENE.hand.getLength() + 1))
