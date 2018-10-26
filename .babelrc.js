module.exports = {
  presets: [
    '@babel/env',
    '@babel/typescript',
    '@babel/react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    'lodash',
    'babel-plugin-styled-components',
  ],
}
