<template>
    <div>
        <AdminHeader/>
             <table
          class="table-fixed w-11/12 items-center text-center border-2 border-blue-600 bg-white shadow-lg m-auto"
        >
          <caption>
            Orders
          </caption>
          <thead>
            <tr class="bg-primary text-white">
              <th id="order-id" class="w-2/4 p-3">Order ID</th>
              <th id="customer-name" class="w-2/4 p-3">Customer Name</th>
              <th id="date-placed" class="w-2/4 p-3">Date Placed</th>
              <th id="total-price" class="w-2/4 p-3">Total Price</th>
              <th id="status" class="w-2/4 p-3">Status</th>
              <th id="placeholder" class="w-2/4 p-3"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="order in orders" :key="order.id" class="border-2">
              <td class="p-3">{{ order.id }}</td>
              <td class="p-3">{{ order.name }}</td>
              <td class="p-3">{{ order.date_placed }}</td>
              <td class="p-3">${{ order.order_total }}</td>
              <td
                v-if="order.status == 'processing'"
                class="p-3 text-yellow-600"
              >
                {{ order.status }}
              </td>
              <td
                v-else-if="order.status == 'ready'"
                class="p-3 text-green-600"
              >
                {{ order.status }}
              </td>
              <td v-else class="p-3 text-red-600">{{ order.status }}</td>
              <td class="p-3 text-blue-600 underline">
                <NuxtLink :to="`invoice/${order.id}`">View Details</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {}
</script>

<style></style>
