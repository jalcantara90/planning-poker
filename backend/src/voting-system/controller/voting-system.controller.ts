import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { Controller, Post, Body, Get } from '@nestjs/common';

import { GetAllVotingSystemCommand } from '../queries/get-all-voting-system';
import { CreateVotingSystemRequest, CreateVotingSystemCommand } from '../commands/create-voting-system';

@ApiTags('VotingSystem')
@Controller('voting-system')
export class VotingSystemController {

  constructor(
    private commandBus: CommandBus
  ) {}

  @Post()
  create(@Body() request: CreateVotingSystemRequest) {
    return this.commandBus.execute(
      new CreateVotingSystemCommand(request.name, request.options)
    );
  }

  @Get()
  getAll() {
    return this.commandBus.execute(
      new GetAllVotingSystemCommand()
    );
  }
}