import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ImportEntities } from 'src/imports/entity.import';
const username = process.env.DB_USERNAME || 'dev';
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
  type: 'postgres',
  host: process.env.DB_HOSTNAME || '192.168.30.28',
  port: parseInt(process.env.DB_PORT) || 5432,
  parseInt8: true,
  username: username,
  password: password,
  database: dbName,
  entities: ImportEntities,
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
  logger: 'file',
  // dateStrings: ['DATE', 'DATETIME', 'TIMESTAMP'],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
  cache: cache,
};
