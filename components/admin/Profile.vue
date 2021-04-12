<template>
  <!-- admin profile info -->
  <div
    class="profile-info w-3/12 text-center flex flex-col items-center pt-10 px-3 shadow-lg"
  >
    <img
      src="~assets/icon.png"
      alt=""
      class="w-3/12 border-4 p-3 rounded-3xl border-black"
    />
    <h1 class="text-2xl mt-10">
      <span class="text-blue-600">Welcome</span>, Andhra Maraj
    </h1>

    <h2 class="text-sm mt-2">
      logged in as:
      <span class="text-blue-600">andhra.maraj@gmail.com</span>
    </h2>

    <ul class="mt-20 divide-y-2 w-full li:bg-primary">
        <li class="hover:bg-primary hover:text-white p-4"><NuxtLink to="/dashboard" class="px-10">Admin Dashboard</NuxtLink></li>
        <li class="hover:bg-primary hover:text-white p-4"><NuxtLink to="/dashboard/orders" class="px-10">Manage Orders</NuxtLink></li>
        <li class="hover:bg-primary hover:text-white p-4"><NuxtLink to="/dashboard/inventory" class="px-10">Manage Inventory</NuxtLink></li>
        <li class="hover:bg-primary hover:text-white p-4"><NuxtLink to="/dashboard/customers" class="px-10">Manage Customers</NuxtLink></li>
    </ul>
   
  </div>
</template>
