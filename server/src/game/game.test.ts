import { assertEquals as unTypedAssertEquals } from 'https://deno.land/std/testing/asserts.ts'
import { GameState, simulate } from './game.ts'

const assertEquals = <T>(actual: T, expected: T, msg?: string) => unTypedAssertEquals(actual, expected, msg)

Deno.test('simulate', () => {
  const state: GameState = {
    players: [
      { name: 'p1', health: 10 },
      { name: 'p2', health: 10 },
    ],
    hands: [
      [
        {
          type: 'instant',
          target: { typeId: 'self', power: 1 },
          effect: { typeId: 'damage', power: 1 },
        },
      ],
    ],
    cards: [
      {
        type: 'trigger',
        trigger: { typeId: 'takes-damage', power: 1 },
        target: { typeId: 'self', power: 1 },
        effect: { typeId: 'damage', power: 1 },
        health: 1,
        boosts: [],
        ownerIdx: 0,
      },
    ],
    turn: 0,
  }

  const { newState, events } = simulate(state, { use: 0, discard: 1 }, 0)

  assertEquals(events[0], { effect: { typeId: 'damage', power: 1 }, targetIdxs: [0] })
  assertEquals(events[1], { effect: { typeId: 'damage', power: 1 }, targetIdxs: [0] })
  assertEquals(newState.players[0].health, 8)
  assertEquals(newState.turn, 1)
})
