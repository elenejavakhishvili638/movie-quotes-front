<template>
  <div class="background min-h-screen pb-[32px]">
    <!-- <p>news feed</p> -->
    <!-- <button @click="logout">logout</button> -->
    <feed-header :logout="logout" :searchBar="true"></feed-header>
  </div>
</template>

<script>
import FeedHeader from '../components/FeedHeader.vue'
import { useLoginStore } from '../stores/login/index'

export default {
  components: { FeedHeader },
  setup() {
    const loginStore = useLoginStore()

    const logout = async () => {
      try {
        await loginStore.logout()
      } catch (error) {
        console.log(error)
      }
    }

    return {
      logout
    }
  }
}
</script>

<style scoped>
.background {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
