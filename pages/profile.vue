<template>
  <div>
    <Header />
    <div class="flex h-90screen">
      <!-- user profile info -->
      <div
        v-if="customer"
        class="profile-info w-3/12 text-center flex flex-col items-center pt-10 px-3 shadow-lg"
      >
        <img
          src="~assets/icon.png"
          alt=""
          class="w-3/12 border-4 p-3 rounded-3xl border-black"
        />
        <h1 class="text-2xl mt-10">
          <span class="text-blue-600">Welcome</span>, {{ customer.first_name }}
          {{ customer.last_name }}
        </h1>
        <h2 class="text-sm mt-2">
          logged in as:
          <span class="text-blue-600">{{ customer.email }}</span>
        </h2>
        <p class="mt-20 mb-10 text-blue-600">Here's your medical profile:</p>
        <p>
          Your Allergies:<br />{{ customer.allergies }}
          <br />
          <br />
          Medications you take:<br />{{ customer.medicines }}
        </p>
      </div>
      <!-- order list attached to user -->
      <div class="order-info w-9/12 p-5 overflow-auto">
        <h2 class="text-4xl m-10">Manage Orders</h2>

        <table
          v-if="orders != ''"
          class="table-fixed w-11/12 items-center text-center border-2 border-blue-600 bg-white shadow-lg m-auto"
        >
          <caption>
            Your past and present orders
          </caption>
          <thead>
            <tr class="bg-primary text-white">
              <th id="order-id" class="w-2/4 p-3">Order ID</th>
              <th id="date-placed" class="w-2/4 p-3">Date Placed</th>
              <th id="total-price" class="w-2/4 p-3">Total Price</th>
              <th id="status" class="w-2/4 p-3">Status</th>
              <th id="placeholder" class="w-2/4 p-3"></th>
            </tr>
          </thead>

          <tbody>
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
                <NuxtLink :to="`invoice/${order.id}`">View Details</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-else class="text-center">No orders made from your account yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      visibleCart: false,
    }
  },
  computed: {
    orders() {
      return this.$store.getters.getUserOrders
    },
    customer() {
      return this.$store.getters['auth/getUser']
    },
  },
  created() {
    // prevents visitor from acessing page unless authenticated
    const isAuthenticated = this.$store.getters['auth/isAuthenticated']
    if (isAuthenticated) {
      this.$store.dispatch('getUserOrders')
      this.$store.dispatch('auth/getUserDetails')
    } else {
      this.$router.push('/login')
    }
  },
}
</script>
