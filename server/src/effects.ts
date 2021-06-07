import { Player } from './game.ts'

export type EffectId = 'damage'

export type EffectType = Readonly<{
  id: EffectId
  text: (power: number) => string
  applyEffect: (targets: Player[], power: number) => void
}>

export const EFFECTS: readonly EffectType[] = [
  {
    id: 'damage',
    text: (power) => `Damage ${power}`,
    applyEffect: (targets, power) => {
      targets.forEach((t) => (t.health -= power))
    },
  },
]
