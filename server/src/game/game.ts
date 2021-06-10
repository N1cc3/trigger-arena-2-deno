import { EffectId, EFFECTS } from './effects.ts'
import { TargetId, TARGETS } from './targets.ts'
import { TriggerId, TRIGGERS } from './triggers.ts'

export type Game = {
  id: string
  state: GameState
  events: Event[]
}

export type GameState = {
  players: Player[]
  cards: OwnedTriggerCard[]
  hands: { [playerIdx: number]: Card[] }
  turn: number
}

export type Player = {
  name: string
  health: number
  dead?: boolean
}

export type Event = {
  effect: Effect
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
export type EffectfulCard =
  | TriggerCard
  | {
      type: 'instant'
      target: Target
      effect: Effect
    }
export type Card =
  | EffectfulCard
  | {
      type: 'boost'
      boost: Effect
      targetCardIdx: number
    }

export type Powered = { power: number }
export type Trigger = { typeId: TriggerId } & Powered
export type Target = { typeId: TargetId } & Powered
export type Effect = { typeId: EffectId } & Powered

export type Action = { use: number; discard: number; target?: number }

export const simulate = (state: GameState, action: Action, currentPlayerIdx: number) => {
  const newState: GameState = { players: state.players, cards: state.cards, hands: state.hands, turn: state.turn }
  const events: Event[] = []
  const triggered: EffectfulCard[] = []
  const currentPlayer = newState.players[currentPlayerIdx]
  const usedCard = newState.hands[currentPlayerIdx][action.use]

  if (usedCard.type === 'instant') triggered.push(usedCard)
  if (usedCard.type === 'boost') {
    newState.cards[usedCard.targetCardIdx].boosts.push(usedCard.boost)
  }

  let triggeredIdx = 0
  while (triggeredIdx < triggered.length) {
    const card = triggered[triggeredIdx]
    const targets = TARGETS[card.target.typeId].getTargets(newState.players, currentPlayer)
    EFFECTS[card.effect.typeId].applyEffect(targets, card.effect.power)

    events.push({
      effect: card.effect,
      targetIdxs: targets.map((t) => newState.players.indexOf(t)),
    })

    newState.cards.forEach((c) => {
      if (!triggered.includes(c) && TRIGGERS[c.trigger.typeId].isTriggered(newState, events, currentPlayer)) {
        triggered.push(c)
      }
    })

    triggeredIdx++
  }

  newState.turn++

  return { newState, events }
}
