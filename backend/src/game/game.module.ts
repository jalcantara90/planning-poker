import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger, Module } from '@nestjs/common';

import { Game, VotingSystem } from '@Data/Entities';

import { GameController } from './controller/Game.controller';
import { CreateGameHandler } from './commands/CreateGame/CreateGameHandler';
import { GetGameByIdHandler } from './queries/GetGameById/GetGameByIdHandler';

const handlers = [
  CreateGameHandler,
  GetGameByIdHandler
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Game,
      VotingSystem
    ])
  ],
  providers: [
    ...handlers,
    Logger
  ],
  controllers: [GameController]
})
export class GameModule {}
