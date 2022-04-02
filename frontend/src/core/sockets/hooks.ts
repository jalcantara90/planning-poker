import { useEffect } from 'react';
import { io } from "socket.io-client";

import { User } from '../../shared/user/types';

type UseGameSockets = {
  onUserJoined: ({userList}: {userList: User[]}) => void;
  onUserPickCard: ({userList}: {userList: User[]}) => void;
  initShowCards: () => void;
  showCards: () => void;
  onResetVoting: ({ userList }: {userList: User[]}) => void;
};

export function useGameSockets({ onUserJoined, initShowCards, showCards, onResetVoting }: UseGameSockets) {
  const socket = io("http://localhost:3001", { transports: ['websocket'] });

  useEffect(() => {
    socket.on('REFRESH_USERLIST', onUserJoined);
    socket.on('INIT_SHOW_CARDS', initShowCards);
    socket.on('SHOW_CARDS', showCards);
    socket.on('RESET_CARDS', onResetVoting);

    return () => {
      socket.off('REFRESH_USERLIST');
      socket.off('INIT_REVEAL_CARDS');
      socket.off('SHOW_CARDS');
      socket.off('RESET_CARDS');
    };
  }, []);

  const joinGame = (payload: { user: User, gameId: string }) => {
    socket.emit('JOIN_GAME', payload);
  };
  
  const leftGame = (payload: { user: User, gameId: string }) => {
    socket.emit('LEFT_GAME', payload);
  };

  const pickCard = (payload: { user: User, gameId: string, selectedValue: string | number }, callback: any) => {
    socket.emit('PICK_CARD', payload, callback);
  };

  const resetGame = (payload: { gameId: string }) => {
    socket.emit('RESET_GAME', payload);
  }

  const revealGame = (payload: { gameId: string }) => {
    socket.emit('REVEAL_CARDS', payload);
  };
  
  const initRevealGame = (payload: { gameId: string }) => {
    socket.emit('INIT_REVEAL_CARDS', payload);
  };

  return {
    joinGame,
    pickCard,
    resetGame,
    revealGame,
    initRevealGame,
    leftGame
  };
}
