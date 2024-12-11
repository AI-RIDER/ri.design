const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: false,
  content: [join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}')],
  theme: {
    extend: {},
  },
  safelist: [
    { pattern: /.*/ }, // 匹配所有類名
  ],
  plugins: [],
}

