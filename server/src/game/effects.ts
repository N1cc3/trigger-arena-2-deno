import { Player } from './game.ts'

export type EffectId = 'damage'

export type EffectType = Readonly<{
  text: (power: number) => string
  applyEffect: (targets: Player[], power: number) => void
}>

export const EFFECTS: Readonly<{ [id in EffectId]: EffectType }> = {
  damage: {
    text: (power) => `Damage ${power}`,
    applyEffect: (targets, power) => {
      targets.forEach((t) => (t.health -= power))
    },
  },
}
