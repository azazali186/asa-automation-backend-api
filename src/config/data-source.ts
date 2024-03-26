import { createConnection, Connection, DataSourceOptions } from 'typeorm';
import * as mysqlDriver from 'mysql2';

const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || 'Aj189628@';
const dbName = process.env.DB_NAME || 'nest-ecom';
const cache: any = process.env.IS_CACHE
  ? {
      duration: 60000,
    }
  : {
      duration: 60000,
      type: 'redis',
      options: {
        host: 'localhost',
        port: 6379,
        database: 2,
        password: 'Aj189628@',
      },
    };

export function getConfig() {
  return {
    driver: mysqlDriver,
    type: 'mysql',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    port: parseInt(process.env.DB_PORT) || 3306,
    username: username,
    password: password,
    database: dbName,
    synchronize: false,
    migrations: ['../migrations/*.ts'],
    subscribers: ['../subscribers/*.ts'],
    entities: ['../entities/**.*.ts'],
    cache: cache,
  } as DataSourceOptions;
}

class DataSource {
  private static connection: Connection;

  public static async initialize(): Promise<void> {
    if (!this.connection) {
      this.connection = await createConnection({
        type: 'mysql',
        host: process.env.DB_HOSTNAME || '127.0.0.1',
        port: parseInt(process.env.DB_PORT) || 3306,
        username: username,
        password: password,
        database: dbName,
        // entities: ImportEntities, // Assuming ImportEntities returns an array of entity classes
        // Alternatively, you can use a glob pattern:
        entities: ['src/entities/**.*.ts'],
        synchronize: false,
        logging: true,
        migrations: ['src/migrations/*.ts'],
        subscribers: ['src/subscribers/*.ts'],
        cache: cache,
      });

      // console.log('Database connection established');
    }
  }

  public static getConnection(): Connection {
    if (!this.connection) {
      throw new Error(
        'Connection not initialized. Call DataSource.initialize() first.',
      );
    }

    return this.connection;
  }

  public static async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      // console.log('Database connection closed');
    }
  }
}

export { DataSource };
