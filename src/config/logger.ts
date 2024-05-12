import winston from 'winston';
import path from 'path';

const logFilePath = path.join(__dirname, '..', 'logfile.txt'); // Adjust the path as needed

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new winston.transports.File({ filename: logFilePath }) // Log to a file in the root folder
    ]
});

export default logger;
