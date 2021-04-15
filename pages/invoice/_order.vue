<template>
  <div v-if="order" class="page a4">
    <div class="flex flex-col w-screen">
      <div
        class="header flex bg-primary text-white py-10 px-5 place-content-between"
      >
        <button class="underline mx-10 focus:outline-none" @click="goBack">
          Go Back
        </button>
        <h1 class="text-5xl">Invoice</h1>

        <div class="flex">
          <div class="text mx-20">
            <p>UWI HSU Pharmacy</p>
            <a href="mailto:hsu.pharmacy@sta.uwi.edu"
              >E-mail: hsu.pharmacy@sta.uwi.edu</a
            >
            <p>#: 662-2002</p>
          </div>

          <div class="text">
            <p>Billed to:</p>
            <p>E-mail: {{ order.user.email }}</p>
            <p>Name: {{ order.user.first_name }} {{ order.user.last_name }}</p>
          </div>
        </div>
      </div>

      <div class="flex h-70screen w-full justify-center">
        <!--order review div-->
        <div class="order-review overflow-auto w-3/4 m-5">
          <p>Order ID: {{ order.id }}</p>
          <p>
            Date of Issue: {{ order.date_placed }}

            <!-- products loop -->
          </p>

          <div class="bg-secondary p-4 my-10 flex justify-between">
            <h2 class="text-xl">Review Order</h2>
          </div>

          <div
            v-for="product in order.products"
            :key="product.id"
            class="product flex w-full p-5 shadow-lg h-2/12"
          >
            <img src="~assets/med.png" alt="" class="pr-10" />

            <div class="text">
              <p class="font-thin">{{ product.product_name }}</p>
              <br />
              <p class="font-thin">{{ product.quantity }}</p>
              <br />
              <p class="font-bold text-xl">${{ product.unit_retail_price }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center space-y-4 mr-4">
          <button
            class="rounded-full italic bg-primary p-4 text-white focus:outline-none"
            @click="scrollToTop()"
          >
            &uarr;
          </button>
          <button
            class="rounded-full italic bg-primary p-4 text-white focus:outline-none"
            @click="scrollToBottom()"
          >
            &darr;
          </button>
        </div>

        <!-- order total div -->
        <div
          class="m-5 w-1/4 h-screen/2 text-center flex flex-col justify-center"
        >
          <p v-if="role == 2">
            Change Order Status:
            <select
              id="orderStatus"
              v-model="status"
              class="border-4 border-gray-400 italic"
              name="orderStatus"
              @change="changeOrderStatus"
            >
              <option disabled selected hidden :value="null">
                -- select an option --
              </option>
              <option value="processing">processing</option>
              <option value="denied">denied</option>
              <option value="ready">ready</option>
            </select>
          </p>
          <br />
          <p>
            Order Status:
            <span
              v-if="currOrderStatus == 'processing'"
              class="text-yellow-600"
              >{{ currOrderStatus }}</span
            >
            <span
              v-else-if="currOrderStatus == 'denied'"
              class="text-red-600"
              >{{ currOrderStatus }}</span
            >
            <span v-else class="text-green-600">{{ currOrderStatus }}</span>
          </p>
          <br />
          <p>Order Method: Delivery</p>
          <br />
          <p>Items: {{ order.item_count }}</p>
          <br />
          <p class="text-xl">Total: ${{ order.order_total }}</p>
          <br />
          <button
            v-if="currOrderStatus == 'ready'"
            class="button bg-primary p-5 text-white text-lg text-center"
            @click="printInvoice"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: null,
      role: 1,
      status: null,
    }
  },
  computed: {
    currOrderStatus() {
      if (this.status) {
        return this.status
      } else {
        return this.order.status
      }
    },
  },
  async created() {
    const isAuthenticated = this.$store.getters['auth/isAuthenticated']
    const user = this.$store.getters['auth/getUser']

    if (!isAuthenticated) {
      this.$router.push('/login')
    } else {
      this.role = user.role

      await this.$axios
        .$get('order', { params: { id: this.$route.params.order } })
        .then((resp) => {
          this.order = resp
        })
        .catch((err) => console.log(err))
    }
  },
  methods: {
    // scroll methods scroll automatically to review orders with lots of products
    scrollToBottom() {
      const container = this.$el.querySelector('.order-review')
      container.scroll({
        top: container.scrollHeight,
        behavior: 'smooth',
      })
    },
    scrollToTop() {
      const container = this.$el.querySelector('.order-review')
      container.scroll({
        top: 0,
        behavior: 'smooth',
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    printInvoice() {
      try {
        // Print for Safari browser
        document.execCommand('print', false, null)
      } catch {
        // Print for chrome and other normal browsers :)
        window.print()
      }
    },
    changeOrderStatus() {
      const payload = {
        orderID: this.order.id,
        status: this.status,
      }
      this.$store.dispatch('changeOrderStatus', payload)
    },
  },
}
</script>
