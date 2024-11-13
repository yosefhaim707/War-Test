module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      options: {
        parser: 'typescript',
        jsxSingleQuote: false,
        bracketSpacing: true,
      },
    },
  ],
};
