<template>
  <div>
    <AdminHeader/>
         <table
          class="table-fixed w-11/12 items-center text-center border-2 border-blue-600 bg-white shadow-lg m-auto"
        >
          <caption>
            Admin Activity
          </caption>
          <thead>
            <tr class="bg-primary text-white">
              <th id="order-id" class="w-2/4 p-3">Admin User</th>
              <th id="date-placed" class="w-2/4 p-3">Activity</th>
              <th id="total-price" class="w-2/4 p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="activity in activities" :key="activity.id" class="border-2">
              <td class="p-3">{{ admin.name }}</td>
              <td class="p-3">${{ activity.name }}</td>
              <td class="p-3">${{ activity.date }}</td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
