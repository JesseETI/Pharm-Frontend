// to handle state
export const state = () => ({
  products: [],
  pagination: [],
  productCategories: [],
  cart: [],
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
}

// to handle mutations
export const mutations = {
  SET_PRODUCTS(state, resp) {
    state.products = resp
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
}
