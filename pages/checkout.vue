<template>
  <!-- Takes products from cart and sends it as an order to API -->
  <div class="my-10 sm:my-20">
    <NuxtLink to="/" class="text-blue-500 underline mx-10 sm:my-10">Go Back</NuxtLink>

    <div class="flex flex-col items-center w-screen">
      <h1 class="text-5xl sm:text-3xl">Checkout</h1>

      <div class="flex h-70screen w-full justify-center sm:flex-col sm:items-center">
        <!--order review div-->
        <div class="order-review overflow-auto w-3/4 m-5 sm:w-screen">
          <div class="bg-secondary p-4 flex justify-between">
            <h2 class="text-xl sm:text-sm">Review Order</h2>
          </div>

          <!-- products loop -->

          <div
            v-for="product in products"
            :key="product.id"
            class="product flex my-5 w-full p-5 shadow-lg"
          >
            <img :src="product.image" alt="" class="pr-10" />

            <div class="text sm:text-sm">
              <p class="font-thin">{{ product.product_name }}</p>
              <br />
              <p class="font-thin">Quantity: {{ product.quantity }}</p>
              <br />
              <p class="font-bold text-xl">Cost: ${{ product.unit_retail_price }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-4 mr-4 sm:hidden">
          <button
            class="rounded-full italic bg-primary p-4 text-white focus:outline-none"
            @click="scrollToTop()"
          >
            &uarr;
          </button>
          <button
            class="rounded-full italic bg-primary p-4 text-white focus:outline-none"
            @click="scrollToBottom()"
          >
            &darr;
          </button>
        </div>

        <!-- order total div -->
        <div
          class="m-5 w-1/4 text-center flex flex-col justify-center"
        >
          <br />
          <p>Order Method: Delivery</p>
          <br />
          <p>Items: {{ itemCount }}</p>
          <br />
          <p class="text-xl">Total: ${{ totalPrice }}</p>
          <br />
          <Button
            class="button bg-primary p-5 text-white text-lg text-center sm:p-3 sm:w-screen"
            @click="checkout"
          >
            Confirm Order
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  computed: {
    products() {
      return this.$store.state.cart
    },
    itemCount() {
      return this.$store.getters.itemCount
    },
    totalPrice() {
      return this.$store.getters.total
    },
  },
  methods: {
    //scroll methods for long orders
    scrollToBottom() {
      const container = this.$el.querySelector('.order-review')
      container.scroll({
        top: container.scrollHeight,
        behavior: 'smooth',
      })
    },
    scrollToTop() {
      const container = this.$el.querySelector('.order-review')
      container.scroll({
        top: 0,
        behavior: 'smooth',
      })
    },
    checkout() {
      this.$store.dispatch('checkout')
    },
  },
  created() {
    let isAuthenticated = this.$store.getters['auth/isAuthenticated']
    if (!isAuthenticated) {
      this.$router.push('/login')
    }
    else {
      // only lets users view page by ensuring cart is filled out first
      let products = this.$store.state.cart
      if (products.length == 0) {
        alert("Please checkout via cart function.")
        this.$router.push('/store')
      }
    }
  },
}
</script>
