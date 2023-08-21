module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  settings: {
    next: {
      rootDir: './packages/web/',
    },
  },
  parserOptions: {
    project: '../../tsconfig.base.json',
    tsconfigRootDir: __dirname,
  },
}
