import i18next from 'i18next';
import Backend from 'i18next-node-fs-backend';
import path from 'path';
import fs from 'fs/promises';

async function walkDirectory(dir, namespaces?: string[], folderName?: string) {
    if (!folderName) folderName = '';
    namespaces = namespaces || [];
    const files = await fs.readdir(dir);

    const languages: string[] = [];
    for (const file of files) {
        const stat = await fs.stat(path.join(dir, file));
        if (stat.isDirectory()) {
            const isLanguage = file.includes('-');
            if (isLanguage) languages.push(file);

            const folder = await walkDirectory(path.join(dir, file), namespaces, isLanguage ? '' : `${file}/`);

            // eslint-disable-next-line no-param-reassign
            if (folder.namespaces) namespaces = folder.namespaces;
        } else {
            if (!namespaces) namespaces = [];
            namespaces.push(`${folderName}${file.substr(0, file.length - 5)}`);
        }
    }

    return { namespaces: [...new Set(namespaces)], languages };
}

export default async () => {
    const options = {
        jsonIndent: 4,
        loadPath: path.resolve(__dirname, '../../data/static/languages/{{lng}}/{{ns}}.json'),
    };

    const { namespaces, languages } = await walkDirectory(path.resolve(__dirname, '../../data/static/languages/'));

    i18next.use(Backend);

    await i18next.init({
        backend: options,
        debug: false,
        fallbackLng: 'de-DE',
        initImmediate: false,
        interpolation: { escapeValue: false },
        load: 'all',
        ns: namespaces,
        preload: languages,
    });

    return new Map(languages.map(lng => [lng, i18next.getFixedT(lng)]));
};
