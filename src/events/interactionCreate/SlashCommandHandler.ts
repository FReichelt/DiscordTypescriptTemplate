import { Permissions, PermissionResolvable } from 'discord.js';
import Command from '../../base/Command';
import Bot from '../../base/Bot';
import IData from '../../utils/IData';

module.exports = class {
    constructor(private client: Bot) {
        this.client = client;
    }

    async run(interaction) {
        const data: IData = {};

        if (interaction.user.bot) {
            return;
        }

        if (interaction.guild && !interaction.member) {
            await interaction.guild.members.fetch(interaction.user.id);
        }

        const client = this.client;
        data.config = client.config;

        if (interaction.guild) {
            // Gets guild data
            const guild = await client.findOrCreateGuild(interaction.guild.id);
            // eslint-disable-next-line require-atomic-updates
            interaction.guild.data = data.guild = guild;
        }

        if (interaction.guild) {
            const memberData = await client.findOrCreateMember(interaction.member.id, interaction.guild.id);
            data.member = memberData;
            // eslint-disable-next-line require-atomic-updates
            interaction.member.data = memberData;
        }

        const userData = await client.findOrCreateUser(interaction.user.id);
        data.user = userData;
        // eslint-disable-next-line require-atomic-updates
        interaction.user.data = userData;

        if (!interaction.isCommand()) return;

        const cmd: Command | undefined = client.commands.get(interaction.commandName);

        if (cmd) {
            if (interaction.guild) {
                const neededPermissions: PermissionResolvable[] = [];
                if (!cmd.settings.botPermissions.includes(Permissions.FLAGS.EMBED_LINKS)) {
                    cmd.settings.botPermissions.push(Permissions.FLAGS.EMBED_LINKS);
                }
                cmd.settings.botPermissions.forEach((perm: PermissionResolvable) => {
                    if (!interaction.channel.permissionsFor(interaction.guild.me).has(perm)) {
                        neededPermissions.push(perm);
                    }
                });
                if (!interaction.channel.nsfw && cmd.settings.nsfw) {
                    return interaction.error('misc:NSFW_COMMAND');
                }
            }

            if (!cmd.settings.enabled) {
                return interaction.error('misc:COMMAND_DISABLED');
            }
            try {
                await cmd.run(interaction, data);
            } catch (e) {
                client.logger.error(e);
                return interaction.error('misc:ERR_OCCURRED');
            }
        }
    }
};
