<script setup>
import comment from '../assets/images/logos/comment.png'
import heart from '../assets/images/logos/heart.png'
import liked from '../assets/images/logos/liked.png'
import { Form, Field } from 'vee-validate'
import { useQuotesStore } from '../stores/quotes/index'
import { useUserStore } from '../stores/user'
import { computed, ref } from 'vue'

const props = defineProps(['quote', 'movie', 'user', 'poster', 'year', 'id', 'comments'])
const quoteStore = useQuotesStore()
const userStore = useUserStore()
const commentForm = computed(() => quoteStore.$state.addedComment)
const userId = computed(() => userStore.$state.user)
const src = ref(heart)

let path = import.meta.env.VITE_BACKEND_URL

const toggleLike = () => {
  if (src.value === heart) {
    src.value = liked
  } else {
    src.value = heart
  }
}

const onSubmit = async () => {
  try {
    const data = {
      body: commentForm.value.body,
      user_id: userId.value.id
    }
    commentForm.value.body = ''
    await quoteStore.addComment(data, props.id)
    await quoteStore.fetchFullList()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="bg-[#11101A] rounded-xl flex justify-center text-white mb-2 md:w-31 xl:w-59">
    <div class="w-22 my-1.5 md:w-28.25 xl:w-55.5">
      <div class="flex items-center mb-0.875">
        <img class="bg-[#D9D9D9] rounded-full w-10 h-10" alt="name" />
        <p class="ml-1">{{ props.user }}</p>
      </div>
      <div>
        <p class="mb-1">
          “{{ props.quote }}” movie - <span class="text-cream">{{ props.movie }}.</span> ({{
            props.year
          }})
        </p>
        <img
          :src="path + '/storage/' + props.poster"
          class="bg-[#D9D9D9] rounded-lg w-22 h-12.5 md:w-full md:h-31"
          alt="film"
        />
        <div class="flex my-[19px] border-b border-color pb-6 text-xl">
          <div class="flex mr-1.5">
            <p>{{ props.comments.length }}</p>
            <img class="ml-0.75" :src="comment" />
          </div>
          <div class="flex">
            <p>10</p>
            <img class="ml-0.75" :src="src" @click="toggleLike" />
          </div>
        </div>
      </div>
      <div v-for="comment in props.comments" :key="comment.id" class="pt-4 pb-6">
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
        <Form @submit="onSubmit" class="w-[306px] h-10 md:w-full">
          <Field
            class="bg-[#24222F] w-19 pl-4 h-10 rounded-lg md:w-full outline-none"
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
