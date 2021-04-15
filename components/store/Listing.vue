<template>
  <div>
    <!--Products Listing-->
    <div class="flex flex-wrap">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item flex p-5"
      >
        <nuxt-link :to="`store/${product.slug}`">
          <div
            class="product rounded shadow-md p-2 flex flex-col overflow-hidden"
          >
            <img src="~assets/med.png" alt="" class="card-img p-4" />
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
    <!--Navigation Buttons -->
    <div class="m-auto w-3/12 space-x-10 mt-10">
      <button
        v-if="pageNo > 1"
        class="p-4 w-4/12 bg-primary text-white"
        @click="previousPage"
      >
        Previous Page
      </button>
      <button class="p-4 w-4/12 bg-primary text-white" @click="nextPage">
        Next Page
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNo: 1,
    }
  },
  computed: {
    products() {
      return this.$store.state.products
    },
  },
  mounted() {
    // calls every mount to check for any instant updates on removal, edit
    // or creation of products
    this.$store.dispatch('getProducts', 1)
  },
  methods: {
    nextPage() {
      this.pageNo += 1
      this.$store.dispatch('getProducts', this.pageNo)
    },
    previousPage() {
      this.pageNo -= 1
      this.$store.dispatch('getProducts', this.pageNo)
    },
  },
}
</script>
