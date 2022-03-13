import { CreateGameRequest, CreateGameResponse } from "./types"

export function useGame() {

  const create = async (request: CreateGameRequest) => {
    try {
      const res = await fetch('http://localhost:3001/api', {
        method: 'POST',
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
} 

export function useCreateGame() {
  const create = async (request: CreateGameRequest) => {
    try {
      const res = await fetch('http://localhost:3001/api', {
        method: 'POST',
        body: JSON.stringify(request)
      });
  
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    create
  }
};