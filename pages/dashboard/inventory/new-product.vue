<template>
  <div class="flex flex-col w-screen">
    <!--Header-->
    <div class="header flex bg-primary text-white py-10 px-5">
      <button class="underline mx-10 focus:outline-none" @click="goBack">
        Go Back
      </button>
      <h1 class="text-5xl m-auto">Create a Product</h1>
    </div>

    <!--Body-->
    <div class="flex w-full justify-center">
      <!--product review div-->
      <div class="product-review w-full">
        <form
          method="POST"
          class="flex flex-col p-8"
          @submit.prevent="createProduct"
        >
          <!-- top half of the page -->
          <div class="top flex h-screen/3">
            <!--left side of the form -->
            <div class="left flex flex-col w-6/12">
              <div>
                <label for="code">Product Name:</label>
                <input
                  id="name"
                  v-model="product.name"
                  type="text"
                  class="rounded p-3 w-3/12 my-3 text-black"
                  name="name"
                  autocomplete="name"
                  placeholder="Display Name"
                  required
                />
              </div>
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
                <select
                  id="category"
                  v-model="product.category"
                  required
                  class="border-4 border-gray-400 italic"
                  name="category"
                >
                  <option disabled selected hidden :value="null">
                    -- select an option --
                  </option>
                  <option
                    v-for="category in productCategories"
                    :key="category.id"
                    :value="`${category}`"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>
            </div>

            <!---Right (Image) Side of the form -->
            <div class="right w-6/12 flex flex-col justify-center items-center">
              <label for="image">Product Image:</label>
              <img :src="product.image" alt="" class="product-img w-1/4" />
              <input
                id="image"
                type="file"
                class="rounded w-5/12 p-3 my-3 text-black"
                name="image"
                autocomplete="image"
                placeholder="Product Image"
                required
              />
            </div>
          </div>

          <!-- Bottom half of the page -->
          <div class="h-screen/3 flex flex-col items-center">
            <div class="flex mt-20 justify-center space-x-10 mb-10">
              <div
                class="Stock w-1/4 p-6 Quantity border-2 border-blue-600 rounded-lg"
              >
                <label for="supplier_cost_price">Supplier Cost Price: $</label>
                <input
                  id="supplier_cost_price"
                  v-model="product.supplier_cost_price"
                  type="text"
                  class="rounded w-5/12 p-3 text-black"
                  name="supplier_cost_price"
                  autocomplete="supplier_cost_price"
                  placeholder="Buying price"
                  required
                />
              </div>

              <div
                class="Stock w-1/4 p-6 Quantity border-2 border-blue-600 rounded-lg"
              >
                <label for="QoH">QoH</label>
                <input
                  id="QoH"
                  v-model="product.QoH"
                  type="text"
                  class="rounded w-5/12 p-3 text-black"
                  name="QoH"
                  autocomplete="QoH"
                  placeholder="# on-hand"
                  required
                />
              </div>

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
                  placeholder="available amt."
                  required
                />
              </div>

              <div
                class="Stock w-1/4 p-6 Quantity border-2 border-blue-600 rounded-lg"
              >
                <label for="unit_retail_price">Unit Retail Price:$</label>
                <input
                  id="unit_retail_price"
                  v-model="product.unit_retail_price"
                  type="text"
                  class="rounded w-5/12 p-3 text-black"
                  name="unit_retail_price"
                  autocomplete="unit_retail_price"
                  placeholder="Price per unit"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              class="button bg-primary p-5 text-white text-lg w-2/12 text-center"
            >
              Add Product
            </button>
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
      product: [],
    }
  },
  computed: {
    productCategories() {
      return this.$store.state.productCategories
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
      this.$store.dispatch('getProductCategories')
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    createProduct() {
      const formData = new FormData();
      
      formData.append("name", this.product.name)
      formData.append("code", this.product.code)
      formData.append("supplier", this.product.supplier)
      formData.append("category", this.product.category)
      formData.append("image", this.product.image)
      formData.append("supplier_cost_price", this.product.supplier_cost_price)
      formData.append("QoH", this.product.QoH)
      formData.append("stock_unit", this.product.stock_unit)
      formData.append("unit_retail_price", this.product.unit_retail_price)

      this.$store.dispatch('createProduct', formData)
      
    },
  },
}
</script>
