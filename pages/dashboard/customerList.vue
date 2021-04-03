<template>
  <div>
    <AdminHeader />
         <table
          class="table-fixed w-11/12 items-center text-center border-2 border-blue-600 bg-white shadow-lg m-auto"
        >
          <caption>
            List of Customers
          </caption>
          <thead>
            <tr class="bg-primary text-white">
              <th id="order-id" class="w-2/4 p-3">Customer ID</th>
              <th id="date-placed" class="w-2/4 p-3">Customer Name</th>
              <th id="placeholder" class="w-2/4 p-3"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="customer in customers" :key="customer.id" class="border-2">
              <td class="p-3">{{ customer.id }}</td>
              <td class="p-3">{{ customer.name }}</td>
              <td class="p-3">View Details</td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
