<template>
  <div class="my-10">
    <NuxtLink to="/" class="text-blue-500 underline mx-10">Go Back</NuxtLink>

    <div class="flex flex-col items-center w-screen">
      <h1 class="text-black text-5xl">Checkout</h1>
      <p>
        Logged in as:
        <span class="text-blue-500 underline">jesseemamalie2@gmail.com</span>
      </p>

      <div class="flex h-70screen w-full justify-center">
        <!--order review div-->
        <div class="order-review overflow-auto w-3/4 m-5">
          <div class="bg-secondary p-4">
            <h2 class="">Review Order</h2>
          </div>

          <!-- products loop -->

          <div
            v-for="product in products"
            :key="product.id"
            class="product flex my-5 w-full p-5 shadow-lg h-screen/4"
          >
            <img :src="product.image" alt="" class="pr-10" />

            <div class="text">
              <p class="font-thin">{{ product.product_name }}</p>
              <br />
              <p class="font-bold text-xl">${{ product.unit_retail_price }}</p>
            </div>
          </div>
        </div>

        <!-- order total div -->
        <div
          class="m-5 w-1/4 h-screen/2 text-center flex flex-col justify-center"
        >
          <br />
          <p>Order Method: Delivery</p>
          <br />
          <p>Items: {{itemCount}}</p>
          <br />
          <p class="text-xl">Total: ${{totalPrice}}</p>
          <br />
          <Button
            class="button bg-primary p-5 text-white text-lg text-center"
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
      return this.$store.state.cart.length
    },
    totalPrice() {
      let total = 0
      for (let i = 0; i < this.itemCount; i++) {
        total += this.$store.state.cart[i].unit_retail_price
      }
      return total
    }
  },
  methods: {
    checkout() {
      this.$store.dispatch('checkout')
    }
  }
}
</script>
