import { useEffect } from 'react';
import { io } from "socket.io-client";

import { User } from '../../shared/user/types';

export function useGameSockets(
  callback: ({user}: {user: User}) => void
) {
  const socket = io("http://localhost:3001", { transports: ['websocket'] });

  useEffect(() => {
    socket.on('USER_JOINED', callback);

    return () => {
      socket.off('USER_JOINED');
    };

  });

  const joinGame = (payload: { user: User, gameId: string }) => {
    socket.emit('JOIN_GAME', payload);
  }

  return {
    joinGame
  };
}
