import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 33006,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [`${__dirname}/migrations/*.ts`],
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING === 'true',
  subscribers: [],
});
