/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-array-constructor */
import path from 'path';
import Bot from './Bot';
import { SlashCommandBuilder } from '@discordjs/builders';
import CommandConfig from '../utils/ICommandConfig';
import { CommandInteraction, PermissionResolvable } from 'discord.js';
import IData from '../utils/IData';

export default class Command {
    constructor(client: Bot, config: CommandConfig) {
        const category = config.dirname
            ? config.dirname.split(path.sep)[(config.dirname.split(path.sep).length - 1, 10)]
            : 'Other';
        this.client = client;
        this.settings = {
            slashData: config.slashData,
            name: config.name,
            enabled: config.enabled,
            guildOnly: config.guildOnly,
            botPermissions: config.botPermissions,
            memberPermissions: config.memberPermissions,
            nsfw: config.nsfw,
            ownerOnly: config.ownerOnly,
            cooldown: config.cooldown,
            category: category,
        };
    }

    settings: {
        slashData: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>;
        name: string;
        enabled: boolean;
        guildOnly: boolean;
        botPermissions: PermissionResolvable[];
        memberPermissions: PermissionResolvable[];
        nsfw: boolean;
        ownerOnly: boolean;
        cooldown: number;
        category: string;
    };
    client: Bot;

    async run(interaction: CommandInteraction, data: IData) {
        throw new Error('Method not implemented.');
    }
}
