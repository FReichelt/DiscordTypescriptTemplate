/*
 * Created on Wed Apr 27 2022 17:49:16 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:49:16 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: messageEdit.ts
 */
import Bot from '../base/Bot';

export default class {
    constructor(private client: Bot) {
        this.client = client;
    }

    async run(oldMessage, newMessage) {
        this.client.emit('messageCreate', newMessage);
    }
}
