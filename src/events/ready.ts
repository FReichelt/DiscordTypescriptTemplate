/*
 * Created on Wed Apr 27 2022 17:49:20 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:49:20 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: ready.ts
 */
import Bot from '../base/Bot';

module.exports = class {
    constructor(private client: Bot) {
        this.client = client;
    }

    async run() {
        this.client.logger.info(`${this.client.user?.username} is ready!`);
        let i = 0;
        const statuses = this.client.config.status;

        setInterval(() => {
            if (this.client.user) {
                this.client.user.setActivity(statuses[i], { type: 'PLAYING' });
            }
            if (i + 1 >= statuses.length) {
                i = 0;
            } else i++;
        }, 10000);
    }
};
