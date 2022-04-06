import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@Data/Database.module';

import config from './Config';
import { AppService } from './app.service';
import { GameModule } from './Game/Game.module';
import { AppController } from './app.controller';
import { GameRoomModule } from './GameRoom/GameRoom.module';
import { VotingSystemModule } from './VotingSystem/VotingSystem.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config]
    }),
    DatabaseModule,
    GameModule,
    VotingSystemModule,
    GameRoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
