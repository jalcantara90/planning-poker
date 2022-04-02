import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { GetGameRoomByIdCommand } from "./GetGameRoomById.command";
import { GetGameRoomByIdResponse } from "./GetGameRoomById.response";
import { GameRoomRepository } from '../../services/GameRoom.service';

@CommandHandler(GetGameRoomByIdCommand)
export class GetGameRoomByIdHandler implements ICommandHandler<GetGameRoomByIdCommand, GetGameRoomByIdResponse>{

  constructor(
    private gameRoomRepository: GameRoomRepository
  ) {}

  async execute(command: GetGameRoomByIdCommand) {
    const gameRoomUsers = this.gameRoomRepository.getGameRoom(command.gameRoomId);
    return new GetGameRoomByIdResponse(gameRoomUsers);
  }
}
