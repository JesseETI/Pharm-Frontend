module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    height: theme => ({
      "70screen" : "80vh",
      "screen/2": "50vh",
      "screen/3": "calc(100vh / 3)",
      "screen/4": "calc(100vh / 4)",
      "screen/5": "calc(100vh / 5)",
    }),
    backgroundColor: theme => ({
      'primary' : '#2F80ED',
      'secondary' : '#E0E0E0',
      'white' : '#FFFFFF'
    }),
    backgroundImage: theme => ({
      'hero' : 'url("../uwi-hero.png")',
     }),
    extend: {},
  },
  variants: {},
  plugins: [],
}
