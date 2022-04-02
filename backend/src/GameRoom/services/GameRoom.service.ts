import { Logger } from "@nestjs/common";

import { User } from "@Data/types";

export class GameRoomRepository {

  private gameRooms = new Map<string, User[]>();

  constructor(
    // private logger: Logger
  ) {}

  addGameUser(gameId: string, user: User) {
    if (!this.gameRooms.has(gameId)) {
      this.gameRooms.set(gameId, []);
    }

    let room = this.gameRooms.get(gameId);
    
    if (room.length && room.some(u => u.id === user.id) || !user.id) {
      return room;
    }

    this.gameRooms.set(gameId, [...room ,user]);
    // this.logger.log(this.gameRooms.get(gameId), 'User Added');
  }

  removeGameUser(gameId: string, user: User) {
    if (!this.gameRooms.has(gameId)) {
      return;
    }

    this.gameRooms.set(gameId, this.gameRooms.get(gameId).filter(u => u.id !== user.id));

    // if (!this.gameRooms.get(gameId).length) {
    //   this.gameRooms.delete(gameId);
    // }
  }

  pickUserCard(gameId: string, user: User, selectedValue: string) {
    const room = this.gameRooms.get(gameId);
    const selectedUser = room.find(u => u.id === user.id);
    selectedUser.selectedCard = selectedValue;

    this.gameRooms.set(gameId, [...room]);
  }

  resetGame(gameId: string) {
    const room = this.gameRooms.get(gameId);
    this.gameRooms.set(gameId, room.map(u => ({
      ...u,
      selectedCard: null
    })));
  }

  getGameRoom(gameId: string) {
    return this.gameRooms.get(gameId);
  }
}
