// centralized store for state/data and mutations for wesbite
export const state = () => ({
  products: [], // website products
  orders: [], // all orders
  userOrders: [], // orders belonging to current user
  pagination: [], // page details
  productCategories: [], // categories
  cart: [], // products in cart
  customers: [], // all customers

  // search results for search bars in admin panel
  searchCustomerResults: null,
  searchProductResults: null,
  searchOrderResults: null,
})

// to access state
export const getters = {
  // total price of (cart, checkout)
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
  getUserOrders: (state) => {
    return state.userOrders
  },
  // # of items in cart & checkout
  itemCount: (state) => {
    let itemCount = 0
    state.cart.forEach(function (product) {
      itemCount += product.quantity
    })
    return itemCount
  },
}

// to handle dispatched actions from pages
// calls mutations after getting response from backend API
// JWT Tokens are passed where the Backend needs Authentication credentials
export const actions = {
  // get all products from api and store it in state via mutation
  getProducts({ commit }, pageNo) {
    this.$axios
      .$get(`/api/products`, { params: { page: pageNo } })
      .then((resp) => commit('SET_PRODUCTS', resp))
      .catch((err) => console.log(err))
  },
  // get all product categories from api and store it in state via mutation
  getProductCategories({ commit }) {
    this.$axios
      .$get(`/api/product_categories`)
      .then((resp) => commit('SET_PRODUCT_CATEGORIES', resp))
      .catch((err) => console.log(err))
  },

  // Currently implementing - future proofing instead of next & prev buttons
  // use numbers
  getPaginationDetails({ commit }) {
    this.$axios
      .$get(`/api/products_page`, { params: { page: 1 } })
      .then((resp) => commit('SET_PAGINATION_DETAILS', resp))
      .catch((err) => console.log(err))
  },

  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
  },
  removeFromCart({ commit }, product) {
    commit('REMOVE_FROM_CART', product)
  },
  searchProduct({ commit }, searchProduct) {
    // make an API call to search a term entered in search bar
    const data = JSON.stringify({
      term: searchProduct.term,
    })

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    this.$axios
      .$post('/api/search-product', data, axiosConfig)
      .then((resp) => {
        commit('SET_SEARCH_PRODUCT_RESULTS', resp)
      })
      .catch((err) => {
        console.log(err)
        alert('Search Failed. Please contact UWI HSU.')
      })
  },
  searchOrder({ commit, rootState }, searchOrder) {
    // make an API call to search a term entered in search bar
    const data = JSON.stringify({
      term: searchOrder.term,
    })

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    this.$axios
      .$post('/api/search-order', data, axiosConfig)
      .then((resp) => {
        commit('SET_SEARCH_ORDER_RESULTS', resp)
      })
      .catch((err) => {
        console.log(err)
        alert('Search Failed. Please contact UWI HSU.')
      })
  },
  getOrders({ commit, rootState }) {
    // get all orders
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    this.$axios
      .$get('/api/orders', axiosConfig)
      .then((resp) => {
        commit('SET_ORDERS', resp)
      })
      .catch((err) => console.log(err))
  },
  getUserOrders({ commit, rootState }) {
    // get user orders
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    this.$axios
      .$get('/api/user-orders', axiosConfig)
      .then((resp) => {
        commit('SET_USER_ORDERS', resp)
      })
      .catch((err) => console.log(err))
  },
  checkout({ commit, state, rootState, getters }) {
    // checkout and create order from cart with default - processing state
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

    this.$axios
      .$post('/api/create-order', data, axiosConfig)
      .then((resp) => {
        commit('SET_ORDER', resp)
      })
      .catch((err) => {
        console.log(err)
        alert('Checkout Failed. Please contact UWI HSU.')
      })
  },
  getCustomers({ commit, rootState }) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    this.$axios
      .$get('/api/customers', axiosConfig)
      .then((resp) => {
        commit('SET_CUSTOMERS', resp)
      })
      .catch((err) => console.log(err))
  },
  searchCustomer({ commit, rootState }, searchCustomer) {
    // make an API call to customer search
    const data = JSON.stringify({
      term: searchCustomer.term,
    })

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    this.$axios
      .$post('/api/search-customer', data, axiosConfig)
      .then((resp) => {
        commit('SET_SEARCH_CUSTOMER_RESULTS', resp)
      })
      .catch((err) => {
        console.log(err)
        alert('Search Failed. Please contact UWI HSU.')
      })
  },
  changeOrderStatus({ commit, rootState }, payload) {
    // make change to Order Status - Admin only
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

    this.$axios
      .$put('/api/update-order', data, axiosConfig)
      .then((resp) => {
        commit('UPDATE_ORDER_STATUS', resp)
      })
      .catch((err) => console.log(err))
  },
  changeProductStatus({ commit, rootState }, payload) {
    // admin - change product status
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

    this.$axios
      .$put('/api/update-product', data, axiosConfig)
      .then((resp) => {
        commit('UPDATE_PRODUCT_STATUS', resp)
      })
      .catch((err) => console.log(err))
  },
  createProduct({ commit, rootState }, product) {
    // create product - admin
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'JWT ' + rootState.auth.accessToken,
      },
    }

    this.$axios
      .$post('/api/create-product', product, axiosConfig)
      .then((resp) => {
        commit('UPDATE_PRODUCT_STATUS', resp)
      })
      .catch((err) => console.log(err))
  },
}

// to handle mutations to code (change in state)
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
    this.$router.push('/store')
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
