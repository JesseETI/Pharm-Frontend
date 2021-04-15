<template>
  <div class="flex justify-center flex-col bg-primary">
    <h1 class="text-4xl text-center">Account Login</h1>
    <form method="POST" class="flex flex-col p-8" @submit.prevent="login">
      <input
        id="username"
        v-model="user.email"
        type="text"
        class="rounded p-3 my-3 text-black"
        name="username"
        autocomplete="username"
        placeholder="Email"
        required
      />
      <input
        id="current-password"
        v-model="user.password"
        type="password"
        class="rounded p-3 my-3 text-black"
        autocomplete="current-password"
        name="password"
        placeholder="Password"
        required
      />
      <br />
      <button
        id="login-btn"
        type="submit"
        class="button border-2 p-4 text-white"
      >
        Login
      </button>
    </form>

    <NuxtLink to="/register" class="text underline text-center"
      >Don't have an account? Sign Up</NuxtLink
    >
  </div>
</template>

<script>
export default {
  name: 'LogInForm',
  data() {
    return {
      user: [],
    }
  },
  methods: {
    login() {
      // send login to api with user-submitted credentials
      this.$store.dispatch('auth/login', this.user)
    },
  },
}
</script>
