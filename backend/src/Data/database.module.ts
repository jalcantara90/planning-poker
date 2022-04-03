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
          type: 'mssql',
          host: configService.typeORMHost,
          port: +configService.typeORMPort,
          username: configService.typeORMUser,
          password: configService.typeORMPassword,
          database: configService.typeORMDatabase,
          synchronize: false,
          autoLoadEntities: true
        };
      },
      inject: [config.KEY]
    })
  ],
  exports: [TypeOrmModule]
}) export class DatabaseModule { }
