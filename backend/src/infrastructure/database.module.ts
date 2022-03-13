import { ConfigType } from "@nestjs/config";
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import config from "../config";
import { GameEntity } from "./entities/game.entity";
import { VotingSystemEntity } from './entities/voting-system.entity';
import { VotingSystemOptionEntity } from './entities/voting-system-options.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: configService.postgresHost,
          port: +configService.postgresPort,
          username: configService.postgresUser,
          password: configService.postgresPassword,
          database: configService.postgresDatabase,
          entities: [
            GameEntity,
            VotingSystemEntity,
            VotingSystemOptionEntity
          ],
          synchronize: true,
        };
      },
      inject: [config.KEY]
    })
  ],
  exports: [TypeOrmModule]
}) export class DatabaseModule { }
