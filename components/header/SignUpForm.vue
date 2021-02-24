<template>
  <div class="flex justify-center items-center min-h-full flex-col">
    <h1 class="text-4xl">Account Sign Up</h1>
    <form
      method="POST"
      class="flex flex-col min-w-full p-4"
      @submit.prevent="signUp"
    >
      <input
        type="text"
        class="rounded p-3 my-3 text-black border-2"
        name="firstname"
        placeholder="First Name"
        required
      />

      <input
        type="text"
        class="rounded p-3 my-3 text-black border-2"
        name="lastname"
        placeholder="Last Name"
        required
      />

      <input
        type="text"
        class="rounded p-3 my-3 text-black border-2"
        name="dob"
        placeholder="Date of Birth"
        required
      />

      <textarea
        class="rounded p-6 my-3 text-black border-2"
        name="allergies"
        placeholder=" Enter Your Existing Allergies"
        required
      />

      <textarea
        class="rounded p-6 my-3 text-black border-2"
        name="allergies"
        placeholder=" Enter Your Existing Medications"
        required
      />

      <br />
      <button
        id="submit"
        type="submit"
        class="button bg-primary p-4 text-white"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpForm',
}
</script>
