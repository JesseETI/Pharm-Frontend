<template>
  <div class="flex justify-center flex-col bg-primary p-4">
    <h1 class="text-4xl text-center">Account Sign Up</h1>
    <form
      method="POST"
      class="flex flex-col p-6"
      @submit.prevent="signUp"
    >
      <input
        v-model="user.fname"
        type="text"
        class="rounded p-3 m-2 text-black"
        name="firstname"
        placeholder="First Name"
        required
      />

      <input
        v-model="user.lname"
        type="text"
        class="rounded p-3 m-2 text-black"
        name="lastname"
        placeholder="Last Name"
        required
      />

      <input
        v-model="user.email"
        type="email"
        class="rounded p-3 m-2 text-black"
        placeholder="UWI Email Address"
        id="username"
        autocomplete="username" 
        required
      />

      <input
        v-model="user.password"
        type="password"
        class="rounded p-3 m-2 text-black"
        placeholder="Password"
        id="new-password"
        name="password"
        required
      />

      <textarea
        v-model="user.allergies"
        class="rounded p-6 m-2 text-black"
        name="allergies"
        placeholder=" Enter Your Existing Allergies"
        required
      />

      <textarea
        v-model="user.medications"
        class="rounded p-6 m-2 text-black"
        name="medications"
        placeholder=" Enter Your Existing Medications"
        required
      />

      <br />
      <button
        id="signup-btn"
        type="submit"
        class="button bg-primary p-4 border-2"
      >
        Sign Up
      </button>
    </form>
    <NuxtLink to="/login" class="text underline text-center">Already have an account? Login</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'SignUpForm',
  data() {
    return {
      user: [],
      visibleLogin: false,
    }
  },
  methods: {
    signUp() {
      this.$store.dispatch('auth/register', this.user)
    },
  },
}
</script>
