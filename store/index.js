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
export const getters = {}

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
      .$post('http://0.0.0.0:8080/search', data, axiosConfig)
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
  async checkout({ commit, state, rootState }) {
    // make an API call to search a term entered in search bar
    const data = JSON.stringify({
      cart: state.cart,
      item_count: 3,
      order_total: 150,
      status: 'processing',
    })

    console.log(data)

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    await this.$axios
      .$post('http://0.0.0.0:8080/create-order', data, axiosConfig)
      .then((resp) => {
        commit('SET_ORDER', resp)
        this.$router.push('/profile')
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
    console.log(state.orders)
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
}
