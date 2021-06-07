import { Player } from "./game.ts";

export type TargetId = "self";

export type TargetType = Readonly<{
  id: TargetId;
  text: (power: number) => string;
  getTargets: (players: Player[], self: Player) => Player[];
}>;

export const TARGETS: readonly TargetType[] = [
  {
    id: "self",
    text: (_) => "Self",
    getTargets: (_, self) => [self],
  },
];
