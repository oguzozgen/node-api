import fs from 'fs';
import 'winston-daily-rotate-file';
import winston, { format } from 'winston';

import { Config } from '../helpers/config';

const LOG_DIR = Config.get('LOG_DIR', 'logs');
const LOG_LEVEL = Config.get('LOG_LEVEL', 'info');

// Create log directory if it does not exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: 'info',
    }),
    new winston.transports.DailyRotateFile({
      format: format.combine(format.timestamp(), format.json()),
      maxFiles: '14d',
      level: LOG_LEVEL,
      dirname: LOG_DIR,
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%-debug.log',
    }),
  ],
});

/**
 * A writable stream for winston logger.
 */
export const logStream = {
  write(message) {
    logger.info(message.toString());
  },
};

export default logger;
