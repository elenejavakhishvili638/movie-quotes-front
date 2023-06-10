<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useMoviesStore } from '../stores/movies/index'
import FeedHeader from '../components/FeedHeader.vue'
import { useLanguageStore } from '../stores/language/index'
import comment from '../assets/images/logos/comment.png'
import heart from '../assets/images/logos/heart.png'
import dots from '../assets/images/logos/dots.png'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import trash from '../assets/images/logos/trash.png'
import pencil from '../assets/images/logos/pencil.png'
import eye from '../assets/images/logos/eye.png'

const moviesStore = useMoviesStore()
const route = useRoute()
const router = useRouter()
const languageStore = useLanguageStore()
const openedModalId = ref(null)
const movie = computed(() => moviesStore.$state.movie)

const thisMovie = ref(null);
const imagePath = ref(null);
const imageUrl = ref(null);

onMounted(async () => {
  const id = route.params.id;
  thisMovie.value = await moviesStore.fetchMovie(id);
  
  if (movie.value && movie.value.image) {
    imagePath.value = movie.value.image;
    imageUrl.value = import.meta.env.VITE_BACKEND_URL + '/storage/' + imagePath.value;
    console.log(imageUrl.value);
  } else {
    console.log('Image path is undefined');
  }
});


const quotes = computed(() => movie.value.quotes)
const genres = computed(() => movie.value.genres)

const openModal = (id) => {
  if (openedModalId.value === id) {
    openedModalId.value = null
  } else {
    openedModalId.value = id
  }
}

const closeModal = () => {
  openedModalId.value = null
}

const deleteMovie = async () => {
  const id = route.params.id;
  try{
    await moviesStore.deleteMovie(id)
    // moviesStore.movieList = moviesStore.movieList.filter(movie => movie.id !== id)
    await moviesStore.fetchFullList()
    console.log(moviesStore.movieList)
    router.push({ name: 'movies' });
  }catch(err) {
    console.log(err)
  }
}

const language = computed(() => languageStore.currentLanguage)
</script>

<template>
  <div class="background min-h-screen pb-[32px]">
    <feed-header :searchBar="false"></feed-header>
    <div class="md:flex md:ml-[40px] lg:ml[70px]">
      <div class="hidden md:block text-white sm:w-[25%] lg:w-[17%]">
        <profile-sidebar></profile-sidebar>
      </div>
      <div class="flex flex-col mt-[39px] text-white relative">
        <h1 class="hidden md:block text-[24px] font-[500] mb-[33px] ml-[35px]">
          Movie description
        </h1>
        <div class="mx-[35px] pb-[32px] md:flex md:gap-[21px]">
          <div>
            <img
              :src="imageUrl"
              class="w-[358px] h-[302px] border border-[#DDCCAA] xl:w-[809px] xl:h-[441px] rounded-[12px] object-contain mb-[24px]"
            />
          </div>
          <div class="lg:min-w-[590px]">
            <div class="flex flex-col md:flex-row justify-between">
              <h1 class="text-[#DDCCAA] text-[24px] font-[700] md:max-w-[290px] mb-[10px]">
                {{ movie.title && movie.title[language] }}
                ({{ movie.year }})
              </h1>
              <div
                class="w-[144px] h-[40px] bg-[#24222F] rounded-[10px] flex items-center justify-between px-[27px]"
              >
                <img :src="pencil" />
                <div class="border-r border-r-[#6C757D] h-[16px]"></div>
                <img :src="trash" @click="deleteMovie" />
              </div>
            </div>
            <div class="flex gap-[8px] my-[24px]">
              <div class="px-[11px] py-[6px] bg-[#6C757D] rounded-[4px]" v-for="genre in genres" :key="genre.id">
                <p class="font-[700] text-[18px]">{{ genre.name }}</p>
              </div>
            </div>
            <p class="mb-[20px] text-[#CED4DA] text-[18px] font-[700]">
              Director:
              <span class="text-white font-[500]">{{
                movie.director && movie.director[language]
              }}</span>
            </p>
            <p class="font-normal text-[18px] text-[#CED4DA]">
              {{ movie.description && movie.description[language] }}
            </p>
          </div>
        </div>
        <div class="md:flex md:mb-[40px] items-center">
          <button
            class="mx-[35px] mb-[32px] md:mb-[0px] w-[127px] h-[38px] rounded-[4px] bg-red"
            @click="openMovie"
          >
            Add quote
          </button>
          <hr class="mx-[35px] md:hidden" />
          <div
            class="md:flex md:items-center md:border-l md:border-l-[#6C757D] md:pl-[16px] mx-[35px] mb-[35px] mt-[40px] md:mx-[0px] md:mb-[0px] md:mt-[0]"
          >
            <h1 class="text-[24px]">All Quotes</h1>
            <p class="text-base md:text-[24px] md:ml-[10px]">
              Total ({{ movie.quotes && movie.quotes.length }})
            </p>
          </div>
        </div>
        <div>
          <div
            v-for="(quote, index) in quotes"
            :key="quote.id"
            class="md:w-[600px] lg:w-[809px] bg-[#11101A] flex flex-col items-center px-[35px] mb-[37px] md:ml-[35px]"
          >
            <div
              class="relative border-b border-b-[#54535A] pb-[24px] mb-[19px] flex flex-col md:flex-row items-center md:w-full"
            >
              <img
                :src="quote.image"
                class="md:mr-[34px] md:w-[226px] h-[140px] w-[359px] mt-[20px] mb-[24px] rounded-[2px]"
              />
              <p class="italic text-[24px] text-center md:text-left">
                "{{ quote.body && quote.body[language] }}"
              </p>
              <img
                class="hidden md:block md:absolute right-0 top-6"
                :src="dots"
                @click="openModal(index)"
              />
            </div>
            <div
              v-if="index === openedModalId"
              @click="closeModal(index)"
              class="absolute right-96 h-[200px] w-[250px] rounded-[10px] bg-[#24222F] py-[32px] pl-[40px]"
            >
              <p class="flex gap-[10px] mb-[32px]"><img :src="eye" /> Vue Quote</p>
              <p class="flex gap-[10px] mb-[32px]"><img :src="pencil" /> Edit</p>
              <p class="flex gap-[10px] mb-[32px]"><img :src="trash" /> Delete</p>
            </div>
            <div class="flex justify-between items-center w-full mb-[20px]">
              <div class="flex">
                <div class="flex mr-[24px]">
                  <p>10</p>
                  <img class="ml-[12px]" :src="comment" />
                </div>
                <div class="flex">
                  <p>10</p>
                  <img class="ml-[12px]" :src="heart" />
                </div>
              </div>
              <img class="md:hidden" :src="dots" />
            </div>
          </div>
          <div></div>
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
