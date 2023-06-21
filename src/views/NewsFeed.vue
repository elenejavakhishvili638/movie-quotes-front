<script setup>
import write from '../assets/images/logos/write.png'
import search from '../assets/images/logos/search.png'
import FeedHeader from '../components/FeedHeader.vue'
import arrow from '../assets/images/logos/arrow.png'
import { useQuotesStore } from '../stores/quotes/index'
import { onMounted, computed, ref, watch, onBeforeUnmount, onUnmounted } from 'vue'
import { useUserStore } from '../stores/user/index'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import ThePost from '../components/ThePost.vue'
import { useLanguageStore } from '../stores/language/index'
import NewQuote from '../components/NewQuote.vue'
import instantiatePusher from '../helpers/instantiatePusher'

const increaseSearch = ref(false)
const addQuote = ref(false)
const userStore = useUserStore()
const languageStore = useLanguageStore()
const searchTerm = ref('')
const quotesStore = useQuotesStore()
const searchOpen = ref(false)
const page = ref(1)

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
  if (quote) {
    quote.likes.push(data.like)
  }
}

onMounted(async () => {
  await quotesStore.fetchQuotes(searchTerm.value, page.value)
  instantiatePusher()
  window.addEventListener('scroll', handleScroll)
  window.Echo.channel('comments').listen('CommentSent', handleCommentSent)
  window.Echo.channel('likes').listen('LikeSent', handleLikeSent)
})
onUnmounted(() => {
  window.Echo.leaveChannel('comments')
  window.Echo.leaveChannel('likes')
  quotesStore.quoteList = []
  window.Echo.channel('comments').stopListening('CommentSent', handleCommentSent)
  window.Echo.channel('likes').stopListening('LikeSent', handleLikeSent)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(searchTerm, (newTerm) => {
  page.value = 1
  quotesStore.fetchQuotes(newTerm, page.value)
})

const increase = () => {
  increaseSearch.value = true
}
const decrease = () => {
  increaseSearch.value = false
}
const openQuote = () => {
  addQuote.value = true
}
const closeQuote = () => {
  addQuote.value = false
}

const toggleSearch = () => {
  searchOpen.value = true
}

const closeSearch = () => {
  searchOpen.value = false
}

const language = computed(() => languageStore.currentLanguage)
</script>

<template>
  <div class="background min-h-screen pb-8" @click="decrease">
    <new-quote v-if="addQuote" :username="user.username" :closeQuote="closeQuote"></new-quote>
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
            class="md:items-center md:rounded-lg md:pl-4 text-white text-base flex ml-[36px] md:ml-[0px] cursor-pointer md:bg-[#24222F] md:h-3.25"
          >
            <img :src="write" class="mr-0.75" />{{ $t('feed.new_quote') }}
          </div>

          <div
            :class="{ 'md:border-b pb-4 pt-1 md:w-16.125 xl:w-43': increaseSearch }"
            class="mr-[1.313rem] mr hidden md:flex md:ml-1.5 text-white"
            @click.stop="increase"
          >
            <img :src="search" class="mr-0.75" />
            <input
              v-model="searchTerm"
              @input="fetchQuotes"
              :placeholder="
                increaseSearch ? $t('feed.search_by', { at: '@', hash: '#' }) : $t('feed.search')
              "
              class="bg-transparent outline-none w-[91px]"
              :class="{ 'md:w-full': increaseSearch }"
            />
          </div>
          <div
            v-if="searchOpen"
            class="absolute top-0 left-0 h-48.5 bg-[#12101A] w-full text-white md:hidden"
          >
            <div class="border-b border-[#EFEFEF]">
              <div class="my-1.5 ml-2 flex items-center">
                <img @click="closeSearch" :src="arrow" class="mr-1.5" />
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

<style scoped>
.background {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
