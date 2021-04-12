<template>
  <div>
    <Header/> 
    <div class="flex h-90screen">
      <Profile/>

      <!-- order list attached to user -->
      <div class="order-info w-9/12 p-5 overflow-auto">
        <div class="flex items-center m-10">
          <h2 class="text-4xl w-1/2">Manage Orders</h2>

          <form @submit.prevent="searchOrder" class="w-1/2">
            <input
              type="text"
              class="rounded p-3 w-3/4 text-black border-2"
              placeholder="Search through UWI Pharmacy's orders"
              required
              v-model="searchObj.term"
            />
            <button class="border-2 p-3 rounded">GO</button>
          </form>
            <button @click="clearSearch" class="underline text-blue-600" v-if="searchedOrders">Clear Search</button>
        </div>

        <table v-if="orders != ''" class="table-fixed w-11/12 items-center text-center border-2 border-blue-600 bg-white shadow-lg m-auto">
          <caption v-if="!searchedOrders">UWI Pharmacy's past and present orders</caption>
          <caption v-else-if="searchedOrders == ''">No orders were found from your search.</caption>
          <caption v-else>Order(s) found from your search</caption>
          <thead>
            <tr class="bg-primary text-white" v-if="searchedOrders != ''">
              <th class="w-2/4 p-3" id="order-id">Order ID</th>
              <th class="w-2/4 p-3" id="date-placed">Date Placed</th>
              <th class="w-2/4 p-3" id="total-price">Total Price</th>
              <th class="w-2/4 p-3" id="status">Status</th>
              <th class="w-2/4 p-3" id="placeholder"></th>
            </tr>
          </thead>

          <tbody v-if="!searchedOrders">
            <tr class="border-2" v-for="order in orders" :key="order.id">
              <td class="p-3">{{ order.id }}</td>
              <td class="p-3">{{order.date_placed}}</td>
              <td class="p-3">${{ order.order_total }}</td>
              <td class="p-3 text-yellow-600" v-if="order.status == 'processing'">{{ order.status }}</td>
              <td class="p-3 text-green-600" v-else-if="order.status == 'ready'">{{ order.status }}</td>
              <td class="p-3 text-red-600" v-else>{{ order.status }}</td>
              <td class="p-3 text-blue-600 underline"><NuxtLink :to="`/invoice/${order.id}`">View Details</NuxtLink></td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr class="border-2" v-for="order in searchedOrders" :key="order.id">
              <td class="p-3">{{ order.id }}</td>
              <td class="p-3">{{order.date_placed}}</td>
              <td class="p-3">${{ order.order_total }}</td>
              <td class="p-3 text-yellow-600" v-if="order.status == 'processing'">{{ order.status }}</td>
              <td class="p-3 text-green-600" v-else-if="order.status == 'ready'">{{ order.status }}</td>
              <td class="p-3 text-red-600" v-else>{{ order.status }}</td>
              <td class="p-3 text-blue-600 underline"><NuxtLink :to="`/invoice/${order.id}`">View Details</NuxtLink></td>
            </tr>
          </tbody>

        </table>

        <p class="text-center" v-else>No orders made to UWI Pharmacy yet.</p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  data() {
    return {
      searchObj: [],
    }
  },
  methods: {
    searchOrder() {
      this.$store.dispatch('searchOrder', this.searchObj)
    },
    clearSearch() {
      this.$store.state.searchOrderResults = null
    },
  },
  computed: {
    orders() {
      return this.$store.getters.getOrders
    },
    searchedOrders() {
      return this.$store.getters.getSearchedOrders
    }
  },
  created() {
    let isAuthenticated = this.$store.getters['auth/isAuthenticated']
    let user = this.$store.getters['auth/getUser'] 
    if (!isAuthenticated) {
      this.$router.push('/login')
    }
    else if (isAuthenticated && user.role == 1) {
      this.$router.push('/profile')
    }
    else {
      this.$store.dispatch('getOrders')
    }
  },
}
</script>