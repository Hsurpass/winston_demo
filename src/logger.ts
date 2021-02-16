import moment = require("moment");
import { createLogger, transports, format } from "winston";
import DailyRotateFile = require("winston-daily-rotate-file");

const console = new transports.Console();
const file = new transports.File({ 
    filename: "testFile.log",
    dirname: "./log"
});
const dailyFile = new DailyRotateFile({
    filename: "test_%DATE%.log",
    dirname: "./log"
});

const customizeFormat = format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] [${level}] ${message}`;
});

export const logger = createLogger({
    level: 'silly',
    format: format.combine(
        format.splat(),
        format.timestamp({ format: () => moment().format('YYYY-MM-DD hh:mm:ss.SSS') }),
        customizeFormat
    ),
    transports: [
        console,
        file,
        dailyFile
    ]
});

logger.info("test, %d, %s, %s, %s", 123, "456", [7, 8, 9], { a: 11 });
logger.info("test, %d, %s, %j, %j", 123, "456", [7, 8, 9], { a: 11 });
logger.warn("test, %d, %s, %j, %j", 123, "456", [7, 8, 9], { a: 11 });
logger.error("test, %d, %s, %j, %j", 123, "456", [7, 8, 9], { a: 11 });
logger.http("test, %d, %s, %j, %j", 123, "456", [7, 8, 9], { a: 11 });
logger.verbose("test, %d, %s, %j, %j", 123, "456", [7, 8, 9], { a: 11 });
logger.debug("test, %d, %s, %j, %j", 123, "456", [7, 8, 9], { a: 11 });
logger.silly("test, %d, %s, %j, %j", 123, "456", [7, 8, 9], { a: 11 });
