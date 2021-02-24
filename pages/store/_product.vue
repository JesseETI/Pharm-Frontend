<template>
  <div>
    <Header />
    <div class="m-10 min-h-full min-w-screen min-h-screen">
      <h2 class="text-gray-500">
        Store | Category | <span class="text-black">{{ product.product_name }}</span>
      </h2>
      <br />

      <div class="flex m-10">
        <img src="@/assets/med.png" alt="" class="product-img w-1/4" />

        <div
          class="product-info ml-40 w-3/4 text-gray-800 flex flex-col justify-between"
        >
          <h1 class="text-2xl">{{ product.product_name }}</h1>

          <p>
            <span class="text-xl">${{ product.unit_retail_price }}</span>
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
            nunc fermentum, convallis sem vitae, ornare lectus. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Nam convallis
            libero purus, vitae sollicitudin lorem consectetur vitae. Sed vel
            nibh id ipsum tempor aliquet. Nullam vel eros augue.
            <br />
            <br />
            Code: {{ product.code }}
          </p>

          <div class="product-actions flex">
            <div class="w-1/2 flex items-center">
              Quantity:
              <div class="bg-secondary ml-5">
                <button class="p-5 border-2-transparent">-</button>
                <span class="p-5">1</span>
                <button class="p-5 border-2-transparent">+</button>
              </div>
            </div>
            <button class="button bg-primary p-4 text-white w-1/2" @click="addToCart(product)">
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
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product)
    }
  },
  computed: {
    product() {
      return this.$store.state.products.find((product) => product.slug === this.$route.params.product)
    },
  },
}
</script>
