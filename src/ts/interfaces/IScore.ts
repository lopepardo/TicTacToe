/**
 * The interface to represent the players' score in a game.
 * @property x - The score of player x.
 * @property o - The score of player o.
 * @property [key: string] - Optional property that can be used to represent the score of any other player if needed.
 */
export interface IScore {
  x: number;
  o: number;
  [key: string]: number;
}
