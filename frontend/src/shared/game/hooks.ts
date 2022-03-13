import { Game, User } from "./types"

export type UseGame = {
  create: (game: Game) => Game;
}

export function useGame(): UseGame {

  const create = (game: Game): Game => {
    return {
      ...game,
      members: [
        
      ]
    };
  }

  return {
    create
  };
} 
