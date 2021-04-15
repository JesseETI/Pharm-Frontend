<template>
  <div v-if="product" class="flex flex-col w-screen">
    <!--Header-->
    <div class="header flex bg-primary text-white py-10 px-5">
      <button class="underline mx-10 focus:outline-none" @click="goBack">
        Go Back
      </button>
      <h1 class="text-5xl m-auto">{{ product.product_name }}</h1>
    </div>

    <!--Body-->
    <div class="flex w-full justify-center">
      <!--product review div-->
      <div class="product-review w-full">
        <form
          method="POST"
          class="flex flex-col p-8"
          @submit.prevent="updateProduct"
        >
          <!-- top half of the page -->
          <div class="top flex h-screen/2">
            <!--left side of the form -->
            <div class="left flex flex-col w-6/12">
              <div>
                <label for="code">Product Code:</label>
                <input
                  id="code"
                  v-model="product.code"
                  type="text"
                  class="rounded p-3 w-3/12 my-3 text-black"
                  name="code"
                  autocomplete="code"
                  placeholder="4-digit-code"
                  required
                />
              </div>
              <div>
                <label for="supplier">Product Supplier:</label>
                <input
                  id="supplier"
                  v-model="product.supplier"
                  type="text"
                  class="rounded w-8/12 p-3 my-3 text-black"
                  name="supplier"
                  autocomplete="supplier"
                  placeholder="Name of Supplier"
                  required
                />
              </div>
              <div>
                <label for="category">Product Category:</label>
                <input
                  id="category"
                  v-model="product.category"
                  type="text"
                  class="rounded w-5/12 p-3 my-3 text-black"
                  name="category"
                  autocomplete="category"
                  placeholder="Antiobiotic, Phone card etc"
                  required
                />
              </div>
            </div>

            <!---Right (Image) Side of the form -->
            <div class="right w-6/12 flex flex-col justify-center items-center">
              <img src="~assets/med.png" class="product-img w-1/4" />
              <input
                id="category"
                type="file"
                class="rounded w-5/12 p-3 my-3 text-black"
                name="category"
                autocomplete="category"
                placeholder="Product Category"
              />
            </div>
          </div>

          <!-- Bottom half of the page -->
          <div class="h-screen/3">
            <div class="flex mt-20 justify-center space-x-10">
              <div
                class="Stock w-1/4 p-6 Quantity border-2 border-blue-600 rounded-lg"
              >
                <label for="stock_unit">Product Quantity:</label>
                <input
                  id="stock_unit"
                  v-model="product.stock_unit"
                  type="text"
                  class="rounded w-5/12 p-3 text-black"
                  name="stock_unit"
                  autocomplete="stock_unit"
                  placeholder="Product Quantity"
                  required
                />
              </div>

              <div
                class="Stock p-6 Quantity border-2 border-blue-600 rounded-lg"
              >
                <label for="retail_price">Unit Retail Price:$</label>
                <input
                  id="retail_price"
                  v-model="product.unit_retail_price"
                  type="text"
                  class="rounded w-5/12 p-3 text-black"
                  name="retail_price"
                  autocomplete="retail_price"
                  placeholder="Unit Retail Price"
                  required
                />
              </div>
              <button
                type="submit"
                class="button bg-primary p-5 text-white text-lg text-center"
              >
                Edit Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
    }
  },
  async created() {
    const isAuthenticated = this.$store.getters['auth/isAuthenticated']
    const user = this.$store.getters['auth/getUser']

    if (!isAuthenticated) {
      this.$router.push('/login')
    } else if (isAuthenticated && user.role === 1) {
      this.$router.push('/profile')
    } else {
      // get updates on product every creation
      await this.$axios
        .$get('product', { params: { slug: this.$route.params.product } })
        .then((resp) => {
          this.product = resp
        })
        .catch((err) => console.log(err))
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // work in progress
    changeProductStatus() {
      const payload = {
        code: this.product.code,
        supplier: this.product.supplier,
        category: this.product.category,
        image: this.product.image,
        quantity: this.product.quantity,
      }
      this.$store.dispatch('changeProductStatus', payload)
    },
  },
}
</script>
