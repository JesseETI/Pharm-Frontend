<template>
  <div>
    <Header />

    <div class="flex h-90screen">
      <Profile/>

      <!-- dashboard shortcuts -->

      <div class="dashboard w-9/12 p-5">
        <h2 class="text-4xl m-10">Admin Dashboard</h2>

        <div class="flex gap-10 text-center">
          <NuxtLink to="/dashboard/orders">
            <img
              src="~assets/box.png"
              alt=""
              class="border-4 p-5 border-black rounded-lg hover:bg-primary"
            />
            <h2 class="text-xl">Manage Orders</h2>
          </NuxtLink>

          <NuxtLink to="/dashboard/inventory">
            <img
              src="~assets/inventory.png"
              alt=""
              class="border-4 p-5 border-black rounded-lg hover:bg-primary"
            />
            <h2 class="text-xl">Manage Inventory</h2>
          </NuxtLink>

          <NuxtLink to="/dashboard/customers">
            <img
              src="~assets/customer.png"
              alt=""
              class="border-4 p-5 border-black rounded-lg hover:bg-primary"
            />
            <h2 class="text-xl">Manage Customers</h2>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    let isAuthenticated = this.$store.getters['auth/isAuthenticated']
    let user = this.$store.getters['auth/getUser'] 
    if (!isAuthenticated) {
      this.$router.push('/login')
    }
    else if (isAuthenticated && user.role == 1) {
      this.$router.push('/profile')
    }
  },
}
</script>

<style></style>
