import { useUserContext } from './../shared/user/context';
import { useCallback, useEffect, useState } from "react";

import { buildUsersPlace } from "./utils";
import { useToggle } from "../shared/hooks";
import { useGame } from "../shared/game/hooks";
import { GameOptions } from "../shared/game/types";
import { User, UserPlaces } from "../shared/user/types";
import { useGameSockets } from '../core/sockets/hooks';

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
  const [userList, setUserList] = useState<User[]>([]);
  const [reveal, toggleReveal] = useToggle(false);
  const [countDown, setCountDown] = useState<number | null>(null);
  const { user } = useUserContext();

  const onUserJoined = useCallback(({ user } : { user: User }) => {
    debugger;
    if (userList.some(u => u.id === user.id)) {
      return;
    }

    setUserList(prevUserList => [...prevUserList, user]);
  }, [])

  const { joinGame } = useGameSockets(onUserJoined)

  const selectOption = (value: number | string) => {
    const lastValue = options?.find(option => option.isSelected);
    const updatedOptions = options?.map(option => ({ 
      ...option,
      isSelected: option.value === value && (value !== lastValue?.value || !lastValue)
    }));
  
    setOptions(updatedOptions);
  }

  const revealCards = () => setCountDown(COUNTDOWN_TIME);
  
  const resetVoting = () => {
    toggleReveal();
    setCountDown(null);
    setUsers(userPlaces => ({
      bottom: userPlaces.bottom.map(user => ({ ...user, selectedCard: null })),
      top: userPlaces.top.map(user => ({ ...user, selectedCard: null })),
      right: userPlaces.right.map(user => ({ ...user, selectedCard: null })),
      left: userPlaces.left.map(user => ({ ...user, selectedCard: null }))
    }));
    setOptions(ops => ops?.map(option => ({ ...option, isSelected: false })));
  }

  useEffect(() => {
    setUsers(buildUsersPlace(userList));
  }, [userList, buildUsersPlace]);

  useEffect(() => {
    if (!user.id || userList.some(u => u.id === user.id)) {
      return;
    }

    joinGame({user, gameId});
    setUserList(prevState => [...prevState, user]);
  }, [user]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setOptions(game?.options);
  }, [game]);

  useEffect(() => {
    if (!options?.length) {
      return;
    }

    const selectedOption = options?.find(option => option.isSelected);

    setUsers(prevState => ({
      ...prevState,
      bottom: prevState.bottom.map((user) => {
        if (user.me) {
          user.selectedCard = selectedOption?.value;
        }
        return user;
      })
    }));    
  }, [options]);

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
    options,
    users,
    revealCards,
    resetVoting,
    selectOption,
    reveal,
    countDown,
    // joinGame
  }
}


// const mockedUserList: User[] = [
//   { id: '6', name: 'Eric', me: false, selectedCard: 'S', isSpectator: false },
//   { id: '2', name: 'Mourad', me: false, selectedCard: 'S', isSpectator: false },
//   { id: '3', name: 'Marçal', me: false, selectedCard: 'M', isSpectator: false },
//   { id: '4', name: 'Carmen', me: false, selectedCard: 'L', isSpectator: false },
//   { id: '5', name: 'Joan', me: false, selectedCard: 'XL', isSpectator: false },
//   // { id: '1', name: 'Jonathan', me: true, isSpectator: false },
//   { id: '7', name: 'Carlos', me: false, isSpectator: true },
//   { id: '8', name: 'Borja', me: false, isSpectator: false },
//   { id: '9', name: 'Manu', me: false, isSpectator: true},
// ];