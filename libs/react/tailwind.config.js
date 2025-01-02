const { join } = require('path');

const { overrideTailwindConfig } = require('../../dist/libs/react')

const config = overrideTailwindConfig({
  purge: false,
  content: [join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}')],
  theme: {
    extend: {},
  },
  safelist: [
    { pattern: /.*/ }, // 匹配所有類名
  ],
  plugins: [],
});

console.log(JSON.stringify(config))

/** @type {import('tailwindcss').Config} */
module.exports = config;

