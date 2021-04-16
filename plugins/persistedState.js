import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, req }) => {
  createPersistedState({
    key: 'authentication-cookie', // cookie name
    paths: [
      // persist the values from the store modules
      'auth.accessToken',
      'auth.refreshToken',
      'auth.user',
      'cart',
    ],
    storage: {
      getItem: (key) => {
        if (process.server) {
          if (req) {
            if (req.headers.cookie) {
              const parsedCookies = cookie.parse(req.headers.cookie)
              return parsedCookies[key]
            }
          }
        } else {
          return Cookies.get(key)
        }
      },
      setItem: (key, value) =>
        Cookies.set(key, value, {
          expires: 365,
          secure: false,
        }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
