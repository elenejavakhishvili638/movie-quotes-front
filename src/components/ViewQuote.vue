<script setup>
import trash from '../assets/images/logos/trash.png'
import pencil from '../assets/images/logos/pencil.png'
import close from '../assets/images/logos/close.png'
import { computed, onMounted, ref } from 'vue'
import { useQuotesStore } from '../stores/quotes'
import comment from '../assets/images/logos/comment.png'
import heart from '../assets/images/logos/heart.png'
import liked from '../assets/images/logos/liked.png'
import { useUserStore } from '../stores/user'
import { Form, Field } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useMoviesStore } from '../stores/movies'

const route = useRoute()
const props = defineProps(['closeViewQuote', 'id', 'movie'])
const quoteStore = useQuotesStore()
const userStore = useUserStore()
let path = import.meta.env.VITE_BACKEND_URL
const quote = computed(() => quoteStore.$state.quote)
const commentForm = computed(() => quoteStore.$state.addedComment)
const userId = computed(() => userStore.$state.user)
const moviesStore = useMoviesStore()
const src = ref(heart)

const toggleLike = () => {
  if (src.value === heart) {
    src.value = liked
  } else {
    src.value = heart
  }
}

onMounted(async () => {
  try {
    await quoteStore.fetchQuote(props.id)
  } catch (error) {
    console.log(error)
  }
})

const onSubmit = async () => {
  try {
    const data = {
      body: commentForm.value.body,
      user_id: userId.value.id
    }
    commentForm.value.body = ''
    await quoteStore.addComment(data, props.id)
  } catch (error) {
    console.log(error)
  }
}

const deleteQuote = async () => {
  try {
    await quoteStore.deleteQuote(props.id)
    const movieId = route.params.id
    await moviesStore.updateMovie(movieId)
    props.closeViewQuote()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div
    class="h-auto top-[0.625rem] w-full md:top-[8%] md:left-[35%] xl:left-[28%] 2xl:left-[24%] xl:w-[37.563rem] 2xl:w-60 absolute text-white bg-[#11101A] md:w-31.25 rounded-xl"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-6 px-8">
      <div class="w-5.625 h-10 flex items-center justify-between">
        <img :src="pencil" />
        <div class="border-r border-r-[#6C757D] h-4"></div>
        <img :src="trash" @click="deleteQuote" />
      </div>
      <h1 class="text-2xl font-[500] hidden md:block">View quote</h1>
      <img @click="props.closeViewQuote" :src="close" />
    </div>
    <div class="p-8 gap-6 flex flex-col">
      <div class="flex items-center gap-4">
        <img class="bg-[#D9D9D9] rounded-full w-3.75 h-3.75" alt="name" />
        <p class="text-xl">{{ quote.user && quote.user.username }}</p>
      </div>
      <div class="px-3 flex justify-between pt-2 border border-[#6C757DB2] h-5.375 rounded">
        <p class="text-base italic">"{{ quote.body && quote.body['en'] }}"</p>
        <p class="text-[#6C757D] text-base">Eng</p>
      </div>
      <div class="px-3 flex justify-between pt-2 border border-[#6C757DB2] h-5.375 rounded">
        <p class="text-base italic">"{{ quote.body && quote.body['ka'] }}"</p>
        <p class="text-[#6C757D] text-base">ქარ</p>
      </div>
      <img
        :src="path + '/storage/' + quote.image"
        class="w-22.375 h-18.875 rounded-xl self-center flex lg:w-56 lg:h-32"
      />
      <div class="flex border-b border-color mt-[5.688] pb-6 text-xl">
        <div class="flex mr-1.5">
          <p>{{ quote.comments && quote.comments.length }}</p>
          <img class="ml-0.75" :src="comment" />
        </div>
        <div class="flex">
          <p>10</p>
          <img class="ml-0.75" :src="src" @click="toggleLike" />
        </div>
      </div>
      <div v-for="comment in quote.comments" :key="comment.id" class="pt-4">
        <div class="flex">
          <div class="flex w-full flex-col items-start mb-0.875">
            <div class="flex items-center mb-1.5">
              <img class="bg-[#D9D9D9] rounded-full w-10 h-10 mr-1.5" alt="name" />
              <p>{{ comment.user && comment.user.username }}</p>
            </div>
            <div class="border-b border-color pb-6 w-full">
              <p>
                {{ comment.body }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex items-center mr-0.75">
          <img class="bg-[#D9D9D9] rounded-full w-10 h-10" alt="name" />
        </div>
        <Form @submit="onSubmit" class="w-19.125 h-10 md:w-full">
          <Field
            class="bg-[#24222F] w-19.125 pl-[16px] h-10 rounded-lg md:w-full outline-none"
            placeholder="Wrie a comment"
            name="comment"
            type="text"
            autocomplete="off"
            v-model="commentForm.body"
            rules="required"
          />
        </Form>
      </div>
    </div>
  </div>
</template>
