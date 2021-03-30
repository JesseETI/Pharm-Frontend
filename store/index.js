// to handle state
export const state = () => ({
  products: [],
  pagination: [],
  productCategories: [],
  cart: [],
  searchResults: [],
  orders: [],
})

// to access state
export const getters = {
  total: (state) => {
    if (state.cart.length > 0) {
      return state.cart
        .map((item) => item.unit_retail_price)
        .reduce((total, amount) => total + amount)
        .toFixed(2)
    } else {
      return 0
    }
  },
  itemCount: (state) => {
    return state.cart.length
  },
  getOrders: (state) => {
    return state.orders
  },
}

// to handle actions
export const actions = {
  async getProducts({ commit }) {
    await this.$axios
      .$get(`products`, { params: { page: 1 } })
      .then((resp) => commit('SET_PRODUCTS', resp))
      .catch((err) => console.log(err))
  },
  async getProductCategories({ commit }) {
    await this.$axios
      .$get(`product_categories`)
      .then((resp) => commit('SET_PRODUCT_CATEGORIES', resp))
      .catch((err) => console.log(err))
  },
  // Currently implementing
  async getPaginationDetails({ commit }) {
    await this.$axios
      .$get(`products_page`, { params: { page: 1 } })
      .then((resp) => commit('SET_PAGINATION_DETAILS', resp))
      .catch((err) => console.log(err))
  },
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
  },
  removeFromCart({ commit }, product) {
    commit('REMOVE_FROM_CART', product)
  },
  async search({ commit }, searchObj) {
    // make an API call to search a term entered in search bar
    const data = JSON.stringify({
      term: searchObj.term,
    })

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await this.$axios
      .$post('/search', data, axiosConfig)
      .then((resp) => {
        commit('SET_SEARCH_RESULTS', resp)
        this.$router.push({ name: 'search', query: { term: searchObj.term } })
      })
      .catch((err) => {
        console.log(err)
        alert('Search Failed. Please contact UWI HSU.')
      })
  },
  setCart({ commit }, cart) {
    commit('SET_CART', cart)
  },
  async getOrders({ commit, rootState }) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    await this.$axios
      .$get('/orders', axiosConfig)
      .then((resp) => {
        commit('SET_ORDERS', resp)
      })
      .catch((err) => console.log(err))
  },
  async checkout({ commit, state, rootState, getters }) {
    // make an API call to search a term entered in search bar
    const data = JSON.stringify({
      cart: state.cart,
      item_count: getters.itemCount,
      order_total: getters.total,
      status: 'processing',
    })

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    await this.$axios
      .$post('/create-order', data, axiosConfig)
      .then((resp) => {
        commit('SET_ORDER', resp)
      })
      .catch((err) => {
        console.log(err)
        alert('Search Failed. Please contact UWI HSU.')
      })
  },
}

// to handle mutations
export const mutations = {
  SET_PRODUCTS(state, resp) {
    state.products = resp
  },
  SET_ORDER(state, order) {
    state.orders.push(order)
    state.cart = []
    this.$router.push('/profile')
  },
  SET_PRODUCT_CATEGORIES(state, resp) {
    state.productCategories = resp
  },
  SET_PAGINATION_DETAILS(state, resp) {
    state.pagination = resp
  },
  ADD_TO_CART(state, product) {
    state.cart.push(product)
  },
  REMOVE_FROM_CART(state, product) {
    const index = state.cart.findIndex((res) => res.slug === product.slug)
    state.cart.splice(index, 1)
  },
  SET_SEARCH_RESULTS(state, resp) {
    state.searchResults = resp
  },
  SET_CART(state, cart) {
    state.cart = cart
  },
  SET_ORDERS(state, resp) {
    state.orders = resp
  },
}
