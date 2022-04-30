/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-named-capture-group */
/* eslint-disable require-unicode-regexp */
import { Client, Collection, Guild, GuildMember, Intents, User } from 'discord.js';
import path from 'path';

import config from '../../data/config/config.json';
import customEmojis from '../../data/config/emojis.json';

import guildsData from '../models/Guild';
import usersData from '../models/User';
import membersData from '../models/Member';

import logger from '../utils/logger';
import Command from './Command';

import { TFunction, TOptions } from 'i18next';
import languages from '../../data/static/languages.json';

import ms, { StringValue } from 'ms';
export default class Bot extends Client {
    constructor() {
        super({
            intents: [
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_WEBHOOKS,
            ],
            allowedMentions: {
                parse: ['users'],
            },
        });

        this.config = config;
        this.customEmojis = customEmojis;

        this.commands = new Collection(); // Creates new commands collection

        this.guildsData = guildsData; // Guild mongoose model
        this.usersData = usersData; // User mongoose model
        this.membersData = membersData; // Member mongoose model

        this.slashCommandData = []; // Create new array for slash command data
        this.guildSlashCommandData = []; // Create new array for guild slash command data

        this.logger = logger;

        /*
         * this.databaseCache = {};
         * this.databaseCache.users = new Collection();
         * this.databaseCache.guilds = new Collection();
         * this.databaseCache.members = new Collection();
         */

        this.translations = new Map();
        this.languages = languages;
    }

    config: typeof config;

    customEmojis: typeof customEmojis;

    commands: Collection<string, Command>;

    guildsData: typeof guildsData;

    usersData: typeof usersData;

    membersData: typeof membersData;

    slashCommandData: Array<JSON>;

    guildSlashCommandData: Array<JSON>;

    logger: typeof logger;

    translations: Map<string, TFunction>;

    languages: typeof languages;

    get defaultLanguage() {
        return this.config.defaultLanguage;
    }

    translate(key: string | string[], args: TOptions | string, locale) {
        // eslint-disable-next-line no-param-reassign
        if (!locale) locale = this.defaultLanguage;
        const language = this.translations.get(locale);
        if (!language) throw new Error('Invalid language set in data.');
        return language(key, args);
    }

    // This function is used to load a command and add it to the collection
    async loadCommand(commandPath, commandName) {
        try {
            const props = new (await import(`..${path.sep}commands${path.sep}${commandPath}`)).default(this);
            this.logger.info(`Loading Command: ${props.settings.name}.👌`);
            props.settings.location = commandPath;
            if (props.init) {
                props.init(this);
            }
            this.slashCommandData.push(props.settings.slashData.toJSON());
            this.commands.set(props.settings.name, props);
            return false;
        } catch (e) {
            this.logger.error(`Unable to load command ${commandName}: ${e}`);
        }
    }

    // This function is used to unload a command (you need to load them again)
    async unloadCommand(commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        }
        if (!command) {
            return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
        }
        if (command.shutdown) {
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

    // This function is used to find a user data or create it
    async findOrCreateUser(userID) {
        let userData = await this.usersData.findOne({ id: userID });
        if (userData) {
            return userData;
        }
        userData = new this.usersData({ id: userID });
        await userData.save();
        return userData;
    }

    // This function is used to find a member data or create it
    async findOrCreateMember(memberID, guildID) {
        let memberData = await this.membersData.findOne({
            memberId: memberID,
            guildId: guildID,
        });
        if (memberData) {
            return memberData;
        }
        memberData = new this.membersData({ id: memberID, guildId: guildID });
        await memberData.save();
        return memberData;
    }

    // This function is used to find a guild data or create it
    async findOrCreateGuild(guildID) {
        let guildData = await this.guildsData.findOne({ guildId: guildID });
        if (guildData) {
            return guildData;
        }
        guildData = new this.guildsData({ id: guildID });
        await guildData.save();
        return guildData;
    }

    // This function is used to resolve a user from a string
    async resolveUser(search) {
        let user: User;
        if (!search || typeof search !== 'string') return;
        // Try ID search
        if (search.match(/^<@!?(\d+)>$/)) {
            const id = search.match(/^<@!?(\d+)>$/)![1];
            user = await this.users.fetch(id);
            if (user) return user;
        }
        // // Try username search
        // if (search.match(/^!?(\w+)#(\d+)$/)) {
        //     const username = search.match(/^!?(\w+)#(\d+)$/)![0];
        //     const discriminator = search.match(/^!?(\w+)#(\d+)$/)![1];
        //     user = await this.users.find(
        //         (u) =>
        //             u.username === username && u.discriminator === discriminator
        //     );
        //     if (user) return user;
        // }
        user = await this.users.fetch(search);
        return user;
    }

    async resolveMember(search: string, guild: Guild) {
        let member: GuildMember;
        if (!search || typeof search !== 'string') return;
        // Try ID search
        if (search.match(/^<@!?(\d+)>$/)) {
            const id = search.match(/^<@!?(\d+)>$/)![1];
            member = await guild.members.fetch(id);
            if (member) return member;
        }
        // // Try username search
        // if (search.match(/^!?(\w+)#(\d+)$/)) {
        //     // eslint-disable-next-line no-param-reassign
        //     guild = await guild.fetch();
        //     member = guild.members.cache.find((m) => m.user.tag === search);
        //     if (member) return member;
        // }
        member = await guild.members.fetch(search);
        return member;
    }

    async resolveRole(search, guild) {
        let role = null;
        if (!search || typeof search !== 'string') return;
        // Try ID search
        if (search.match(/^<@&!?(\d+)>$/)) {
            const id = search.match(/^<@&!?(\d+)>$/)![1];
            role = guild.roles.cache.get(id);
            if (role) return role;
        }
        // Try name search
        role = guild.roles.cache.find(r => search === r.name);
        if (role) return role;
        role = guild.roles.cache.get(search);
        return role;
    }

    stringToTime(value: StringValue) {
        return ms(value);
    }
}
