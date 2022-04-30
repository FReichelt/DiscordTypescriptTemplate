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
