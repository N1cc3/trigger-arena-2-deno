import { Player } from './game.ts'

export type TargetId = 'self'

export type TargetType = Readonly<{
  text: (power: number) => string
  getTargets: (players: Player[], self: Player) => Player[]
}>

export const TARGETS: Readonly<{ [id in TargetId]: TargetType }> = {
  self: {
    text: (_) => 'Self',
    getTargets: (_, self) => [self],
  },
}
