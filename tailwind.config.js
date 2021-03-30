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
      //tailwind has limited default screen helper classes so i defined it more
      "screen" : "100vh",
      "90screen" : "90vh",
      "80screen" : "80vh",
      "70screen" : "70vh",
      "screen/2": "50vh",
      "screen/3": "calc(100vh / 3)",
      "screen/4": "calc(100vh / 4)",
      "screen/5": "calc(100vh / 5)",
    }),
    backgroundColor: theme => ({
      'primary' : '#2F80ED', //light blue
      'secondary' : '#E0E0E0', //grey
      'white' : '#FFFFFF'
    }),
    backgroundImage: theme => ({
      'hero' : 'url("../default.jpeg")',
     }),
    screens: {
    /*was built with desktop-first approach so to compensate, I overrided 
    the default responsive interfaces to target max width rather than min
    (usually for mobile-first approach)
    */

    'sm': {'max': '640px'},// => @media (max-width: 640px) { ... }

    'md': {'max': '768px'}, // => @media (max-width: 768px) { ... }

    'lg': {'max': '1024px'}, // => @media (max-width: 1024px) { ... }

    'xl': {'max': '1280px'}, // => @media (max-width: 1280px) { ... }

    }, 
    extend: {},
  },
  variants: {},
  plugins: [],
}
