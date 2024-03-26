import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ImportEntities } from 'src/imports/entity.import';
const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || 'Aj189628@';
const dbName = process.env.DB_NAME || 'nest-ecom';
let cache: any = process.env.IS_CACHE
  ? {
      duration: 60000,
    }
  : false;

if (process.env.IS_REDIS) {
  cache = {
    duration: 60000,
    type: 'redis',
    options: {
      host: 'localhost',
      port: 6379,
      database: 1,
      password: 'Aj189628@',
    },
  };
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOSTNAME || '192.168.1.107',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: username,
  password: password,
  database: dbName,
  entities: ImportEntities,
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
  logger: 'file',
  dateStrings: ['DATE', 'DATETIME', 'TIMESTAMP'],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
  cache: cache,
};
