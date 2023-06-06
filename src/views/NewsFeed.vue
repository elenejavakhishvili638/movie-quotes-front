<script setup>
import FormLayout from '../components/FormLayout.vue'
import TheButton from '../components/TheButton.vue'
import write from '../assets/images/logos/write.png'
import search from '../assets/images/logos/search.png'
import close from '../assets/images/logos/close.png'
import FeedHeader from '../components/FeedHeader.vue'
import { useQuotesStore } from '../stores/quotes/index'
import { onMounted, computed, ref } from 'vue'
import { useUserStore } from '../stores/user/index'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import ThePost from '../components/ThePost.vue'
import { useLanguageStore } from '../stores/language/index'

const increaseSearch = ref(false)
const addQuote = ref(false)
const userStore = useUserStore()
const languageStore = useLanguageStore()

const quotesStore = useQuotesStore()
onMounted(async () => {
  await quotesStore.fetchQuotes()
  console.log(quotesStore.quoteList)
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

const language = computed(() => languageStore.currentLanguage)
const user = computed(() => userStore.$state.user)
const quotes = computed(() => quotesStore.state)
</script>

<template>
  <div class="background min-h-screen pb-[32px]" @click="decrease">
    <!-- <p>news feed</p> -->
    <!-- <button @click="logout">logout</button> -->
    <form-layout v-if="addQuote">
      <div
        class="md:top-[8%] md:left-[35%] xl:left-[28%] 2xl:left-[24%] xl:w-[601px] 2xl:w-[961px] absolute text-white bg-[#11101A] h-[722px] w-[428px] rounded-[12px]"
      >
        <div
          class="flex items-center justify-between border-b border-[#EFEFEF33] py-[25px] px-[54px]"
        >
          <div></div>
          <h1>write new quote</h1>
          <img @click="closeQuote" :src="close" />
        </div>
        <div class="p-[35px]">
          <div class="flex items-center gap-[16px]">
            <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
            <p>{{ user.username }}</p>
          </div>
          <form class="flex flex-col mt-[37px] gap-[16px]">
            <textarea></textarea>
            <textarea></textarea>
            <input type="file" />
            <!-- select -->
            <p>movie</p>
            <the-button class="w-full">Post</the-button>
          </form>
        </div>
      </div>
    </form-layout>
    <feed-header :searchBar="true"></feed-header>
    <div class="md:flex md:ml-[40px] lg:ml-[70px]">
      <div class="hidden md:block text-white width-[233px]">
        <profile-sidebar></profile-sidebar>
      </div>
      <div class="md:ml-[100px] 2xl:ml-[228px] md:mt-[22px]">
        <div class="h-[96px] md:h-[52px] flex items-center md:mb-[32px]" @click.stop="increase">
          <div
            @click.stop="openQuote"
            :class="{
              'md:w-[218px] xl:w-[218px]': increaseSearch,
              'md:w-[350px] xl:w-[778px]': !increaseSearch
            }"
            class="md:items-center md:rounded-[10px] md:pl-[17px] text-white text-base flex ml-[36px] md:ml-0 cursor-pointer md:bg-[#24222F] md:h-[52px]"
          >
            <img :src="write" class="mr-[12px]" /> Write new quote
          </div>

          <div
            :class="{ 'md:border-b pb-[17px] pt-[5px] md:w-[258px] xl:w-[688px]': increaseSearch }"
            class="mr-[21px] hidden md:flex md:ml-[24px]"
            @click.stop="increase"
          >
            <img :src="search" class="mr-[16px]" />
            <input
              :placeholder="
                increaseSearch ? 'Enter @ to search movies, Enter # to search quotes ' : 'Search by'
              "
              class="bg-transparent outline-none w-[91px]"
              :class="{ 'md:w-full': increaseSearch }"
            />
          </div>
        </div>
        <div v-for="quote in quotes" :key="quote.id">
          <the-post
            :quote="quote.body && quote.body[language]"
            :movie="quote.movie && quote.movie.title && quote.movie.title[language]"
            :user="quote.movie && quote.movie.user && quote.movie.user.username"
            :poster="quote.image"
            :year="quote.movie && quote.movie.year"
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
