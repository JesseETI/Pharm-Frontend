<template>
    <div>
        <AdminHeader/>
             <table
          class="table-fixed w-11/12 items-center text-center border-2 border-blue-600 bg-white shadow-lg m-auto"
        >
          <caption>
            Inventory
          </caption>
          <thead>
            <tr class="bg-primary text-white">
              <th id="product-id" class="w-2/4 p-3">Product ID</th>
              <th id="product-name" class="w-2/4 p-3">Product Name</th>
              <th id="category" class="w-2/4 p-3">Category</th>
              <th id="stock unit" class="w-2/4 p-3">Stock Unit</th>
              <th id="unit-retail" class="w-2/4 p-3">Unit Retail</th>
              <th id="placeholder" class="w-2/4 p-3"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="product in productss" :key="product.id" class="border-2">
                <td class="p-3">{{ product.id }}</td>
                <td class="p-3">{{ product.name }}</td>
                <td class="p-3">${{ product.category }}</td>
                <td class="p-3">${{ product.stock_unit }}</td>
                <td class="p-3">${{ product.unit_retail }}</td>
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
