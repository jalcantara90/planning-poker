import { useCallback, useEffect, useState } from "react";

import { buildUsersPlace } from "./utils";
import { useToggle } from "../shared/hooks";
import { settings } from '../shared/settings';
import { useGame } from "../shared/game/hooks";
import { GameOptions } from "../shared/game/types";
import { User, UserPlaces } from "../shared/user/types";
import { useGameSockets } from '../core/sockets/hooks';
import { useUserContext } from '../shared/user/context';

const COUNTDOWN_TIME = 2; // in seconds

export function useGamePlay(gameId: string) {
  const { game, isLoading } = useGame(gameId);
  const [options, setOptions] = useState<GameOptions[]>();
  const [users, setUsers] = useState<UserPlaces>({
    bottom: [],
    top: [],
    right: [],
    left: []
  });

  const onResetVoting = useCallback(() => {
    setOptions(ops => ops?.map(option => ({ ...option, isSelected: false })));
  }, [setOptions]);

  const { user } = useUserContext();
  const { 
    userList, 
    pickCard, 
    resetGame, 
    countDown, 
    setCountDown,
    reveal, 
    toggleReveal, 
    initRevealGame
  } = useGameRoom(gameId, onResetVoting);

  const selectOption = (value: number | string) => {
    const lastValue = options?.find(option => option.isSelected);
    const updatedOptions = options?.map(option => ({ 
      ...option,
      isSelected: option.value === value && (value !== lastValue?.value || !lastValue)
    }));
  
    setOptions(updatedOptions);
    pickCard({ user: user as User, gameId, selectedValue: value });
  };

  const revealCards = () => {
    initRevealGame({ gameId });
    setCountDown(COUNTDOWN_TIME);
  };

  
  const resetVoting = () => {
    toggleReveal();
    setCountDown(null);
    resetGame({ gameId });
    setOptions(ops => ops?.map(option => ({ ...option, isSelected: false })));
  };

  useEffect(() => {
    setUsers(buildUsersPlace(userList));
  }, [userList, buildUsersPlace]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setOptions(game?.options);
  }, [game]);

  return {
    options,
    users,
    revealCards,
    resetVoting,
    selectOption,
    reveal,
    countDown
  }
}

function useGameRoom(gameId: string, onResetVoting: () => void) {
  const [userList, setUserList] = useState<User[]>([]);
  const { user } = useUserContext();
  const [countDown, setCountDown] = useState<number | null>(null);
  const [reveal, toggleReveal, setReveal] = useToggle(false);
  const onUserJoined = useCallback(({ userList, gameId: gId } : { userList: User[], gameId: string }) => {
    if (gId !== gameId) {
      return;
    }
    setUserList(userList);
  }, []);

  const initShowCards = useCallback(({ gameId: gId }) => {
    if (gId !== gameId) {
      return;
    }

    setCountDown(COUNTDOWN_TIME);
  }, []);

  const showCards = useCallback(({ gameId: gId }) => {
    if (gId !== gameId) {
      return;
    }

    setReveal(true);
  }, [toggleReveal]);

  const resetVoting = useCallback(({ userList, gameId: gId }: { userList: User[], gameId: string }) => {
    if (gId !== gameId) {
      return;
    }

    setReveal(false);
    setCountDown(null);
    setUserList(userList);
    onResetVoting();
  }, [onResetVoting, toggleReveal, setCountDown]);

  const { 
    joinGame, 
    pickCard,
    leftGame,
    resetGame,
    revealGame,
    initRevealGame,
  } = useGameSockets({
    onUserJoined,
    onUserPickCard: onUserJoined,
    initShowCards,
    showCards,
    onResetVoting: resetVoting
  });

  const getRoom = useCallback(async () => {
    const res = await fetch(`${settings.apiUrl}/api/game-rooms/${gameId}`);
    const data = await res.json();
    setUserList(data.userList);
  }, []);

  useEffect(() => {
    getRoom();
  }, [getRoom, gameId]);

  useEffect(() => {
    const leftGameFn = () => {
      if (!user) {
        return;
      }
      
      leftGame({ user, gameId });
    };

    window.addEventListener('beforeunload', leftGameFn);
    return () => {
      if (!user) {
        return;
      }
      
      leftGame({ user, gameId });
      window.removeEventListener('beforeunload', leftGameFn);
    };
  }, [])


  useEffect(() => {
    if (!user) {
      return;
    }

    joinGame({user, gameId});
  }, [user, gameId]);

  useEffect(() => {
    countDown && countDown > 0 && setTimeout(
      () => setCountDown(countDown - 1),
      1000
    );

    if (countDown === 0) {
      toggleReveal();
    }
  }, [countDown]);

  return {
    userList,
    joinGame,
    pickCard: ({ user, gameId, selectedValue }: { user: User, gameId: string, selectedValue: string | number}) => {
      pickCard({ user, gameId, selectedValue }, ({ userList, gameId: gId }: any) => {
        if (gId !== gameId) {
          return;
        }
  
        setUserList(userList);
      });
    },
    resetGame: ({ gameId }: { gameId: string}) => {
      resetGame({ gameId });
      setUserList(uList => uList.map(x => ({ ...x, selectedCard: '' })));
    },
    revealGame,
    countDown,
    reveal,
    setCountDown,
    toggleReveal,
    initRevealGame
  };
}