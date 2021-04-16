// store/auth.js

// reusable aliases for mutations
export const AUTH_MUTATIONS = {
  SET_USER: 'SET_USER',
  SET_PAYLOAD: 'SET_PAYLOAD',
  LOGOUT: 'LOGOUT',
}

export const state = () => ({
  accessToken: null, // JWT access token
  refreshToken: null, // JWT refresh token
  user: [], // user profile
})

export const mutations = {
  // store the logged in user in the state
  [AUTH_MUTATIONS.SET_USER](state, user) {
    state.user = user
  },

  // store new or updated token fields in the state
  [AUTH_MUTATIONS.SET_PAYLOAD](state, payload, refreshToken = null) {
    state.accessToken = payload.access_token

    // refresh token is optional, only set it if present
    if (refreshToken) {
      state.refreshToken = refreshToken
    }
  },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT](state) {
    state.id = null
    state.emailAddress = null
    state.accessToken = null
    state.refreshToken = null
    state.user = null
    alert('Account has been logged out successfully.')
    this.$router.push('/')
  },
}

export const actions = {
  login({ commit }, user) {
    // make an API call to login the user with an email address and password
    const data = JSON.stringify({
      email: user.email,
      password: user.password,
    })

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    this.$axios
      .$post('/auth', data, axiosConfig)
      .then((resp) => {
        // commit the user and tokens to the state
        alert('Logged in successfully')
        commit(AUTH_MUTATIONS.SET_PAYLOAD, resp)
        this.$router.push('/')
      })
      .catch((err) => {
        console.log(err)
        alert('Account Login Failed. Please contact UWI HSU.')
      })
  },

  register({ commit }, user) {
    // make an API call to register the user
    const data = JSON.stringify({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: user.password,
      allergies: user.allergies,
      medications: user.medications,
    })

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    this.$axios
      .$post('/signup', data, axiosConfig)
      .then((resp) => {
        alert('Your Profile has been created.')
        this.$router.push('/login')
      })
      .catch((err) => {
        console.log(err)
        alert('Account Signup Failed. Please contact UWI HSU.')
      })
  },

  // given the current refresh token, refresh the user's access token to prevent expiry
  refresh({ commit, state }) {
    const { refreshToken } = state

    // make an API call using the refresh token to generate a new access token
    const {
      data: {
        data: { payload },
      },
    } = this.$axios.post('/api/auth/refresh', { refreshToken })

    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // logout the user and empty auth data from cookies
  logout({ commit, state }) {
    commit(AUTH_MUTATIONS.LOGOUT)
  },
  getUserDetails({ commit, state }) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + state.accessToken,
      },
    }

    this.$axios
      .$get('/user', axiosConfig)
      .then((resp) => {
        commit(AUTH_MUTATIONS.SET_USER, resp)
      })
      .catch((err) => {
        console.log(err)
        alert('Profile generation failed. Please contact UWI HSU.')
      })
  },
}

export const getters = {
  // determine if the user is authenticated based on the presence of the access token
  isAuthenticated: (state) => {
    return state.accessToken && state.accessToken !== ''
  },
  // Get current user details
  getUser: (state) => {
    return state.user
  },
}
