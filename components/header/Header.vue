<template>
  <div>
    <nav class="bg-primary text-white flex items-center p-4">
      <h1>UWI<span class="bold text-black">PHARM</span></h1>

      <ul class="text-bold flex px-10">
        <li><NuxtLink to="/" class="px-10">HOME</NuxtLink></li>
        <li><NuxtLink to="/store" class="px-10">STORE</NuxtLink></li>
        <li><NuxtLink to="/about" class="px-10">ABOUT</NuxtLink></li>
      </ul>

      <form @submit.prevent="search" class="pl-10 ml-5 w-3/4">
        <input
          type="text"
          class="rounded p-3 w-3/4 text-black"
          placeholder="Search for medicines in stock..."
          required
          v-model="searchObj.term"
        />
        <button class="border-2 p-3 rounded">GO</button>
      </form>
      
      <div class="flex w-1/4 px-10 items-center">
        <NuxtLink to="/login" v-show="!isAuthenticated">
        <img
          src="~assets/profile.png"
          alt=""
          class="pr-10"
          
        />
        </NuxtLink>
        <NuxtLink to="/profile" v-show="isAuthenticated">
        <img
          src="~assets/profile.png"
          alt=""
          class="pr-10"
          
        />
        </NuxtLink>
        <img src="~assets/basket.png" alt="" class="pr-10" @click="visibleCart = true"/>

        <button v-show="isAuthenticated" @click="logout">Logout</button>
      </div>

    </nav>

    <client-only>
      <slideout v-model="visibleCart" dock="right" title="Exit Panel">
        <Cart />
      </slideout>
    </client-only>
    
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  data() {
    return {
      visibleCart: false,
      searchObj: [],
    }
  },
  methods: {
    search() {
      this.$store.dispatch('search', this.searchObj)
    },
    logout() {
      this.$store.dispatch('auth/logout')
    }
  },
}
</script>
