import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'
import { EFFECTS } from './effects.ts'
import { Game, Player, simulate } from './game.ts'
import { TARGETS } from './targets.ts'

const createPlayer = (): Player => ({
  name: 'player',
  health: 10,
})

const createGame = (): Game => ({
  id: 'g1',
  players: [
    { ...createPlayer(), name: 'p1' },
    { ...createPlayer(), name: 'p2' },
  ],
  cards: [],
  events: [],
  hands: [
    [
      {
        type: 'instant',
        effect: { ...EFFECTS[0], power: 1 },
        target: { ...TARGETS[0], power: 1 },
      },
    ],
  ],
  turn: 0,
})

Deno.test('game simulate', () => {
  const game = { ...createGame() }
  simulate(game, { use: 0, discard: 1 })
  assertEquals(game.events[0].effectId, 'damage')
})
