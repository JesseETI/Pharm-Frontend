<template>
  <div>
    <Header />
    <div v-if="customer" class="flex h-90screen">
      <!-- user profile info -->
      <div
        class="profile-info w-3/12 text-center flex flex-col items-center pt-10 px-3"
      >
        <img
          src="~assets/icon.png"
          alt=""
          class="w-3/12 border-4 p-3 rounded-3xl border-black"
        />
        <h1 class="text-2xl mt-10">
          <span class="text-blue-600">Welcome</span>,
          {{ customer.user.first_name }} {{ customer.user.last_name }}
        </h1>
        <h2 class="text-sm mt-2">
          logged in as:
          <span class="text-blue-600">{{ customer.user.email }}</span>
        </h2>
        <p class="mt-20 mb-10">Here's your medical profile:</p>
        <p>
          Your Allergies:<br />{{ customer.allergies }}<br /><br />
          Medications you take:<br />{{ customer.medicines }}<br /><br />
        </p>
      </div>
      <!-- order list attached to user -->
      <div class="order-info w-9/12 bg-secondary p-5">
        <h2 class="text-4xl m-10">Order History</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      customer: null,
    }
  },
  mounted() {
    this.customer = this.$store.getters['auth/getUser']
  },
  created() {
    this.$store.dispatch('auth/getUserDetails')
  },
}
</script>
