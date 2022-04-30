import Bot from '../base/Bot';

export default class {
    constructor(private client: Bot) {
        this.client = client;
    }

    async run(oldMessage, newMessage) {
        this.client.emit('messageCreate', newMessage);
    }
}
