/*
 * Created on Wed Apr 27 2022 17:50:29 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:50:29 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: .eslintrc.js
 */
module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
        'no-console': 2,
        'prettier/prettier': 2,
        '@typescript-eslint/no-var-requires': 'off',
        'prefer-template': 'warn',
        'linebreak-style': ['error', 'unix'],
    },
};
