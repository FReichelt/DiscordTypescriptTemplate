/*
 * Created on Wed Apr 27 2022 17:50:22 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:50:22 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: index.ts
 */
import Bot from './base/Bot';
import languages from './utils/languages';
import { readdir } from 'fs/promises';
import mongoose from 'mongoose';
import path from 'path';
import { initExtenders } from './utils/extenders';

const client: Bot = new Bot();

// eslint-disable-next-line no-unused-expressions
const start = async () => {
    // Call empty function to initialize extenders.
    initExtenders();

    client.logger.info(`Starting Bot...`);

    // Load all translations
    client.translations = await languages();

    // Amount of commands counter
    let cmds = 0;
    // Search for all command categories
    const directories = await readdir('./src/commands');

    // Search for all commands of every category
    directories.forEach(async dir => {
        const commands = await readdir(`./src/commands/${dir}/`);
        commands
            // Filter out all files that are not .ts files
            .filter(cmd => cmd.split('.').pop() === 'ts')
            .forEach(cmd => {
                cmds++;
                // Load command and add it to the command collection
                client.loadCommand(`${dir}${path.sep}${cmd}`, cmd);
            });
    });

    client.logger.info(`Loaded a total of ${cmds} commands.`);

    const evtFiles = await readdir('./src/events/');
    client.logger.info(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(async file => {
        const eventName = file.split('.')[0];
        client.logger.info(`Loading Event: ${eventName}`);
        const event = new (await import(`./events/${file}`)).default(client);
        client.on(eventName, (...args) => event.run(...args));
    });

    await client.login(client.config.token);
    try {
        mongoose.connect(client.config.mongo, {
            appName: `${client.user?.username} MongoDB`,
        });
        client.logger.info('Connected to MongoDB');
    } catch (err) {
        client.logger.error(err);
    }
};

start();
