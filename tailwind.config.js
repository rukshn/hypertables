module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'em-green': '#1cad43'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
