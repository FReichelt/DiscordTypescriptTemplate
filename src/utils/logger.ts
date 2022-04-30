/*
 * Created on Wed Apr 27 2022 17:50:18 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:50:18 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: logger.ts
 */
/* eslint-disable no-console */
const clc = require('cli-color');

export default class Logger {
    static log(message, type) {
        // eslint-disable-next-line no-param-reassign
        const date = `${new Date(Date.now()).toISOString()}`;
        switch (type) {
            case 'ERROR':
                throw new Error(clc.red(`${date} | ${type} | ${message}`));
                break;
            case 'WARN':
                console.warn(clc.yellowBright(`${date} | ${type} | ${message}`));
                break;
            case 'INFO':
                console.info(clc.green(`${date} | ${type} | ${message}`));
                break;
            case 'DEBUG':
                console.debug(clc.cyan(`${date} | ${type} | ${message}`));
                break;
            default:
                console.log(clc.yellow(`${date} | "LOG" | ${message}`));
                break;
        }
    }

    static error(message) {
        Logger.log(message, 'ERROR');
    }

    static warn(message) {
        Logger.log(message, 'WARN');
    }

    static info(message) {
        Logger.log(message, 'INFO');
    }

    static debug(message) {
        Logger.log(message, 'WARN');
    }
}
