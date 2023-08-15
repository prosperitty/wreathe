/* eslint-disable import/no-anonymous-default-export */
export default [
  {
    root: true,
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'next/core-web-vitals',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import'],
    rules: {
      quotes: ['error', 'single'],
      indent: ['error', 2],
      semi: ['error', 'never'],
      '@typescript-eslint/no-unused-vars': 'error',
      'import/no-unresolved': 'error',
    },
    env: {
      node: false,
    },
    ignorePatterns: ['**/*.js', '**/*.jsx'],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

          // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

          // use <root>/path/to/folder/tsconfig.json
          project: 'path/to/folder',
        },
      },
    },
  },
]
