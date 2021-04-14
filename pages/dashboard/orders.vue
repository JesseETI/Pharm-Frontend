<template>
  <div>
    <Header />
    <div class="flex h-90screen">
      <Profile />

      <!-- order list -->
      <div class="order-info w-9/12 p-5 overflow-auto">
        <div class="flex items-center m-10">
          <h2 class="text-4xl w-1/2">Manage Orders</h2>

          <form class="w-1/2" @submit.prevent="searchOrder">
            <input
              v-model="searchObj.term"
              type="text"
              class="rounded p-3 w-3/4 text-black border-2"
              placeholder="Search through UWI Pharmacy's orders"
              required
            />
            <button class="border-2 p-3 rounded">GO</button>
          </form>
          <button
            v-if="searchedOrders"
            class="underline text-blue-600"
            @click="clearSearch"
          >
            Clear Search
          </button>
        </div>

        <table
          class="table-fixed w-11/12 items-center text-center border-2 border-blue-600 bg-white shadow-lg m-auto"
        >
          <!-- changes caption and data depending on if a search was made -->
          <caption v-if="!searchedOrders">
            UWI Pharmacy's past and present orders
          </caption>
          <caption v-else-if="searchedOrders == ''">
            No orders were found from your search.
          </caption>
          <caption v-else>
            Order(s) found from your search
          </caption>
          <thead>
            <tr v-if="searchedOrders != ''" class="bg-primary text-white">
              <th id="order-id" class="w-2/4 p-3">Order ID</th>
              <th id="date-placed" class="w-2/4 p-3">Date Placed</th>
              <th id="total-price" class="w-2/4 p-3">Total Price</th>
              <th id="status" class="w-2/4 p-3">Status</th>
              <th id="placeholder" class="w-2/4 p-3"></th>
            </tr>
          </thead>

          <tbody v-if="!searchedOrders">
            <tr v-for="order in orders" :key="order.id" class="border-2">
              <td class="p-3">{{ order.id }}</td>
              <td class="p-3">{{ order.date_placed }}</td>
              <td class="p-3">${{ order.order_total }}</td>
              <td
                v-if="order.status == 'processing'"
                class="p-3 text-yellow-600"
              >
                {{ order.status }}
              </td>
              <td
                v-else-if="order.status == 'ready'"
                class="p-3 text-green-600"
              >
                {{ order.status }}
              </td>
              <td v-else class="p-3 text-red-600">{{ order.status }}</td>
              <td class="p-3 text-blue-600 underline">
                <NuxtLink :to="`/invoice/${order.id}`">View Details</NuxtLink>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr
              v-for="order in searchedOrders"
              :key="order.id"
              class="border-2"
            >
              <td class="p-3">{{ order.id }}</td>
              <td class="p-3">{{ order.date_placed }}</td>
              <td class="p-3">${{ order.order_total }}</td>
              <td
                v-if="order.status == 'processing'"
                class="p-3 text-yellow-600"
              >
                {{ order.status }}
              </td>
              <td
                v-else-if="order.status == 'ready'"
                class="p-3 text-green-600"
              >
                {{ order.status }}
              </td>
              <td v-else class="p-3 text-red-600">{{ order.status }}</td>
              <td class="p-3 text-blue-600 underline">
                <NuxtLink :to="`/invoice/${order.id}`">View Details</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-if="searchedOrders == ''" class="text-center">
          No orders made to UWI Pharmacy yet.
        </p>
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
  computed: {
    orders() {
      return this.$store.state.orders
    },
    searchedOrders() {
      return this.$store.state.searchOrderResults
    },
  },
  created() {
    const isAuthenticated = this.$store.getters['auth/isAuthenticated']
    const user = this.$store.getters['auth/getUser']
    if (!isAuthenticated) {
      this.$router.push('/login')
    } else if (isAuthenticated && user.role == 1) {
      this.$router.push('/profile')
    } else {
      this.$store.dispatch('getOrders')
    }
  },
  methods: {
    // make search for customers in API
    searchOrder() {
      this.$store.dispatch('searchOrder', this.searchObj)
    },
    // clear search to see all customers again
    clearSearch() {
      this.$store.state.searchOrderResults = null
    },
  },
}
</script>
