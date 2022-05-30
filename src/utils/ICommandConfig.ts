import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionResolvable } from 'discord.js';

export interface ICommandConfig {
    slashData: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>;
    description: string;
    name: string;
    dirname: string;
    enabled: boolean;
    guildOnly: boolean;
    botPermissions: PermissionResolvable[];
    memberPermissions: PermissionResolvable[];
    nsfw: boolean;
    ownerOnly: boolean;
    cooldown: number;
}

export default class CommandConfig implements ICommandConfig {
    slashData: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>;
    description: string;
    name: string;
    dirname: string;
    enabled: boolean;
    guildOnly: boolean;
    botPermissions: PermissionResolvable[];
    memberPermissions: PermissionResolvable[];
    nsfw: boolean;
    ownerOnly: boolean;
    cooldown: number;

    constructor(config: ICommandConfig) {
        this.slashData = config.slashData;
        this.description = config.description;
        this.name = config.name;
        this.dirname = config.dirname;
        this.enabled = config.enabled;
        this.guildOnly = config.guildOnly;
        this.botPermissions = config.botPermissions;
        this.memberPermissions = config.memberPermissions;
        this.nsfw = config.nsfw;
        this.ownerOnly = config.ownerOnly;
        this.cooldown = config.cooldown;
    }
}
