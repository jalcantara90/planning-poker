import { settings } from './../settings';
import { useQuery } from "react-query";

import { buildOptions } from "./utils";
import { CreateGameRequest, CreateGameResponse, GameOptions } from "./types"

export function useGameCreate() {
  const create = async (request: CreateGameRequest) => {
    try {
      const res = await fetch(settings.apiUrl + '/api/games', {
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
    const res = await fetch(`${settings.apiUrl}/api/games/${gameId}`);
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
