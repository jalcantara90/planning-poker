import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger, Module } from '@nestjs/common';

import { Game, VotingSystem } from '@infrastructure/entities';

import { GameController } from './controller/game.controller';
import { CreateGameHandler } from './commands/create-game/create-game.handler';
import { GetGameByIdHandler } from './queries/get-game-by-id/get-game-by-id.handler';

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
