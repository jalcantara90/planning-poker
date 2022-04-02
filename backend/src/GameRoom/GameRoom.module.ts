import { LeftUserGameHandler } from './commands/LeftUserGame/LeftUserGameHandler';
import { PickUserCardHandler } from './commands/PickUserCard/PickUserCardHandler';
import { CqrsModule } from '@nestjs/cqrs';
import { Module, Logger } from '@nestjs/common';

import { GameRoomGateway } from './GameRoom.gateway';
import { GameRoomRepository } from './services/GameRoom.service';
import { GameRoomController } from './controllers/GameRoom.controller';

import { ResetGameHandler } from './commands/ResetGame/ResetGameHandler';
import { GetGameRoomByIdHandler } from './queries/GetGameRoomById/GetGameRoomById.handler';
import { AddUserToGameRoomHandler } from './commands/AddUserToGameRoom/AddUserToGameRoomHandler';

const handlers = [
  GetGameRoomByIdHandler,
  AddUserToGameRoomHandler,
  PickUserCardHandler,
  ResetGameHandler,
  LeftUserGameHandler
];

@Module({
  imports: [
    CqrsModule
  ],
  providers: [
    GameRoomGateway,
    Logger,
    GameRoomRepository,
    ...handlers
  ],
  controllers: [
    GameRoomController
  ]
})
export class GameRoomModule {}
