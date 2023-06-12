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
    class="bg-[#22203033] h-[86px] flex justify-between items-center pl-[36px] pr-[50px] md:px-[69px]"
  >
    <button @click="openMenu" class="cursor-pointer md:hidden"><img :src="menu" /></button>
    <p class="text-cream hidden md:block">MOVIE QUOTES</p>
    <div
      v-if="menuOpen"
      class="absolute md:hidden left-0 top-0 w-[382px] h-[658px] bg-[#11101A] rounded-r-[12px]"
    >
      <div class="text-white pt-[40px] pl-[45px]">
        <profile-sidebar :close="closeMenu">
          <button
            @click="logout"
            class="md:block mt-[40px] mr-[8px] justify-center items-center w-72 h-32 border border-white rounded-[4px] text-white text-sm"
          >
            {{ $t('login.log_out') }}
          </button>
        </profile-sidebar>
      </div>
    </div>
    <div v-if="notificationOpen" class="text-white">
      <img class="absolute right-[6.3rem] top-16 md:right-[17.5rem]" :src="polygon" />
      <div
        class="absolute mt-[86px] rounded-[12px] top-[0] right-0 h-[750px] bg-black w-full md:w-[428px] 2xl:w-[961px] md:right-16 px-[35px] pt-[27px]"
      >
        <div class="flex justify-between text-white mb-[16px]">
          <p>Notifications</p>
          <p class="border-b">Mark as all read</p>
        </div>
        <div class="mt-8px flex border border-[#6C757D] p-[16px] rounded-[4px]">
          <div class="flex flex-col mr-[12px] items-center">
            <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
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
    <div class="flex items-center md:gap-[40px]">
      <button
        v-if="props.searchBar"
        @click="props.toggleSearch"
        class="mr-[21px] cursor-pointer md:hidden"
      >
        <img :src="search" />
      </button>
      <button @click="toggleNotification" class="cursor-pointer"><img :src="bell" /></button>
      <language-component></language-component>
      <button
        @click="logout"
        class="hidden md:block mr-[8px] justify-center items-center w-[80px] h-32 border border-white rounded-[4px] text-white text-sm"
      >
        {{ $t('login.log_out') }}
      </button>
    </div>
  </div>
</template>
