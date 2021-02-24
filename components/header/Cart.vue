<template>
  <div class="flex items-center justify-center min-h-full flex-col">
    <h1 class="text-4xl">Cart</h1>
    <br />
    <p>Total items: <b>3</b></p>

    <div class="product flex my-5 w-10/12 p-5 shadow-lg h-screen/4" v-for="product in cart" :key="product.id">
      <img src="../../assets/med.png" alt="" class="pr-10" />

      <div class="text">
        <button class="text-red-600 text-right" @click="removeFromCart(product)">X</button>
        <br />
        <p class="font-thin text-lg">{{product.product_name}}</p>
        <br />
        <p class="font-bold">${{product.unit_retail_price}}</p>
      </div>
    </div>

    <p>Total price: <span class="text-lg">$150</span></p>
    <br>

    <button
        id="submit"
        class="button bg-primary p-4 w-3/4 text-white mb-10 text-lg"
      >
        Go to Checkout
      </button>

  </div>
</template>

<script>
export default {
  methods: {
    removeFromCart(product) {
      this.$store.dispatch('removeFromCart', product)
    },
  },  
  computed: {
    cart() {
      return this.$store.state.cart
    }
  }
}
</script>
