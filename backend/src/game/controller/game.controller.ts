import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post, Get, Param } from '@nestjs/common';

import { GetGameByIdCommand, GetGameByIdResponse } from '../queries/get-game-by-id';
import { CreateGameRequest, CreateGameResponse, CreateGameCommand } from '../commands/create-game';

@ApiTags('Games')
@Controller('games')
export class GameController {

  constructor(
    private commandBus: CommandBus
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get game by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: GetGameByIdResponse })
  public async getGameById(@Param('id') id: string): Promise<GetGameByIdResponse> {
    return await this.commandBus.execute(
      new GetGameByIdCommand(id)
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create game' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The Game has been successfully created.', type: CreateGameResponse })
  public async createGame(@Body() request: CreateGameRequest) {
    return await this.commandBus.execute(
      new CreateGameCommand(request.name, request.votingSystemId)
    );
  }
}
