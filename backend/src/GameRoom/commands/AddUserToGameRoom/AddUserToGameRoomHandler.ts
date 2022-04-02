import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddUserToGameRoomCommand } from './AddUserToGameRoomCommand';

import { AddUserToGameResponse } from './AddUserToGameResponse';
import { GameRoomRepository } from '../../services/GameRoom.service';

@CommandHandler(AddUserToGameRoomCommand)
export class AddUserToGameRoomHandler implements ICommandHandler<AddUserToGameRoomCommand, AddUserToGameResponse> {

  constructor(
    private gameRoomRepository: GameRoomRepository
  ) {}

  execute({ gameId, user }: AddUserToGameRoomCommand): Promise<AddUserToGameResponse> {
    this.gameRoomRepository.addGameUser(gameId, user);
    const room = this.gameRoomRepository.getGameRoom(gameId);

    return Promise.resolve(new AddUserToGameResponse(room));
  }
}