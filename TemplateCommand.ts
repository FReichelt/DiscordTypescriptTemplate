import Command from '../../base/Command';
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import IData from '../../utils/IData';

const commandconfig = {
    name: 'replaceme',
    description: 'replaceme',
    enabled: true,
    guildOnly: false,
    aliases: [],
    memberPermissions: [''],
    botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    nsfw: false,
    ownerOnly: false,
    cooldown: 1000,
};

export default class Template extends Command {
    constructor(client) {
        super(client, {
            slashData: new SlashCommandBuilder().setName(commandconfig.name).setDescription(commandconfig.description),
            description: commandconfig.description,
            name: commandconfig.name,
            dirname: __dirname,
            enabled: commandconfig.enabled,
            guildOnly: commandconfig.guildOnly,
            memberPermissions: commandconfig.memberPermissions,
            botPermissions: commandconfig.botPermissions,
            nsfw: commandconfig.nsfw,
            ownerOnly: commandconfig.ownerOnly,
            cooldown: commandconfig.cooldown,
        });
    }

    /**
     * @param { CommandInteraction } interaction - The interaction object
     * @param { Object } data - The mongodb data
     */
    async run(interaction: CommandInteraction, data: IData) {
        const client = this.client;
        interaction.channel?.send('This command is not yet implemented.');
    }
}
