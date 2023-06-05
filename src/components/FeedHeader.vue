<script setup>
import { ref } from 'vue'
import menu from '../assets/images/logos/menu.png'
import bell from '../assets/images/logos/bell.png'
import search from '../assets/images/logos/search.png'
import arrow from '../assets/images/logos/arrow.png'
import polygon from '../assets/images/logos/polygon.png'
import home from '../assets/images/logos/home.png'
import movie from '../assets/images/logos/movie.png'
import LanguageComponent from './LanguageComponent.vue'
import { useLoginStore } from '../stores/login/index'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const props = defineProps(['searchBar'])

const searchOpen = ref(false)
const notificationOpen = ref(false)
const menuOpen = ref(false)
const loginStore = useLoginStore()
const router = useRouter()
const userStore = useUserStore()

const logout = async () => {
  try {
    await loginStore.logout()
    userStore.setLoggedOut(true)
    router.replace('/')
  } catch (error) {
    console.log(error)
  }
}

const toggleSearch = () => {
  searchOpen.value = true
}

const closeSearch = () => {
  searchOpen.value = false
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
        <div class="flex items-center mb-[40px]">
          <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
          <div class="flex flex-col ml-[16px]">
            <p>Maia Nakashidze</p>
            <p>Edit your profile</p>
          </div>
        </div>
        <div>
          <div class="flex items-center mb-[40px] gap-[30px]" @click="closeMenu">
            <img :src="home" />
            <router-link to="news-feed"> News feed </router-link>
          </div>
          <div class="flex items-center gap-[30px]">
            <img :src="movie" />
            <router-link to=""> List of movies </router-link>
          </div>
          <button
            @click="logout"
            class="md:block mt-[40px] mr-[8px] justify-center items-center w-72 h-32 border border-white rounded-[4px] text-white text-sm"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
    <div v-if="searchOpen" class="absolute top-0 left-0 h-[774px] bg-[#12101A] w-full">
      <div class="border-b border-[#EFEFEF]">
        <div class="my-[24px] ml-[32px] flex items-center">
          <img @click="closeSearch" :src="arrow" class="mr-[26px]" />
          <input placeholder="Search" class="bg-transparent outline-none" />
          <!-- <the-input class=" bg-transparent" placeholder="Search" ></the-input> -->
        </div>
      </div>
      <div class="text-[#CED4DA] text-base opacity-[0.6] mt-[26px] ml-[74px]">
        <p>Enter <span class="text-white opacity-[1] mb-[22px]">@</span> to search movies</p>
        <p>Enter @ to search movies</p>
      </div>
    </div>
    <div v-if="notificationOpen" class="text-white">
      <img class="absolute right-6 top-16 md:right-60" :src="polygon" />
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
        @click="toggleSearch"
        class="mr-[21px] cursor-pointer md:hidden"
      >
        <img :src="search" />
      </button>
      <button @click="toggleNotification" class="cursor-pointer"><img :src="bell" /></button>
      <language-component></language-component>
      <button
        @click="logout"
        class="hidden md:block mr-[8px] justify-center items-center w-72 h-32 border border-white rounded-[4px] text-white text-sm"
      >
        Log out
      </button>
    </div>
  </div>
</template>
