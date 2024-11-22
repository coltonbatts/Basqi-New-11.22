/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Times New Roman', 'serif'],
        display: ['Impact', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.2em',
        'mega': '0.4em',
      },
      fontSize: {
        'mega': ['12rem', { lineHeight: '1' }],
        'ultra': ['8rem', { lineHeight: '1' }],
      }
    },
  },
  plugins: [],
}