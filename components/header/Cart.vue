<template>
  <div class="flex items-center justify-center min-h-full flex-col">
    <h1 class="text-4xl">Cart</h1>
    <br />
    <p>Total items: <b>{{itemCount}}</b></p>

    <div class="product flex my-5 w-10/12 p-5 shadow-lg h-screen/4" v-for="product in cart" :key="product.id">
      <img :src="product.image" alt="" class="pr-10" />
      <div class="text">
        <button class="text-red-600 text-right" @click="removeFromCart(product)">X</button>
        <br />
        <p class="font-thin text-lg">{{product.product_name}}</p>
        <br />
        <p class="font-bold">${{product.unit_retail_price}}</p>
      </div>
    </div>

    <p>Total price: <span class="text-lg">${{totalPrice}}</span></p>
    <br>

    <NuxtLink to="/checkout"
        class="button bg-primary p-4 w-3/4 text-white mb-10 text-lg text-center"
    >
        Go to Checkout
      </Nuxtlink>

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
}
</script>
