<script setup>
import IconComment from './icons/IconComment.vue'
import IconHeart from "./icons/IconHeart.vue"
import { Form, Field } from 'vee-validate'
import { useQuotesStore } from '../stores/quotes/index'
import { useUserStore } from '../stores/user'
import { computed, onMounted, ref } from 'vue'
import { useNotificationStore } from '../stores/notification'

const props = defineProps([
  'quote',
  'movie',
  'user',
  'poster',
  'year',
  'id',
  'comments',
  'likes',
  'userImage',
  'user_id',
  'authImage'
])
const quoteStore = useQuotesStore()
const userStore = useUserStore()
const notificationStore = useNotificationStore()
const commentForm = computed(() => quoteStore.$state.addedComment)
const userId = computed(() => userStore.$state.user)
const src = ref('white')
const showAllcomments = ref(false)
const commenText = ref('Show all comments')

let path = import.meta.env.VITE_BACKEND_URL

onMounted(async () => {
  const likedQuote = props.likes.find((like) => like.user_id === userId.value.id)
  if (likedQuote) {
    src.value = '#F3426C'
  } else {
    src.value = 'white'
  }
})

const toggleLike = async () => {
  if (src.value === 'white') {
    src.value = '#F3426C'
    await quoteStore.likeQuote(props.id, { user_id: userId.value.id })
    const data = {
      quote_id: props.id,
      type: 'like'
    }
    await notificationStore.sendNotification(data, Number(props.user_id))
  } else {
    src.value = 'white'
    await quoteStore.unlikeQuote(props.id, { user_id: userId.value.id })
  }
}

const onSubmit = async () => {
  try {
    const data = {
      body: commentForm.value.body,
      user_id: userId.value.id
    }
    commentForm.value.body = ''
    const notifData = {
      quote_id: props.id,
      type: 'comment'
    }
    await quoteStore.addComment(data, props.id)
    await notificationStore.sendNotification(notifData, Number(props.user_id))
    await quoteStore.fetchFullList()
  } catch (error) {
    console.log(error)
  }
}
const uploadedImageUrl = ref(
  props.userImage && props.userImage.startsWith('images') 
    ? path + '/storage/' + props.userImage 
    : props.userImage
);

const authUserImage = ref(
  props.authImage && props.authImage.startsWith('images') 
    ? path + '/storage/' + props.authImage 
    : props.authImage
)

const getImagePath = (image) => {
  return image.startsWith('images') 
    ? path + '/storage/' + image
    : image;
}

const displayedComments = computed(() => {
  return showAllcomments.value ;
});

const showComments = () => {
  showAllcomments.value = !showAllcomments.value
  if(commenText.value === 'Show all comments') {
    commenText.value = "Hide comments"
  } else {
    commenText.value = "Show all comments"
  }
}
</script>

<template>
  <div class="bg-[#11101A] rounded-xl flex justify-center text-white mb-2 md:w-31 xl:w-59">
    <div class="w-22 my-1.5 md:w-28.25 xl:w-55.5">
      <div class="flex items-center mb-0.875">
        <img
          class="bg-[#D9D9D9] rounded-full w-10 h-10 object-cover"
          alt="name"
          :src="uploadedImageUrl"
        />
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
          class="bg-[#D9D9D9] rounded-lg w-22 h-12.5 md:w-full md:h-31 object-cover"
          alt="film"
        />
        <div class="flex my-1.25 border-b border-color pb-2 text-xl">
          <div class="flex mr-1.5">
            <p>{{ props.comments.length }}</p>
            <IconComment  class="ml-0.75"></IconComment>
          </div>
          <div class="flex">
            <p>{{ props.likes.length }}</p>
            <IconHeart class="ml-0.75" @click="toggleLike" :filled-color="src" ></IconHeart>
          </div>
          <button class=" ml-2" @click="showComments" >{{ commenText }}</button>
        </div>
      </div>
      <div v-for="comment in (displayedComments ? props.comments : props.comments.slice(0, 2))" :key="comment.id" >
        <div class="flex mt-2">
          <div class="flex w-full flex-col items-start mb-0.875">
            <div class="flex items-center mb-1">
              <img
                class="bg-[#D9D9D9] rounded-full w-10 h-10 mr-1.5 object-cover"
                alt="name"
                :src="comment.user && getImagePath(comment.user.image)"
              />
              <p>{{ comment.user && comment.user.username }}</p>
            </div>
            <div class="border-b border-color pb-2 w-full">
              <p>
                {{ comment.body }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex items-center mr-0.75">
          <img
            class="bg-[#D9D9D9] rounded-full w-10 h-10 object-cover"
            alt="name"
            :src="authUserImage"
          />
        </div>
        <Form @submit="onSubmit" class="w-19.125 h-10 md:w-full">
          <Field
            class="bg-[#24222F] w-19 pl-1 h-10 rounded-lg md:w-full outline-none"
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
