import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LeftUserGameCommand } from './LeftUSerGameCommand';
import { LeftUserGameResponse } from './LeftUserGameResponse';
import { GameRoomRepository } from '../../services/GameRoom.service';

@CommandHandler(LeftUserGameCommand)
export class LeftUserGameHandler implements ICommandHandler<LeftUserGameCommand, LeftUserGameResponse> {

  constructor(
    private gameRoomRepository: GameRoomRepository
  ) {}

  execute({ gameId, user }: LeftUserGameCommand): Promise<LeftUserGameResponse> {
    this.gameRoomRepository.removeGameUser(gameId, user);
    const room = this.gameRoomRepository.getGameRoom(gameId);

    return Promise.resolve(new LeftUserGameResponse(room));
  }
}
