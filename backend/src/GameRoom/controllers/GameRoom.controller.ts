import { ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { Controller, Get, Param } from "@nestjs/common";

import { GetGameRoomByIdCommand } from '../queries/GetGameRoomById/GetGameRoomById.command';

@ApiTags('GamesRooms')
@Controller('game-rooms')
export class GameRoomController {

  constructor(
    private commandBus: CommandBus
  ) {}

  @Get(':id')
  public async getGameRoomById(@Param('id') roomId: string) {
    return await this.commandBus.execute(
      new GetGameRoomByIdCommand(roomId)
    );
  }
}
