<template>
  <div>
    <div class="container py-10">
      <NuxtLink to="/" class="px-10 text-blue-500 underline">Go Back</NuxtLink>

      <div class="flex flex-col my-10 items-center w-screen">
        <h1 class="text-black text-5xl">Checkout</h1>

        <div class="order-details m-10 bg-secondary h-screen w-1/2 rounded p-4">
            <h2 class="text-black text-xl">Review Order</h2>
            
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  components: {},
}
</script>
