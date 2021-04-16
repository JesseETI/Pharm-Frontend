<template>
  <div>
    <!-- Product display page-->
    <Header />
    <div
      v-if="!$fetchState.pending"
      class="m-10 min-h-full min-w-screen min-h-screen"
    >
      <h2 class="text-gray-500">
        <!-- Current location within site -->
        Store | {{ product.category }} |
        <span class="text-black">{{ product.product_name }}</span>
      </h2>
      <br />

      <div class="flex m-10">
        <img src="~assets/med.png" alt="" class="product-img w-1/4" />

        <div
          class="product-info ml-40 w-3/4 text-gray-800 flex flex-col justify-between"
        >
          <h1 class="text-2xl">{{ product.product_name }}</h1>

          <p>
            <span class="text-xl">${{ product.unit_retail_price }}</span>
            <br />
            <br />
            <!-- Product Desc-->
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
            nunc fermentum, convallis sem vitae, ornare lectus. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Nam convallis
            libero purus, vitae sollicitudin lorem consectetur vitae. Sed vel
            nibh id ipsum tempor aliquet. Nullam vel eros augue.
            <br />
            <br />
            Code: {{ product.code }}
            <br />
            <br />
            In stock: {{ product.stock_unit }} Units
            <br />
            <br />
          </p>

          <div
            v-if="product.stock_unit > 0 && product.unit_retail_price > 0"
            class="product-actions flex"
          >
            <div class="w-1/2 flex items-center">
              <!-- Change quanity based on button clicks -->
              Quantity:
              <div class="bg-secondary ml-5">
                <button
                  class="p-5 border-2-transparent focus:outline-none"
                  @click="changeQuantity('-')"
                >
                  -
                </button>
                <span class="p-5">{{ quantity }}</span>
                <button
                  class="p-5 border-2-transparent focus:outline-none"
                  @click="changeQuantity('+')"
                >
                  +
                </button>
              </div>
            </div>
            <button
              class="button bg-primary p-4 text-white w-1/2"
              @click="addToCart(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      quantity: 1, // intial quantity for all products
    }
  },
  async fetch() {
    // get product details every reload for instant changes
    await this.$axios
      .$get('product', { params: { slug: this.$route.params.product } })
      .then((resp) => {
        this.product = resp
      })
      .catch((err) => console.log(err))
  },
  methods: {
    addToCart(product) {
      product.quantity = this.quantity
      this.$store.dispatch('addToCart', product)
    },
    // changes quantity between 1 and stock unit
    changeQuantity(operation) {
      if (operation === '+' && this.quantity < this.product.stock_unit) {
        this.quantity += 1
      } else if (operation === '-' && this.quantity > 1) {
        this.quantity -= 1
      }
    },
  },
}
</script>
