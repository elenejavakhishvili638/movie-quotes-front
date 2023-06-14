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

const props = defineProps(['closeViewQuote', 'id'])
const quoteStore = useQuotesStore()
const userStore = useUserStore()
let path = import.meta.env.VITE_BACKEND_URL
const quote = computed(() => quoteStore.$state.quote)
const commentForm = computed(() => quoteStore.$state.addedComment)
const userId = computed(() => userStore.$state.user)

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
    console.log(quoteStore.quote)
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
    // console.log(data, props.id)
    await quoteStore.addComment(data, props.id)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div
    class="h-auto z-10 w-full md:top-[8%] md:left-[35%] xl:left-[28%] 2xl:left-[24%] xl:w-[601px] 2xl:w-[961px] absolute text-white bg-[#11101A] md:w-[500px] rounded-[12px]"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-[25px] px-[32px]">
      <div class="w-[90px] h-[40px] flex items-center justify-between">
        <img :src="pencil" />
        <div class="border-r border-r-[#6C757D] h-[16px]"></div>
        <img :src="trash" />
      </div>
      <h1 class="text-[24px] font-[500] hidden md:block">View quote</h1>
      <img @click="props.closeViewQuote" :src="close" />
    </div>
    <div class="px-[32px] py-[32px] gap-[24px] flex flex-col">
      <div class="flex items-center gap-[16px]">
        <img class="bg-[#D9D9D9] rounded-full w-[60px] h-[60px]" alt="name" />
        <p class="text-[20px]">{{ quote.user && quote.user.username }}</p>
      </div>
      <div
        class="px-[13px] flex justify-between pt-[7px] border border-[#6C757DB2] h-[86px] rounded-[4px]"
      >
        <p class="text-[16px] italic">"{{ quote.body && quote.body['en'] }}"</p>
        <p class="text-[#6C757D] text-[16px]">Eng</p>
      </div>
      <div
        class="px-[13px] flex justify-between pt-[7px] border border-[#6C757DB2] h-[86px] rounded-[4px]"
      >
        <p class="text-[16px] italic">"{{ quote.body && quote.body['ka'] }}"</p>
        <p class="text-[#6C757D] text-[16px]">ქარ</p>
      </div>
      <img
        :src="path + '/storage/' + quote.image"
        class="w-[358px] h-[302px] rounded-[10px] self-center flex lg:w-[897px] lg:h-[513px]"
      />
      <div class="flex mt-[19px] border-b border-color pb-[26px] text-[20px]">
        <div class="flex mr-[24px]">
          <p>{{ quote.comments && quote.comments.length }}</p>
          <img class="ml-[12px]" :src="comment" />
        </div>
        <div class="flex">
          <p>10</p>
          <img class="ml-[12px]" :src="src" @click="toggleLike" />
        </div>
      </div>
      <div v-for="comment in quote.comments" :key="comment.id" class="pt-[16px">
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
            v-model="commentForm.body"
            rules="required"
          />
        </Form>
      </div>
    </div>
  </div>
</template>
