import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import { CreateGameRequest } from '../dtos/request/create-game.request';
import { CreateGameResponse } from '../dtos/response/create-game.response';
import { CreateGameCommand } from '../commands/create-game/create-game.command';

@Controller('game')
export class GameController {

  constructor(
    private commandBus: CommandBus
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create game' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The Game has been successfully created.', type: CreateGameResponse })
  public async createGame(@Body() createGame: CreateGameRequest) {
    return await this.commandBus.execute(
      new CreateGameCommand(createGame.name, createGame.votingSystem)
    );
  }
}
