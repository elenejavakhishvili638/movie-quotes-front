<script setup>
import { ref, onMounted, computed } from 'vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconPolygon from '@/components/icons/IconPolygon.vue'
import LanguageComponent from '@/components/LanguageComponent.vue'
import { useLoginStore } from '@/stores/login/index'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import ProfileSidebar from '@/components/ProfileSidebar.vue'
import IconChatQuote from '@/components/icons/IconChatQuote.vue'
import { useNotificationStore } from '@/stores/notification'
import IconFilledHeart from '@/components/icons/IconFilledHeart.vue'
import IconBell from '@/components/icons/IconBell.vue'
import profileImage from '@/assets/images/profile.png'

const props = defineProps(['searchBar', 'toggleSearch'])

const menuOpen = ref(false)
const loginStore = useLoginStore()
const router = useRouter()
const userStore = useUserStore()
const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.$state.notifications)
let path = import.meta.env.VITE_BACKEND_URL

onMounted(async () => {
  await notificationStore.fetchNotifications()
})

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
  notificationStore.toggleNotification()
}

const openMenu = () => {
  menuOpen.value = true
}

const closeMenu = () => {
  menuOpen.value = false
}

const read = async (id) => {
  try {
    await notificationStore.markAsRead(id)
    await notificationStore.fetchNotifications()
  } catch (error) {
    console.log(error)
  }
}

const readAll = async () => {
  try {
    await notificationStore.markAllAsRead()
    await notificationStore.fetchNotifications()
  } catch (error) {
    console.log(error)
  }
}

const unreadMessages = computed(() => {
  return notifications.value.filter((notification) => notification.read_at === null).length
})

const minutesAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const differenceInMilliseconds = now - date
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000)
  return differenceInMinutes
}

const getImagePath = (image) => {
  return image && image.startsWith('images') ? path + '/storage/' + image : image || profileImage
}
</script>

<template>
  <div
    class="bg-[#222030] h-[86px] flex justify-between items-center pl-[2rem] pr-[2rem] md:px-[4rem] top-0 sticky w-full"
  >
    <button @click="openMenu" class="cursor-pointer md:hidden">
      <IconMenu></IconMenu>
    </button>
    <p class="text-cream hidden md:block md:text-md uppercase">{{ $t('landing.title') }}</p>
    <div
      v-if="menuOpen"
      @click="closeMenu"
      class="absolute md:hidden left-0 top-0 w-24 h-41 bg-[#11101A] rounded-r-xl z-10"
    >
      <div class="text-white pt-[2.5rem] pl-[2.75rem]">
        <profile-sidebar :close="closeMenu">
          <button
            @click="logout"
            class="md:block mt-1.5 mr-2 justify-center items-center w-6 h-32 border border-white rounded text-white text-lg"
          >
            {{ $t('login.log_out') }}
          </button>
        </profile-sidebar>
      </div>
    </div>
    <div v-if="notificationStore.notificationOpen" class="text-white">
      <IconPolygon class="absolute right-[5.8rem] top-16 md:right-[19.5rem]"></IconPolygon>
      <div
        class="z-10 p-2 text-xl absolute mt-5.5 rounded-xl top-0 right-0 h-47 bg-black w-full md:w-[30rem] 2xl:w-60 md:right-16 px-9 pt-7 overflow-scroll"
      >
        <div class="flex justify-between text-white mb-4 items-center">
          <p class="text-xl md:text-3xl">{{ $t('notifications.notifications') }}</p>
          <p class="border-b text-sm md:text-xl cursor-pointer" @click="readAll">
            {{ $t('notifications.mark_all') }}
          </p>
        </div>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          @click="read(notification.id)"
          class="mt-2 flex border border-[#6C757D] p-1 rounded gap-3 md:justify-between cursor-pointer"
        >
          <div class="md:flex md:gap-6 md:items-center">
            <div class="flex flex-col items-center">
              <img
                :class="{ 'border-[#198754]': !notification.read_at }"
                class="bg-[#D9D9D9] rounded-full md:w-20 md:h-5 w-[3.75rem] h-[3.75rem] border-2 object-cover"
                alt="name"
                :src="
                  notification.actionUser &&
                  getImagePath(notification.actionUser && notification.actionUser.image)
                "
              />
              <p class="text-[#198754] md:hidden" v-if="!notification.read_at">
                {{ $t('notifications.new') }}
              </p>
            </div>
            <div class="md:block hidden">
              <p>{{ notification.actionUser && notification.actionUser.username }}</p>
              <div class="items-center gap-3 md:flex md:items-center">
                <IconFilledHeart v-if="notification.type === 'like'"></IconFilledHeart>
                <IconChatQuote v-else></IconChatQuote>
                <p class="text-[#CED4DA]">
                  {{
                    notification.type === 'like'
                      ? $t('notifications.liked')
                      : $t('notifications.commented')
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2 md:items-end">
            <p class="md:hidden text-xl">
              {{ notification.actionUser && notification.actionUser.username }}
            </p>
            <div class="flex items-center gap-3 md:hidden">
              <IconFilledHeart v-if="notification.type === 'like'"></IconFilledHeart>
              <IconChatQuote v-else></IconChatQuote>
              <p class="text-[#CED4DA] text-base">
                {{
                  notification.type === 'like'
                    ? $t('notifications.liked')
                    : $t('notifications.commented')
                }}
              </p>
            </div>
            <p class="text-[#D9D9D9] text-base md:text-xl">
              {{ minutesAgo(notification.created_at) }} {{ $t('notifications.ago') }}
            </p>
            <p class="text-[#198754] hidden md:block md:text-xl" v-if="!notification.read_at">
              {{ $t('notifications.new') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2 md:gap-10">
      <button
        v-if="props.searchBar"
        @click="props.toggleSearch"
        class="mr-5 cursor-pointer md:hidden mr-1"
      >
        <icon-search></icon-search>
      </button>
      <div class="relative cursor-pointer">
        <div
          class="absolute w-5 h-[1.25rem] md:w-[1.563rem] md:h-[1.563rem] bg-[#E33812] rounded-full left-3 bottom-4 md:left-4 md:bottom-5 flex items-center justify-center text-white text-sm md:text-base"
        >
          {{ unreadMessages }}
        </div>
        <icon-bell @click="toggleNotification()" class="md:h-8 md:w-[2rem]"></icon-bell>
      </div>
      <language-component type="feed"></language-component>
      <button
        @click="logout"
        class="hidden md:block mr-2 justify-center items-center w-[5rem] h-32 border border-white rounded text-white text-sm md:text-base"
      >
        {{ $t('login.log_out') }}
      </button>
    </div>
  </div>
</template>
