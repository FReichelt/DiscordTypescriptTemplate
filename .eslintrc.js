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
        '@typescript-eslint/no-non-null-assertion': 'off',
    },
};
