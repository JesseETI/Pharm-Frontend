<template>
  <div class="bg-primary w-screen h-screen/3 flex items-center justify-center">
    <div class="partitions w-1/2 flex justify-between text-white">
      
      <div class="quick-links">
        <h3 class="text-xl">Quick Links</h3>
        <ul aria-label="Quick Links" class="mt-5">
          <li class="mb-2"><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
        </ul>
      </div>
      
      <div class="shopping">
        <h3 class="text-xl">Shopping</h3>
        <ul aria-label="Shopping" class="mt-5">
          <li class="mb-2"><NuxtLink to="/store">Store</NuxtLink></li>
          <li class="mb-2"><NuxtLink to="/checkout">Checkout</NuxtLink></li>
        </ul>
      </div>

      <div class="account-info">
        <h3 class="text-xl">My Account</h3>
        <ul aria-label="Shopping" class="mt-5">
          <li class="mb-2"><li class="mb-2"><NuxtLink to="/login">Login</NuxtLink></li>
          <li class="mb-2"><NuxtLink to="/register">Sign Up</NuxtLink></li>
          <li><NuxtLink to="/profile">My Orders</NuxtLink></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
</script>
