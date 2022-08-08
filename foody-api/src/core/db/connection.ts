import * as mongoose from 'mongoose';
import config from '../env/index';
import logger from '../utils/logger';

const MONGO_URI: string = `${config.database.MONGODB_URI}${config.database.MONGODB_DB_MAIN}`;

export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI);

// handlers
db.on('connecting', () => {
  logger.log({
    level: 'verbose',
    message: 'MongoDB :: connecting',
    consoleLoggerOptions: { label: 'MONGO' },
  });
});

db.on('error', (error) => {
  logger.log({
    level: 'verbose',
    message: `MongoDB :: connection ${error}`,
    consoleLoggerOptions: { label: 'MONGO' },
  });
  mongoose.disconnect();
});

db.on('connected', () => {
  logger.log({
    level: 'verbose',
    message: 'MongoDB :: connected',
    consoleLoggerOptions: { label: 'MONGO' },
  });
});

db.once('open', () => {
  logger.log({
    level: 'verbose',
    message: 'MongoDB :: connection opened',
    consoleLoggerOptions: { label: 'MONGO' },
  });
});

db.on('reconnected', () => {
  logger.log({
    level: 'verbose',
    message: 'MongoDB :: reconnected',
    consoleLoggerOptions: { label: 'MONGO' },
  });
});

db.on('reconnectFailed', () => {
  logger.log({
    level: 'verbose',
    message: 'MongoDB :: reconnectFailed',
    consoleLoggerOptions: { label: 'MONGO' },
  });
});

db.on('disconnected', () => {
  logger.log({
    level: 'verbose',
    message: 'MongoDB :: disconnected',
    consoleLoggerOptions: { label: 'MONGO' },
  });
});

db.on('fullsetup', () => {
  logger.log({
    level: 'verbose',
    message: 'MongoDB :: reconnecting... %d',
    consoleLoggerOptions: { label: 'MONGO' },
  });
});
