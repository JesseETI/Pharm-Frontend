<template>
  <div v-if="order" class="page a4">
    <div class="flex flex-col w-screen">
      <div class="header flex bg-primary text-white py-10 px-5 place-content-between">
        <NuxtLink to="/profile" class="underline mx-10">Go Back</NuxtLink>
        <h1 class="text-5xl">Invoice</h1>


        <div class="flex">
          <div class="text mx-20">
              <p>UWI HSU Pharmacy</p>
              <a href="mailto:hsu.pharmacy@sta.uwi.edu">E-mail: hsu.pharmacy@sta.uwi.edu</a>
              <p>#: 662-2002</p>
            </div>

          <div class="text">
              <p>Billed to:</p>
              <p>E-mail: {{ order.user.email }}</p>
              <p>Name: {{order.user.first_name}} {{order.user.last_name}}</p>
            </div>
        </div> 
      </div>
      

      

      <div class="flex h-70screen w-full justify-center">
        <!--order review div-->
        <div class="order-review overflow-auto w-3/4 m-5">

           <p>Order ID: {{order.id}}</p>
           <p>Date of Issue: {{order.date_placed}}

          <!-- products loop -->

          <div class="bg-secondary p-4 my-10 flex justify-between">
            <h2 class="text-xl">Review Order</h2>
          </div> 

          <div
            v-for="product in order.products"
            :key="product.id"
            class="product flex w-full p-5 shadow-lg h-2/12"
          >
            <img :src="product.image" alt="" class="pr-10" />

            <div class="text">
              <p class="font-thin">{{ product.product_name }}</p>
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
          <p>Order Status: {{order.status}}</p>
          <br />
          <p>Order Method: Delivery</p>
          <br />
          <p>Items: {{ order.item_count }}</p>
          <br />
          <p class="text-xl">Total: ${{ order.order_total }}</p>
          <br />
          <a href="javascript:if(window.print)window.print()"
          class="button bg-primary p-5 text-white text-lg text-center"
          >
            Print Invoice
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order : null,
    }
  },
  methods: {
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
  },
  async created() {
    await this.$axios
      .$get('order', { params: { id: this.$route.params.order } })
      .then((resp) => {
        this.order = resp
      })
      .catch((err) => console.log(err))
  }
}
</script>
