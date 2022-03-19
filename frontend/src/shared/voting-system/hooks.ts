import { useState, useEffect, useCallback } from 'react';

import { VotingSystem } from './type';

export function useVotingSystem() {
  const [votingSystemList, setVotingSystemList] = useState<VotingSystem[]>([]);

  const getAll = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3001/api/voting-system');
      const data = await res.json();
      setVotingSystemList(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [fetch]);

  useEffect(() => {
    getAll()
  }, [getAll])

  return {
    votingSystemList
  };
}
