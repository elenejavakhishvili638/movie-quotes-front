<script setup>
import { ref } from 'vue'
import menu from '../assets/images/logos/menu.png'
import bell from '../assets/images/logos/bell.png'
import search from '../assets/images/logos/search.png'
import polygon from '../assets/images/logos/polygon.png'
import LanguageComponent from './LanguageComponent.vue'
import { useLoginStore } from '../stores/login/index'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import ProfileSidebar from './ProfileSidebar.vue'

const props = defineProps(['searchBar', 'toggleSearch'])

const notificationOpen = ref(false)
const menuOpen = ref(false)
const loginStore = useLoginStore()
const router = useRouter()
const userStore = useUserStore()

const logout = async () => {
  try {
    await loginStore.logout()
    userStore.setLoggedOut(true)
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error)
  }
}

const toggleNotification = () => {
  notificationOpen.value = !notificationOpen.value
}

const openMenu = () => {
  menuOpen.value = true
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<template>
  <div
    class="bg-[#22203033] h-[86px] flex justify-between items-center pl-9 pr-12 md:px-[4rem] top-0 sticky w-full"
  >
    <button @click="openMenu" class="cursor-pointer md:hidden"><img :src="menu" /></button>
    <p class="text-cream hidden md:block">MOVIE QUOTES</p>
    <div
      v-if="menuOpen"
      class="absolute md:hidden left-0 top-0 w-24 h-41 bg-[#11101A] rounded-r-xl"
    >
      <div class="text-white pt-10 pl-11">
        <profile-sidebar :close="closeMenu">
          <button
            @click="logout"
            class="md:block mt-10 mr-2 justify-center items-center w-72 h-32 border border-white rounded text-white text-sm"
          >
            {{ $t('login.log_out') }}
          </button>
        </profile-sidebar>
      </div>
    </div>
    <div v-if="notificationOpen" class="text-white">
      <img class="absolute right-[6.3rem] top-16 md:right-[17.5rem]" :src="polygon" />
      <div
        class="absolute mt-5.5 rounded-xl top-0 right-0 h-47 bg-black w-full md:w-26 2xl:w-60 md:right-16 px-9 pt-7"
      >
        <div class="flex justify-between text-white mb-4">
          <p>Notifications</p>
          <p class="border-b">Mark as all read</p>
        </div>
        <div class="mt-2 flex border border-[#6C757D] p-4 rounded">
          <div class="flex flex-col mr-3 items-center">
            <img class="bg-[#D9D9D9] rounded-full w-10 h-10" alt="name" />
            <p>new</p>
          </div>
          <div>
            <p>Nino tabagari</p>
            <p><img alt="img" /> Commented to your quote.</p>
            <p>5 in ago</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2 md:gap-10">
      <button
        v-if="props.searchBar"
        @click="props.toggleSearch"
        class="mr-5 cursor-pointer md:hidden"
      >
        <img :src="search" />
      </button>
      <button @click="toggleNotification" class="cursor-pointer"><img :src="bell" /></button>
      <language-component></language-component>
      <button
        @click="logout"
        class="hidden md:block mr-2 justify-center items-center w-[5rem] h-32 border border-white rounded text-white text-sm"
      >
        {{ $t('login.log_out') }}
      </button>
    </div>
  </div>
</template>
