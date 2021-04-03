<template>
  <div>
    <AdminHeader />
    <div>
      <NuxtLink to="/dashboard/orderList">
        <div>
          <div class="h-200px w-200px"><img src="~assets/box.png" alt="order"  /></div>
          <div>Manage orders</div>
        </div>
      </NuxtLink>
      <NuxtLink to="/dashboard/inventory">
        <div>
          <div class="h-193px w-193px"><img src="~assets/inventory.png" alt="inventory" /></div>
          <div>Manage Inventory</div>
        </div>
      </NuxtLink>
      <NuxtLink to="/dashboard/customerList">
        <div>
          <div class="h-160px w-231px" ><img src="~assets/customer.png" alt="customer"/></div>
          <div>List of Customers</div>
        </div>
      </NuxtLink>
      <NuxtLink to="/dashboard/activity">
        <div>
          <div class="h-170px w-170px"><img src="~assets/history.png" alt="activity"/></div>
          <div>Admin Activity</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
