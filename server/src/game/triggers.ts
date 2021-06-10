import { Event, GameState, Player } from './game.ts'

export type TriggerId = 'takes-damage'

export type TriggerType = Readonly<{
  text: string
  isTriggered: (state: GameState, events: Event[], self: Player) => boolean
}>

export const TRIGGERS: Readonly<{ [id in TriggerId]: TriggerType }> = {
  'takes-damage': {
    text: 'When you take damage',
    isTriggered: (state, events, self) =>
      events.some((e) => e.effect.typeId === 'damage' && e.targetIdxs.includes(state.players.indexOf(self))),
  },
}
