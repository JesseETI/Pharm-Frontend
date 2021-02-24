<template>
  <div class="flex justify-center items-center min-h-full flex-col">
    <h1 class="text-4xl">Account Login</h1>
    <form
      method="POST"
      class="flex flex-col min-w-full p-4"
      @submit.prevent="signUp"
    >
      <input
        type="text"
        class="rounded p-3 my-3 text-black bg-secondary"
        name="username"
        placeholder="E-mail"
        required
      />
      <input
        type="password"
        class="rounded p-3 my-3 text-black bg-secondary"
        name="password"
        placeholder=" Enter Password"
        required
      />
      <br />
      <button
        id="submit"
        type="submit"
        class="button bg-primary p-4 text-white"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LogInForm',
}
</script>
