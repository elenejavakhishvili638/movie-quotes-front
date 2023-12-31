<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import FeedHeader from '@/components/FeedHeader.vue'
import { useQuotesStore } from '@/stores/quotes/index'
import { onMounted, computed, ref, watch, onBeforeUnmount, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user/index'
import ProfileSidebar from '@/components/ProfileSidebar.vue'
import ThePost from '@/components/ThePost.vue'
import { useLanguageStore } from '@/stores/language/index'
import NewQuote from '@/components/NewQuote.vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import ModalLayout from '@/components/ModalLayout.vue'
import instantiatePusher from '@/helpers/instantiatePusher'
import { useRouter, useRoute } from 'vue-router'

const increaseSearch = ref(false)
const userStore = useUserStore()
const languageStore = useLanguageStore()
const searchTerm = ref('')
const quotesStore = useQuotesStore()
const searchOpen = ref(false)
const page = ref(1)
const router = useRouter()
const route = useRoute()

const user = computed(() => userStore.$state.user)

const handleScroll = async () => {
  const offset = 5
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - offset) {
    page.value++
    await quotesStore.fetchQuotes(searchTerm.value, page.value)
  }
}

const handleCommentSent = (data) => {
  let quote = quotesStore.state.find((q) => q.id === data.comment.quote_id)
  if (quote) {
    quote.comments.push(data.comment)
  }
}

const handleLikeSent = (data) => {
  let quote = quotesStore.state.find((q) => q.id === data.like.quote_id)
  let liked = quote.likes && quote.likes.find((like) => like.user_id === data.like.user_id)
  if (!liked) {
    quote.likes.push(data.like)
  }
}

const handleUnlikeSent = (data) => {
  let quote = quotesStore.state.find((q) => q.id === data.unlike.quote_id)
  if (quote) {
    const newList = quote.likes.filter((like) => like.id !== data.unlike.id)
    quote.likes = Array.from(newList)
  }
}

onMounted(async () => {
  instantiatePusher()
  await quotesStore.fetchQuotes(searchTerm.value, page.value)
  window.addEventListener('scroll', handleScroll)
  window.Echo.channel('comments').listen('CommentSent', handleCommentSent)
  window.Echo.channel('likes').listen('LikeSent', handleLikeSent)
  window.Echo.channel('unlikes').listen('UnlikeSent', handleUnlikeSent)
})
onUnmounted(() => {
  window.Echo.leaveChannel('comments')
  window.Echo.leaveChannel('likes')
  window.Echo.leaveChannel('unlikes')
  quotesStore.quoteList = []
  window.Echo.channel('comments').stopListening('CommentSent', handleCommentSent)
  window.Echo.channel('likes').stopListening('LikeSent', handleLikeSent)
  window.Echo.channel('unlikes').stopListening('UnlikeSent', handleUnlikeSent)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(searchTerm, (newTerm) => {
  page.value = 1
  quotesStore.fetchQuotes(newTerm, page.value)
})

const increase = () => {
  increaseSearch.value = !increaseSearch.value
}
const decrease = () => {
  increaseSearch.value = false
}

const openQuote = () => {
  router.push({ name: 'newQuote' })
}
const closeQuote = () => {
  router.back()
}

const addQuote = computed(() => route.path === '/news-feed/new-quote')

const toggleSearch = () => {
  searchOpen.value = true
}

const closeSearch = () => {
  searchOpen.value = false
}

const language = computed(() => languageStore.currentLanguage)
</script>

<template>
  <div class="background min-h-screen pb-2" @click="decrease">
    <modal-layout v-if="addQuote">
      <new-quote :image="user.image" :username="user.username" :closeQuote="closeQuote"></new-quote>
    </modal-layout>
    <feed-header :toggleSearch="toggleSearch" :searchBar="true"></feed-header>
    <div class="md:flex md:ml-2.5 lg:ml-4.5">
      <div class="hidden md:block text-white w-14.5">
        <profile-sidebar></profile-sidebar>
      </div>
      <div class="md:ml-6.25 2xl:ml-14.25 md:mt-1">
        <div class="h-6 md:h-3.25 flex items-center md:mb-2" @click.stop="increase">
          <div
            @click.stop="openQuote"
            :class="{
              'md:w-13.625 xl:w-13.625': increaseSearch,
              'md:w-22 xl:w-48.5': !increaseSearch
            }"
            class="md:items-center md:rounded-lg md:pl-1 text-white text-base flex ml-2.25 md:ml-[0px] cursor-pointer md:bg-[#24222F] md:h-3.25"
          >
            <icon-pencil class="mr-0.75"></icon-pencil>
            {{ $t('feed.new_quote') }}
          </div>

          <div
            :class="{ 'md:border-b pb-1 pt-0.25 md:w-16.125 xl:w-43': increaseSearch }"
            class="mr-[1.313rem] mr hidden md:flex md:ml-1.5 text-white"
            @click.stop="increase"
          >
            <icon-search class="mr-0.75 cursor-pointer"></icon-search>
            <input
              v-model="searchTerm"
              @input="fetchQuotes"
              :placeholder="
                increaseSearch ? $t('feed.search_by', { at: '@', hash: '#' }) : $t('feed.search')
              "
              class="bg-transparent outline-none w-5.688"
              :class="{ 'md:w-full': increaseSearch }"
            />
          </div>
          <div
            v-if="searchOpen"
            class="absolute top-0 left-0 h-48.5 bg-[#12101A] w-full text-white md:hidden"
          >
            <div class="border-b border-[#EFEFEF]">
              <div class="my-1.5 ml-2 flex items-center">
                <icon-arrow @click="closeSearch" class="mr-1.5 cursor-pointer"></icon-arrow>
                <input
                  :placeholder="$t('feed.search')"
                  v-model="searchTerm"
                  @input="fetchQuotes"
                  class="bg-transparent outline-none"
                />
              </div>
            </div>
            <div class="text-[#CED4DA] text-base opacity-[0.6] mt-1.5 ml-4.5">
              <p>{{ $t('feed.search_movie', { at: '@' }) }}</p>
              <p>{{ $t('feed.search_quote', { hash: '#' }) }}</p>
            </div>
          </div>
        </div>
        <div v-for="quote in quotesStore.state" :key="quote.id">
          <the-post
            :comments="quote.comments"
            :quote="quote.body && quote.body[language]"
            :movie="quote.movie && quote.movie.title && quote.movie.title[language]"
            :user="quote.user && quote.user.username"
            :userImage="quote.user && quote.user.image"
            :authImage="user.image"
            :user_id="quote.user && quote.user.id"
            :poster="quote.image"
            :year="quote.movie && quote.movie.year"
            :id="quote.id"
            :likes="quote.likes"
          ></the-post>
        </div>
      </div>
    </div>
  </div>
</template>
