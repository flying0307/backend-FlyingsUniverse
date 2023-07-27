/* eslint-disable import/no-commonjs */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/no-commonjs': 'warn', //es6
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/swagger.mjs'] }],
  },
  settings: {
    'import/extensions': ['.js', '.ts', '.mjs'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.json'],
        paths: ['src'], 
        alias: {
          map: [
            ['@', './dist'],
            ['@model', './dist/model'],
            ['@routes', './dist/routes'],
            ['@repo', './dist/repo'],
            ['@auth0', './dist/repo/auth0'],
            ['@db', './dist/repo/dadabase'],
            ['@utils', './dist/utils'],
            ['@api', './dist/routes/api'],
            ['@mw', 'dist/middleware'],
          ],
        },
      },
    },
  },
  ignorePatterns: ['node_modules', 'dist', 'web'],
};