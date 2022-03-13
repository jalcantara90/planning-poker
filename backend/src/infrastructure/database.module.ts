import { ConfigType } from "@nestjs/config";
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import config from "../config";

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
          entities: [],
          synchronize: true,
        };
      },
      inject: [config.KEY]
    })
  ],
  exports: [TypeOrmModule]
}) export class DatabaseModule { }
