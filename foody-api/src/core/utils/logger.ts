import { createLogger, format, transports } from 'winston';
import { consoleFormat } from 'winston-console-format';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      level: 'error',
      filename: './logs/error.log',
      format: format.json({
        replacer: (key, value) => {
          if (key === 'error') {
            return {
              message: (value as Error).message,
              stack: (value as Error).stack,
            };
          }
          return value;
        },
      }),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      // format: format.simple(),
      format: format.combine(
        format.colorize({ all: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: ['timestamp', 'service'],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
          },
        }),
      ),
    }),
  );
}

export default logger;
