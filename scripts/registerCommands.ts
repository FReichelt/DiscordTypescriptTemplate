import Bot from '../src/base/Bot';
import fs from 'fs';
import util from 'util';

const readdir = util.promisify(fs.readdir);
const client = new Bot();
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import path from 'path';

// snyk-ignore-start
// eslint-disable-next-line no-unused-expressions
const start = async () => {
    client.logger.info('Starting Command Initializer...');

    const directories = await readdir('./src/commands/');
    for (const dir of directories) {
        const commands = await readdir(`./src/commands/${dir}/`);
        commands
            .filter(cmd => cmd.split('.').pop() === 'ts')
            .forEach(cmd => {
                client.loadCommand(`${dir}${path.sep}${cmd}`, cmd);
            });
    }

    await client.login(client.config.token);

    registerCommands(client.slashCommandData, client.guildSlashCommandData, client.user?.id);
};

async function registerCommands(slashCommandData, guildSlashCommandData, applicationId) {
    const restClient = new REST({ version: '9' }).setToken(client.config.token);

    guildSlashCommandData.forEach((value, key) => {
        restClient
            .put(Routes.applicationGuildCommands(applicationId, key), {
                body: value,
            })
            .then(() => {
                client.logger.info(`Successfully registered commands for guild: ${key}`);
            });
    });

    if (process.env.NODE_ENV === 'development') {
        restClient
            .put(Routes.applicationGuildCommands(applicationId, client.config.devserver), { body: slashCommandData })
            .then(() => {
                client.logger.info(
                    `Successfully registered commands as dev commands on guild: ${client.config.devserver}`,
                );
            });
    } else {
        restClient
            .put(Routes.applicationCommands(applicationId), {
                body: slashCommandData,
            })
            .then(() => {
                client.logger.info(`Successfully registered global commands`);
            });
    }

    client.destroy();
}

start();
