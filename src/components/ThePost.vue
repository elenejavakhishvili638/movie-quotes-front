<script setup>
import comment from '../assets/images/logos/comment.png'
import heart from '../assets/images/logos/heart.png'
import { Form, Field } from 'vee-validate'
import { useQuotesStore } from '../stores/quotes/index'
import { useUserStore } from '../stores/user'
import { computed } from 'vue'

const props = defineProps(['quote', 'movie', 'user', 'poster', 'year', 'id', 'comments'])
const quoteStore = useQuotesStore()
const userStore = useUserStore()
const quoteForm = computed(() => quoteStore.$state.addedComment)
const userI = computed(() => userStore.$state.user)

let path = import.meta.env.VITE_BACKEND_URL

const onSubmit = async () => {
  try {
    const data = {
      body: quoteForm.value.body,
      user_id: userI.value.id
    }
    quoteForm.value.body = ''
    // console.log(data, props.id)
    await quoteStore.addComment(data, props.id)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div
    class="bg-[#11101A] rounded-[12px] flex justify-center text-white mb-[32px] md:w-[500px] xl:w-[938px]"
  >
    <div class="w-[358px] my-[28px] md:w-[452px] xl:w-[890px]">
      <div class="flex items-center mb-[14px]">
        <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
        <p class="ml-[16px]">{{ props.user }}</p>
      </div>
      <div>
        <p class="mb-[16px]">
          “{{ props.quote }}” movie - <span class="text-cream">{{ props.movie }}.</span> ({{
            props.year
          }})
        </p>
        <img
          :src="path + '/storage/' + props.poster"
          class="bg-[#D9D9D9] rounded-[10px] w-[358px] h-[200px] md:w-full md:h-[501px]"
          alt="film"
        />
        <div class="flex my-[19px] border-b border-color pb-[26px]">
          <div class="flex mr-[24px]">
            <p>{{ props.comments.length }}</p>
            <img class="ml-[12px]" :src="comment" />
          </div>
          <div class="flex">
            <p>10</p>
            <img class="ml-[12px]" :src="heart" />
          </div>
        </div>
      </div>
      <div v-for="comment in props.comments" :key="comment.id" class="pt-[16px] pb-[24px]">
        <div class="flex">
          <div class="flex w-full flex-col items-start mb-[14px]">
            <div class="flex items-center mb-[24px]">
              <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px] mr-[24px]" alt="name" />
              <p>{{ comment.user && comment.user.username }}</p>
            </div>
            <div class="border-b border-color pb-[24px] w-full">
              <p>
                {{ comment.body }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex items-center mr-[12px]">
          <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
        </div>
        <Form @submit="onSubmit" class="w-[306px] h-[40px] md:w-full">
          <Field
            class="bg-[#24222F] w-[306px] pl-[16px] h-[40px] rounded-[10px] md:w-full outline-none"
            placeholder="Wrie a comment"
            name="comment"
            type="text"
            autocomplete="off"
            v-model="quoteForm.body"
            rules="required"
          />
        </Form>
      </div>
    </div>
  </div>
</template>
