/*
 * Created on Wed Apr 27 2022 17:49:41 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:49:41 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: ICommandConfig.ts
 */
import { SlashCommandBuilder } from '@discordjs/builders';

export interface ICommandConfig {
    slashData: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>;
    description: string;
    name: string;
    dirname: string;
    enabled: boolean;
    guildOnly: boolean;
    botPermissions: (bigint | string)[];
    memberPermissions: (bigint | string)[];
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
    botPermissions: (bigint | string)[];
    memberPermissions: (bigint | string)[];
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
