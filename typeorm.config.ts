import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOSTBD,
  port: Number(process.env.PORTBD),
  username: process.env.USERNAMEBD,
  password: process.env.PASSWORDBD,
  database: process.env.NAMEBD,

  entities: ['src/features/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
});