import { registerAs } from "@nestjs/config";

export default registerAs('config', () => ({
  port: process.env.PORT,
  typeORMPort: process.env.TYPEORM_PORT,
  typeORMHost: process.env.TYPEORM_HOST,
  typeORMUser: process.env.TYPEORM_USERNAME,
  typeORMDatabase: process.env.TYPEORM_DATABASE,
  typeORMPassword: process.env.TYPEORM_PASSWORD,
  typeORMPConnection: process.env.TYPEORM_CONNECTION
}));
