import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: string | number;
  database: {
    MONGODB_URI: string;
    MONGODB_DB_MAIN: string;
  };
  auth: {
    JWT_SECRET: string;
    JWT_EXPIRE_MINUTES: number;
    REFRESH_SECRET: string;
    REFRESH_EXPIRE_DAYS: number;
  };
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db',
  },
  auth: {
    JWT_SECRET: process.env.JWT_SECRET || '@QEGTUI',
    JWT_EXPIRE_MINUTES: parseInt(process.env.JWT_EXPIRE_MINUTES, 10) || 10,
    REFRESH_SECRET: process.env.REFRESH_SECRET || '@QEGTUI',
    REFRESH_EXPIRE_DAYS: parseInt(process.env.REFRESH_EXPIRE_DAYS, 10) || 20,
  },
};

const production: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db',
  },
  auth: {
    JWT_SECRET: process.env.JWT_SECRET || '@QEGTUI',
    JWT_EXPIRE_MINUTES: parseInt(process.env.JWT_EXPIRE_MINUTES, 10) || 10,
    REFRESH_SECRET: process.env.REFRESH_SECRET || '@QEGTUI',
    REFRESH_EXPIRE_DAYS: parseInt(process.env.REFRESH_EXPIRE_DAYS, 10) || 20,
  },
};

const test: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    MONGODB_DB_MAIN: 'test_users_db',
  },
  auth: {
    JWT_SECRET: process.env.JWT_SECRET || '@QEGTUI',
    JWT_EXPIRE_MINUTES: parseInt(process.env.JWT_EXPIRE_MINUTES, 10) || 10,
    REFRESH_SECRET: process.env.REFRESH_SECRET || '@QEGTUI',
    REFRESH_EXPIRE_DAYS: parseInt(process.env.REFRESH_EXPIRE_DAYS, 10) || 20,
  },
};

const config: {
  [name: string]: IConfig;
} = {
  test,
  development,
  production,
};

export default config[NODE_ENV];
