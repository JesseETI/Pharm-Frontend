<template>
  <div class="flex items-center justify-center min-h-full flex-col">
    <h1 class="text-4xl">Cart</h1>
    <br />
    <p>Total items: <strong>{{itemCount}}</strong></p>

    <!-- list of products-->
    <div class="product flex my-5 w-10/12 p-5 shadow-lg h-screen/4" v-for="product in cart" :key="product.id">
      <img :src="product.image" alt="" class="pr-10" />
      <div class="text">
        <button class="text-red-600 text-right" @click="removeFromCart(product)">X</button>
        <br />
        <p class="font-thin text-lg">{{product.product_name}}</p>
        <br />
        <p class="font-bold">Quantity: {{product.quantity}}</p>
        <br />
        <p class="font-bold">Cost: ${{product.unit_retail_price}}</p>
      </div>
    </div>

    <p>Total price: <span class="text-lg">${{totalPrice}}</span></p>
    <br>

    <NuxtLink to="/checkout" v-if="itemCount != 0"
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
    // computed properties so that changes can be reflected instantly
    cart() {
      return this.$store.state.cart
    },
    itemCount() {
      return this.$store.getters.itemCount
    },
    totalPrice() {
      return this.$store.getters.total
    }
  },
}
</script>
