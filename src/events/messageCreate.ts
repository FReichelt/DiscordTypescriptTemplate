import IData from '../utils/IData';
import Bot from '../base/Bot';
import { Message } from 'discord.js';

export default class {
    constructor(private client: Bot) {
        this.client = client;
    }

    async run(message: Message) {
        const data: IData = {};

        if (message.author.bot || message.channel.type === 'DM') return;

        const client = this.client;
        data.config = client.config;

        if (message.guild) {
            // Gets guild data
            const guild = await client.findOrCreateGuild(message.guild.id);
            // eslint-disable-next-line require-atomic-updates
            message.guild.data = data.guild = guild;
        }

        if (message.guild) {
            const memberData = await client.findOrCreateMember(message.author.id, message.guild.id);
            data.member = memberData;
            // eslint-disable-next-line require-atomic-updates
            message.member!.data = memberData;
        }

        const userData = await client.findOrCreateUser(message.author.id);
        data.user = userData;
        // eslint-disable-next-line require-atomic-updates
        message.author.data = userData;
    }
}
