import { useQuery } from "react-query";
import { VotingSystem } from "../voting-system/type";
import { CreateGameRequest, CreateGameResponse, GameOptions } from "./types"
import { buildOptions } from "./utils";

export function useGameCreate() {
  const create = async (request: CreateGameRequest) => {
    try {
      const res = await fetch('http://localhost:3001/api/games', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      return await res.json() as CreateGameResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    create
  };
};

export function useGame(gameId: string) {
  const { data, isLoading } = useQuery<{ name: string, options: GameOptions[] }>('game', async () => {
    const res = await fetch(`http://localhost:3001/api/games/${gameId}`);
    const game = await res.json();

    return {
      ...game,
      options: buildOptions(game.votingSystem)
    };
  });

  return {
    game: data,
    isLoading
  };
};
