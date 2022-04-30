/*
 * Created on Wed Apr 27 2022 17:48:07 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:48:07 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: guildCreate.ts
 */
import Bot from '../base/Bot';

module.exports = class {
    constructor(private client: Bot) {
        this.client = client;
    }

    async run(guild) {
        try {
            this.client.findOrCreateGuild(guild.id);
        } catch (error) {
            this.client.logger.error(error);
        }
    }
};
