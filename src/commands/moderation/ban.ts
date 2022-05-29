import Command from '../../base/Command';
import { CommandInteraction, Permissions } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import IData from '../../utils/IData';

const commandconfig = {
    name: 'ban',
    description: 'This is a command!',
    enabled: true,
    guildOnly: true,
    aliases: [],
    memberPermissions: [],
    botPermissions: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.EMBED_LINKS],
    nsfw: false,
    ownerOnly: false,
    cooldown: 1000,
    deferReply: {
        enabled: false,
        ephemeral: true,
    },
};

export default class Ban extends Command {
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
     * @param { IData } data - The mongodb data object
     */
    async run(interaction: CommandInteraction, data: IData) {}
}
