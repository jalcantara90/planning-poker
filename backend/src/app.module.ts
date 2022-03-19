import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@infrastructure/database.module';

import config from './config';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { AppController } from './app.controller';
import { VotingSystemModule } from './voting-system/voting-system.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
