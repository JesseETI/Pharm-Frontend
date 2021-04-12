<template>
  <div>
    <Header />
    <div class="flex h-90screen">
      <Profile />

      <!-- order list attached to user -->
      <div class="order-info w-9/12 p-5 overflow-auto">
        <div class="flex items-center m-10">
          <h2 class="text-4xl w-1/2">Manage Inventory</h2>

          <form class="w-1/2" @submit.prevent="searchInventory">
            <input
              v-model="searchObj.term"
              type="text"
              class="rounded p-3 w-3/4 text-black border-2"
              placeholder="Search through UWI Pharmacy's inventory"
              required
            />
            <button class="border-2 p-3 rounded">GO</button>
          </form>
          <button @click="clearSearch" class="underline text-blue-600" v-if="searchedProducts">Clear Search</button>
          <NuxtLink to="inventory/new-product" class="underline text-blue-600" v-if="!searchedProducts">+ Create a Product +</NuxtLink>
        </div>

        <table
          class="table-fixed w-11/12 items-center text-center border-2 border-blue-600 bg-white shadow-lg m-auto"
        >
          <caption v-if="!searchedProducts">
            Pharmacy's Products
          </caption>
          <caption v-else-if="searchedProducts == ''">
            No products were found from your search.
          </caption>
          <caption v-else>
            Product(s) found from your search
          </caption>
          <thead v-if="searchedProducts != ''">
            <tr class="bg-primary text-white">
              <th id="order-id" class="w-2/4 p-3">Product ID</th>
              <th id="date-placed" class="w-2/4 p-3">Name</th>
              <th id="total-price" class="w-2/4 p-3">Quantity</th>
              <th id="status" class="w-2/4 p-3">Retail Price</th>
              <th id="placeholder" class="w-2/4 p-3"></th>
            </tr>
          </thead>

          <tbody v-if="!searchedProducts">
            <tr v-for="product in products" :key="product.id" class="border-2">
              <td class="p-3">{{ product.code }}</td>
              <td class="p-3">{{ product.product_name }}</td>
              <td class="p-3">{{ product.QoH }}</td>
              <td class="p-3">${{ product.unit_retail_price }}</td>
              <td class="p-3 flex space-x-10">
                <NuxtLink :to="`inventory/${product.slug}`" class="w-3/12">
                <img
                  src="~assets/edit_icon.png"
                  alt="Edit Product"
                  class="w-full p-3 bg-secondary hover:bg-primary"
                />
                </NuxtLink>

                <img
                  src="~assets/trash_icon.png"
                  alt="Delete Product"
                  class="w-3/12 p-3 bg-secondary hover:bg-primary"
                  @click="deleteProduct(product)"
                />
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr
              v-for="product in searchedProducts"
              :key="product.id"
              class="border-2"
            >
              <td class="p-3">{{ product.code }}</td>
              <td class="p-3">{{ product.product_name }}</td>
              <td class="p-3">{{ product.QoH }}</td>
              <td class="p-3">${{ product.unit_retail_price }}</td>
              <td class="p-3 flex space-x-10">
                 <NuxtLink :to="`inventory/${product.slug}`" class="w-3/12">
                <img
                  src="~assets/edit_icon.png"
                  alt="Edit Product"
                  class="w-full p-3 bg-secondary hover:bg-primary"
                />
                </NuxtLink>

                <img
                  src="~assets/trash_icon.png"
                  alt="Delete Product"
                  class="w-3/12 p-3 bg-secondary hover:bg-primary"
                  @click="deleteProduct(product)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <!--Navigation Buttons -->
        <div class="m-auto w-3/12 space-x-10 mt-10"  v-if="!searchedProducts">
          <button class="p-4 w-4/12 bg-primary text-white" @click="previousPage" v-if="pageNo > 1">Previous Page</button>
          <button class="p-4 w-4/12 bg-primary text-white" @click="nextPage">Next Page</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchObj: [],
      pageNo: 1,
    }
  },
  computed: {
    searchedProducts() {
      return this.$store.state.searchProductResults
    },
    products() {
      return this.$store.state.products
    },
  },
  created() {
    const isAuthenticated = this.$store.getters['auth/isAuthenticated']
    const user = this.$store.getters['auth/getUser']
    if (!isAuthenticated) {
      this.$router.push('/login')
    } else if (isAuthenticated && user.role === 1) {
      this.$router.push('/profile')
    } else {
      this.$store.dispatch('getProducts', 1)
    }
  },
  methods: {
    clearSearch() {
      this.$store.state.searchProductResults = null
    },
    nextPage() {
      this.pageNo += 1
      this.$store.dispatch('getProducts', this.pageNo)
    },
    previousPage() {
      this.pageNo -= 1
      this.$store.dispatch('getProducts', this.pageNo)
    },
    searchInventory() {
      this.$store.dispatch('searchProduct', this.searchObj)
    },
    async deleteProduct(product) {
      if (confirm("Do you want to delete this product?\n" + product.product_name)) { 
      await this.$axios
        .$delete('delete-product', { params: { slug: product.slug } })
        .then((resp) => {
          alert('Deleted: ' + product.product_name)
          if (resp.deleted) {
            if (this.$store.state.searchProductResults == null) {
            const index = this.$store.state.products.findIndex(
              (res) => res.slug === product.slug
            )
            this.$store.state.products.splice(index, 1)
            }
            else {
              const index = this.$store.state.searchProductResults.findIndex(
              (res) => res.slug === product.slug
            )
            this.$store.state.searchProductResults.splice(index, 1)
            }
          }
        })
        .catch((err) => alert("Cannot delete the product if it's in an order."))
      }
    },
  },
}
</script>
