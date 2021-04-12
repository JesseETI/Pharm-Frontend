<template>
  <div>
    <Header />
    <div class="flex h-90screen">
      <Profile />

      <!-- order list attached to user -->
      <div class="order-info w-9/12 p-5 overflow-auto">
        <div class="flex items-center m-10">
          <h2 class="text-4xl w-1/2">Manage Customers</h2>

          <form class="w-1/2" @submit.prevent="searchCustomers">
            <input
              v-model="searchObj.term"
              type="text"
              class="rounded p-3 w-3/4 text-black border-2"
              placeholder="Search through UWI Pharmacy's customers"
              required
            />
            <button class="border-2 p-3 rounded">GO</button>
          </form>
          <button @click="clearSearch" class="underline text-blue-600" v-if="searchedCustomers">Clear Search</button>
        </div>

        <table
          class="table-fixed w-11/12 items-center text-center border-2 border-blue-600 bg-white shadow-lg m-auto"
        >
          <caption v-if="!searchedCustomers">
            Pharmacy's Customers
          </caption>
          <caption v-else-if="searchedCustomers == ''">No customers were found from your search.</caption>
          <caption v-else>
            Customer(s) found from your search
          </caption>
          <thead v-if="searchedCustomers != ''">
            <tr class="bg-primary text-white">
              <th id="order-id" class="w-2/4 p-3">Email</th>
              <th id="date-placed" class="w-2/4 p-3">Name</th>
              <th id="total-price" class="w-2/4 p-3">Allergies</th>
              <th id="status" class="w-2/4 p-3">Medications</th>
              <th id="placeholder" class="w-2/4 p-3"></th>
            </tr>
          </thead>

          <tbody v-if="!searchedCustomers">
            <tr v-for="customer in customers" :key="customer.id" class="border-2">
              <td class="p-3">{{ customer.email }}</td>
              <td class="p-3">{{ customer.first_name }} {{ customer.last_name }}</td>
              <td class="p-3">{{ customer.allergies }}</td>
              <td class="p-3">{{ customer.medicines }}</td>
              <td class="p-3 flex space-x-10">
                <img
                  src="~assets/trash_icon.png"
                  alt="Delete Product"
                  class="w-3/12 p-3 bg-secondary hover:bg-primary"
                  @click="deleteCustomer(customer)"
                />
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr v-for="customer in searchedCustomers" :key="customer.id" class="border-2">
              <td class="p-3">{{ customer.email }}</td>
              <td class="p-3">{{ customer.first_name }} {{ customer.last_name }}</td>
              <td class="p-3">{{ customer.allergies }}</td>
              <td class="p-3">{{ customer.medicines }}</td>
              <td class="p-3 text-blue-600 underline">Edit Customer</td>
            </tr>
          </tbody>
          
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Customers',
  data() {
    return {
      searchObj: [],
    }
  },
  computed: {
    searchedCustomers() {
      return this.$store.state.searchCustomerResults
    },
    customers() {
      return this.$store.state.customers
    },
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
      this.$store.dispatch('getCustomers')
    }
  },
  methods: {
    clearSearch() {
      this.$store.state.searchCustomerResults = null
    },
    searchCustomers() {
      this.$store.dispatch('searchCustomer', this.searchObj)
    },
    async deleteCustomer(customer) {
      await this.$axios
        .$delete('delete-customer', { params: { id: customer.id } })
        .then((resp) => {
          alert('Deleted: ' + resp.deleted)
          if (resp.deleted) {
            const index = this.$store.state.customers.findIndex(
              (res) => res.slug === customer.slug
            )
            this.$store.state.customers.splice(index, 1)
          }
        })
        .catch((err) => alert("Cannot delete the customer if they're involved in an order."))
    },
  },
}
</script>
