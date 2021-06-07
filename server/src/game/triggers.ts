import { Game, Player } from "./game.ts";

export type TriggerId = "takes-damage";

export type TriggerType = Readonly<{
  id: TriggerId;
  text: string;
  isTriggered: (game: Game, self: Player) => boolean;
}>;

export const TRIGGERS: readonly TriggerType[] = [
  {
    id: "takes-damage",
    text: "When you take damage",
    isTriggered: (game: Game, self: Player) =>
      game.events.some((e) =>
        e.effectId === "damage" &&
        e.targetIdxs.includes(game.players.indexOf(self))
      ),
  },
];
