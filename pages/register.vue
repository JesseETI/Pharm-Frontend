<template>
  <div>
    <Header />
    <div class="flex items-center justify-center">
      <div
        class="flex items-center justify-center shadow-lg bg-primary min-h-80screen m-10"
      >
        <div class="w-5/12 flex justify-center">
          <img src="~assets/pill.png" alt="" class="w-10/12" />
        </div>
        <div class="w-5/12 text-white">
          <SignUpForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // prevents authenticated users to signing up again
    const isAuthenticated = this.$store.getters['auth/isAuthenticated']
    if (isAuthenticated) {
      this.$router.push('/profile')
    }
  },
}
</script>
