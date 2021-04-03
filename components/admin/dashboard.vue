<template>
  <div>
    <div>
      <div class="rounded-full h-24 w-24 flex items-center justify-center">
        <img src="" alt="" />
      </div>
      <div>
        <h1>Andhra Maraj</h1>
        <h2>Admin</h2>
      </div>
    </div>
    <hr />
    <h3>Pages</h3>
    <div>
      <ul class="text-bold flex px-10">
        <li>
          <NuxtLink to="/dashboard/" class="block px-10">
            <div>
              <div>Home</div>
              <div><img src="~assets/home_icon.png" alt="home icon" /></div>
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/dashboard/orderList" class="block px-10">
            <div>
              <div>Orders</div>
              <div><img src="~assets/order_icon.png" alt="order icon" /></div>
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/dashboard/inventory" class="block px-10">
            <div>
              <div>Inventory</div>
              <div><img src="~assets/inventory_icon.png" alt="inventory icon" /></div>
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/dashboard/customerList" class="block px-10">
            <div>
              <div>Customers</div>
              <div><img src="~assets/customer_icon.png" alt="customer icon" /></div>
            </div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/dashboard/activity" class="block px-10">
            <div>
              <div>Activity Log</div>
              <div><img src="~assets/history_icon.png" alt="history icon" /></div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>

<style></style>
