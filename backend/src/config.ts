import { registerAs } from "@nestjs/config";

export default registerAs('config', () => ({
  dbType: 'postgres',
  port: process.env.PORT,
  postgresPort: process.env.POSTGRES_PORT,
  postgresHost: process.env.POSTGRES_HOST,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDatabase: process.env.POSTGRES_DATABASE
}));
