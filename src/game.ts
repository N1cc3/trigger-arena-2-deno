import { EffectId, EffectType } from './effects.ts'
import { TargetType } from './targets.ts'
import { TriggerType } from './triggers.ts'

export type Game = {
  id: string
  players: Player[]
  cards: OwnedTriggerCard[]
  hands: { [playerIdx: number]: Card[] }
  turn: number
  events: Event[]
}

export type Player = {
  name: string
  health: number
  dead?: boolean
}

export type Event = {
  effectId: EffectId
  targetIdxs: number[]
}

export type TriggerCard = {
  type: 'trigger'
  trigger: Trigger
  target: Target
  effect: Effect
  boosts: Effect[]
  health: number
}

export type OwnedTriggerCard = TriggerCard & { ownerIdx: number }
export type EffectfulCard = TriggerCard | { type: 'instant'; target: Target; effect: Effect }
export type Card = EffectfulCard | { type: 'boost'; boost: Effect; targetCardIdx: number }

export type Powered = { power: number }
export type Trigger = TriggerType & Powered
export type Target = TargetType & Powered
export type Effect = EffectType & Powered

export type Action = { use: number; discard: number; target?: number }

export const simulate = (game: Game, action: Action) => {
  game.events = []
  const triggered: EffectfulCard[] = []
  const currentPlayerIdx = game.turn % game.players.length
  const currentPlayer = game.players[currentPlayerIdx]
  const usedCard = game.hands[currentPlayerIdx][action.use]

  if (usedCard.type === 'instant') triggered.push(usedCard)
  if (usedCard.type === 'boost') game.cards[usedCard.targetCardIdx].boosts.push(usedCard.boost)

  let triggeredIdx = 0
  while (triggeredIdx < triggered.length) {
    const card = triggered[triggeredIdx]
    const targets = card.target.getTargets(game.players, currentPlayer)
    card.effect.applyEffect(targets, card.effect.power)

    game.events.push({
      effectId: card.effect.id,
      targetIdxs: targets.map((t) => game.players.indexOf(t)),
    })

    game.cards.forEach((c) => {
      if (!triggered.includes(c) && c.trigger.isTriggered(game, currentPlayer)) triggered.push(c)
    })

    triggeredIdx++
  }
}
