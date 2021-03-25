<template>
  <div class="flex flex-wrap">
    <!--Products-->
    <div
      v-for="product in products"
      :key="product.id"
      class="product-item flex p-5"
    >
      <nuxt-link :to="`store/${product.slug}`">
        <div
          class="product rounded shadow-md p-2 flex flex-col overflow-hidden"
        >
          <img :src="product.image" alt="" class="card-img p-4" />
          <div class="content my-5">
            <div class="title flex-1">
              {{ product.product_name }}
            </div>
            <br />
            <p class="price text-xl">${{ product.unit_retail_price }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products
    },
  },
  mounted() {
    this.$store.dispatch('getProducts')
  },
}
</script>
