<template>
  <div>
    <nav class="bg-primary text-white flex items-center p-4">
      <!-- Logo / Title -->
      <h1>UWI<span class="bold text-black">PHARM</span></h1>

      <!-- Page Nav links-->
      <ul class="text-bold flex px-10">
        <li><NuxtLink to="/" class="px-10">HOME</NuxtLink></li>
        <li><NuxtLink to="/store" class="px-10">STORE</NuxtLink></li>
        <li><NuxtLink to="/about" class="px-10">ABOUT</NuxtLink></li>
      </ul>

      <!-- search form -->
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
      
      <!-- User component management links-->
      <div class="flex w-1/4 px-10 items-center">
        <NuxtLink to="/login" v-show="!isAuthenticated">
        <img
          src="~assets/profile.png"
          alt=""
          class="pr-10"
        />
        </NuxtLink>
        <NuxtLink to="/profile"  v-if="user" v-show="isAuthenticated && user.role == 1">
        <img
          src="~assets/profile.png"
          alt=""
          class="pr-10"
          
        />
        </NuxtLink>
        
        <NuxtLink to="/dashboard" v-if="user" v-show="isAuthenticated && user.role == 2">
        <img
          src="~assets/profile.png"
          alt=""
          class="pr-10"
        />

        </NuxtLink>
        <img src="~assets/basket.png" alt="" class="pr-10" @click="visibleCart = true"/>

        <!-- on click, clears all user data and logs user out -->
        <button v-show="isAuthenticated" @click="logout">Logout</button>
      </div>

    </nav>
    <!-- slideout that shows cart, rendered on client-side only
    as it's vue and JS native -->
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
    user() {
      return this.$store.getters['auth/getUser']
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
  data() {
    return {
      visibleCart: false,
      searchObj: [],
    }
  },
  methods: {
    search() {
      this.$store.dispatch('searchProduct', this.searchObj)
      this.$router.push({
        name: 'search',
        query: { term: this.searchObj.term },
      })
    },
    logout() {
      this.$store.dispatch('auth/logout')
    }
  },
  created() {
    // Get user details every render to update any changes from server
    let isAuthenticated = this.$store.getters['auth/isAuthenticated']
    if (isAuthenticated) {
      this.$store.dispatch('auth/getUserDetails')
    }
  } 
}
</script>
