<template>
  <div>
    <Header />
    <div class="h-90screen flex items-center justify-center">
      <div
        class="bg-primary flex items-center justify-center shadow-lg h-80screen m-10"
      >
        <div class="w-5/12">
          <img src="~assets/pill.png" alt="" class="w-10/12" />
        </div>
        <div class="w-5/12 text-white">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    let isAuthenticated = this.$store.getters['auth/isAuthenticated']
    if (isAuthenticated) {
      this.$router.push('/profile')
    }
  },
}
</script>