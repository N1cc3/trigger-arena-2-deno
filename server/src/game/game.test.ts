import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { EffectId, EFFECTS, EffectType } from "./effects.ts";
import { Game, Player, simulate } from "./game.ts";
import { TargetId, TARGETS, TargetType } from "./targets.ts";
import { TriggerId, TRIGGERS, TriggerType } from "./triggers.ts";

const createPlayer = (): Player => ({
  name: "player",
  health: 10,
});

const createGame = (): Game => ({
  id: "g1",
  players: [
    { ...createPlayer(), name: "p1" },
    { ...createPlayer(), name: "p2" },
  ],
  cards: [],
  events: [],
  hands: [],
  turn: 0,
});

const mapped = <T>(list: readonly T[], getKey: (element: T) => string) =>
  list.reduce((acc, curr) => ({ ...acc, [getKey(curr)]: curr }), {});

const triggers = mapped(TRIGGERS, (e) => e.id) as {
  [id in TriggerId]: TriggerType;
};
const targets = mapped(TARGETS, (e) => e.id) as {
  [id in TargetId]: TargetType;
};
const effects = mapped(EFFECTS, (e) => e.id) as {
  [id in EffectId]: EffectType;
};

Deno.test("game simulate", () => {
  const game: Game = {
    ...createGame(),
    hands: [
      [
        {
          type: "instant",
          target: { ...targets.self, power: 1 },
          effect: { ...effects.damage, power: 1 },
        },
      ],
    ],
    cards: [
      {
        type: "trigger",
        trigger: { ...triggers["takes-damage"], power: 1 },
        target: { ...targets.self, power: 1 },
        effect: { ...effects.damage, power: 1 },
        health: 1,
        boosts: [],
        ownerIdx: 0,
      },
    ],
  };

  simulate(game, { use: 0, discard: 1 });

  assertEquals(game.events[0].effectId, "damage");
  assertEquals(game.events[1].effectId, "damage");
  assertEquals(game.players[0].health, 8);
});
