import { Permissions, GuildMember, Interaction, PermissionResolvable, TextChannel } from 'discord.js';
import Command from '../../base/Command';
import Bot from '../../base/Bot';
import IData from '../../utils/IData';

export default class {
    constructor(private client: Bot) {
        this.client = client;
    }

    async run(interaction: Interaction) {
        const data: IData = {};

        if (interaction.user.bot) {
            return;
        }

        if (interaction.guild && !interaction.member) {
            await interaction.guild.members.fetch(interaction.user.id);
        }

        const client = this.client;
        data.config = client.config;

        if (interaction.inCachedGuild()) {
            const guild = await client.findOrCreateGuild(interaction.guild.id);
            // eslint-disable-next-line require-atomic-updates
            interaction.guild.data = data.guild = guild;
        }

        if (interaction.inCachedGuild()) {
            interaction.member as GuildMember;
            const memberData = await client.findOrCreateMember(interaction.user.id, interaction.guild.id);
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

        if (cmd && interaction.inCachedGuild()) {
            if (!interaction.channel) return;

            if (!cmd.settings.enabled) {
                return interaction.error('misc:COMMAND_DISABLED');
            }

            const neededPermissions: PermissionResolvable[] = [];

            if (!cmd.settings.botPermissions.includes(Permissions.FLAGS.EMBED_LINKS)) {
                cmd.settings.botPermissions.push(Permissions.FLAGS.EMBED_LINKS);
            }

            cmd.settings.botPermissions.forEach((perm: PermissionResolvable) => {
                if (!interaction.channel!.permissionsFor(interaction.guild.me!).has(perm)) {
                    neededPermissions.push(perm);
                }
            });

            if (cmd.settings.nsfw) {
                if (interaction.channel.type === 'GUILD_TEXT' && !interaction.channel.nsfw) {
                    interaction.error('misc:NSFW_CHANNEL');
                    return;
                } else if (interaction.channel.type.includes('THREAD')) {
                    const parent: TextChannel = (await this.client.channels.fetch(
                        interaction.channel.parentId!,
                    )) as TextChannel;
                    if (!parent.nsfw) return interaction.error('misc:NSFW_COMMAND');
                }
            }

            try {
                if (cmd.settings.deferReply?.enabled) {
                    interaction.deferReply({
                        ephemeral: cmd.settings.deferReply.ephemeral,
                    });
                }
                await cmd.run(interaction, data);
            } catch (e) {
                client.logger.error(e);
                return interaction.error('misc:ERR_OCCURRED');
            }
        }
    }
}
