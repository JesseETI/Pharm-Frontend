// to handle state
export const state = () => ({
  products: [],
  orders: [],
  userOrders: [],
  pagination: [],
  productCategories: [],
  cart: [],
  customers: [],
  searchCustomerResults: null,
  searchProductResults: null,
  searchOrderResults: null,
})

// to access state
export const getters = {
  total: (state) => {
    if (state.cart.length > 0) {
      return state.cart
        .map((item) => item.unit_retail_price * item.quantity)
        .reduce((total, amount) => total + amount)
        .toFixed(2)
    } else {
      return 0
    }
  },
  itemCount: (state) => {
    let itemCount = 0
    state.cart.forEach(function (product) {
      itemCount += product.quantity
    })
    return itemCount
  },
  getOrders: (state) => {
    return state.orders
  },
  getUserOrders: (state) => {
    return state.userOrders
  },
  getSearchedOrders: (state) => {
    return state.searchOrderResults
  },
}

// to handle actions
export const actions = {
  async getProducts({ commit }, pageNo) {
    await this.$axios
      .$get(`products`, { params: { page: pageNo } })
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
  async searchProduct({ commit }, searchProduct) {
    // make an API call to search a term entered in search bar
    const data = JSON.stringify({
      term: searchProduct.term,
    })

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await this.$axios
      .$post('/search-product', data, axiosConfig)
      .then((resp) => {
        commit('SET_SEARCH_PRODUCT_RESULTS', resp)
      })
      .catch((err) => {
        console.log(err)
        alert('Search Failed. Please contact UWI HSU.')
      })
  },
  async searchOrder({ commit }, searchOrder) {
    // make an API call to search a term entered in search bar
    const data = JSON.stringify({
      term: searchOrder.term,
    })

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await this.$axios
      .$post('/search-order', data, axiosConfig)
      .then((resp) => {
        commit('SET_SEARCH_ORDER_RESULTS', resp)
      })
      .catch((err) => {
        console.log(err)
        alert('Search Failed. Please contact UWI HSU.')
      })
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
  async getUserOrders({ commit, rootState }) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    await this.$axios
      .$get('/user-orders', axiosConfig)
      .then((resp) => {
        commit('SET_USER_ORDERS', resp)
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
        alert('Checkout Failed. Please contact UWI HSU.')
      })
  },
  async getCustomers({ commit, rootState }) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    await this.$axios
      .$get('/customers', axiosConfig)
      .then((resp) => {
        commit('SET_CUSTOMERS', resp)
      })
      .catch((err) => console.log(err))
  },
  async searchCustomer({ commit }, searchCustomer) {
    // make an API call to search a term entered in search bar
    const data = JSON.stringify({
      term: searchCustomer.term,
    })

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await this.$axios
      .$post('/search-customer', data, axiosConfig)
      .then((resp) => {
        commit('SET_SEARCH_CUSTOMER_RESULTS', resp)
      })
      .catch((err) => {
        console.log(err)
        alert('Search Failed. Please contact UWI HSU.')
      })
  },
  async changeOrderStatus({ commit, rootState }, payload) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }
    const data = JSON.stringify({
      id: payload.orderID,
      status: payload.status,
    })

    await this.$axios
      .$put('/update-order', data, axiosConfig)
      .then((resp) => {
        commit('UPDATE_ORDER_STATUS', resp)
      })
      .catch((err) => console.log(err))
  },
  async changeProductStatus({ commit, rootState }, payload) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }
    const data = JSON.stringify({
      id: payload.orderID,
      status: payload.status,
    })

    await this.$axios
      .$put('/update-product', data, axiosConfig)
      .then((resp) => {
        commit('UPDATE_PRODUCT_STATUS', resp)
      })
      .catch((err) => console.log(err))
  },
  async createProduct({ commit, rootState }, product) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    await this.$axios
      .$post('/create-product', product, axiosConfig)
      .then((resp) => {
        commit('UPDATE_PRODUCT_STATUS', resp)
      })
      .catch((err) => console.log(err))
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
    const existingProduct = state.cart.findIndex(
      (res) => res.code === product.code
    )
    if (existingProduct !== -1) {
      state.cart.splice(existingProduct, 1)
    }
    state.cart.push(product)
  },
  REMOVE_FROM_CART(state, product) {
    const index = state.cart.findIndex((res) => res.slug === product.slug)
    state.cart.splice(index, 1)
  },
  SET_SEARCH_PRODUCT_RESULTS(state, resp) {
    state.searchProductResults = resp
  },
  SET_SEARCH_ORDER_RESULTS(state, resp) {
    state.searchOrderResults = resp
  },
  SET_SEARCH_CUSTOMER_RESULTS(state, resp) {
    state.searchCustomerResults = resp
  },
  SET_ORDERS(state, resp) {
    state.orders = resp
  },
  SET_USER_ORDERS(state, resp) {
    state.userOrders = resp
  },
  SET_CUSTOMERS(state, resp) {
    state.customers = resp
  },
  UPDATE_ORDER_STATUS(state, resp) {
    const existingOrder = state.cart.find((res) => (res.id = resp.code))
    if (existingOrder) {
      existingOrder.status += resp.status
    }
  },
}
