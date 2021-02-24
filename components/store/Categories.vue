<template>
  <div class="border-r-2">
    <h3 class="mt-10 text-2xl">Categories</h3>
    <ul class="mt-3">
      <li v-for="category in productCategories" :key="category.id" class="mt-2 text-gray-600">
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    productCategories() {
      return this.$store.state.productCategories
    },
  },
  mounted() {
    this.$store.dispatch('getProductCategories')
  },
}
</script>
