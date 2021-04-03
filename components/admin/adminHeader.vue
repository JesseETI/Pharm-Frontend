<template>
  <div>
    <nav class="bg-primary text-white flex items-center p-4">
      <h1>UWI<span class="bold text-black">PHARM</span></h1>
      <div class="float-right">
        <button v-show="isAuthenticated" @click="logout">Logout</button>
      </div>
    </nav>

    <client-only>
      <slideout v-model="visibleDashboard" dock="left" title="Close Dashboard">
        <Dashboard />
      </slideout>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'AdminHeader',
  data() {
    return {
      visibleDashboard: true,
    }
  },
}
</script>

<style></style>
