/* eslint-disable func-names */
import { Guild, CommandInteraction, MessageEmbed } from 'discord.js';
import Bot from '../base/Bot';
import { GuildDocument } from '../models/Guild';
import { TOptions } from 'i18next';
import { UserDocument } from '../models/User';
import { MemberDocument } from '../models/Member';
declare module 'discord.js' {
    interface Guild {
        client: Bot;
        translate(key: string, args?: TOptions): string;
        data: GuildDocument;
    }

    interface User {
        client: Bot;
        data: UserDocument;
    }

    interface GuildMember {
        data: MemberDocument;
    }

    interface APIInteractionDataResolvedGuildMember {
        data: MemberDocument;
    }

    interface CommandInteraction {
        client: Bot;
        translate(key: string, args?: TOptions): string;
        error(key: string, args?: TOptions): boolean;
    }
}

Guild.prototype.translate = function (key: string, args?: TOptions): string {
    const language = this.client.translations.get(this.data.language);
    if (!language) throw new Error('Message: Invalid language set in data.');
    return language(key, args);
};

CommandInteraction.prototype.translate = function (key: string, args?: TOptions) {
    const language = this.client.translations.get(
        this.guild ? this.guild.data.language : this.client.config.defaultLanguage,
    );
    if (!language) throw new Error('Message: Invalid language set in data.');
    return language(key, args);
};

CommandInteraction.prototype.error = function (key: string, args?: TOptions) {
    try {
        const language = this.client.translations.get(
            this.guild ? this.guild.data.language : this.client.config.defaultLanguage,
        );
        if (!language) throw new Error('Message: Invalid language set in data.');
        this.reply({
            embeds: [new MessageEmbed().setColor('#ff0000').setDescription(language(key, args))],
        });
        return true;
    } catch (error) {
        return false;
    }
};

export function initExtenders() {
    return 'Initialized extenders.';
}
