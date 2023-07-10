<script setup>
import IconClose from '@/components/icons/IconClose.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import { computed, onMounted, ref } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import IconComment from '@/components/icons/IconComment.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import { useUserStore } from '@/stores/user'
import { Form, Field } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'

const route = useRoute()
const props = defineProps(['closeViewQuote', 'id', 'movie', 'image', 'username'])
const emit = defineEmits(['editQuote'])
const quoteStore = useQuotesStore()
const userStore = useUserStore()
let path = import.meta.env.VITE_BACKEND_URL
const quote = computed(() => quoteStore.$state.quote)
const commentForm = computed(() => quoteStore.$state.addedComment)
const userId = computed(() => userStore.$state.user)
const moviesStore = useMoviesStore()
const src = ref('white')
const showAllcomments = ref(false)
const commenText = ref(0)

const toggleLike = async () => {
  if (src.value === 'white') {
    src.value = '#F3426C'
    await quoteStore.likeQuote(props.id, { user_id: userId.value.id }, 'movie')
  } else {
    src.value = 'white'
    await quoteStore.unlikeQuote(props.id, { user_id: userId.value.id }, 'movie')
  }
}

onMounted(async () => {
  try {
    await quoteStore.fetchQuote(props.id)
    const likedQuote = quote.value.likes.find((like) => like.user_id === userId.value.id)
    if (likedQuote) {
      src.value = '#F3426C'
    } else {
      src.value = 'white'
    }
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
    await quoteStore.addComment(data, props.id, 'movie')
  } catch (error) {
    console.log(error)
  }
}

const openEdit = async () => {
  props.closeViewQuote()
  emit('editQuote', props.id)
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

const uploadedImage = ref(
  props.image && props.image.startsWith('images') ? path + '/storage/' + props.image : props.image
)

const getImagePath = (image) => {
  return image && image.startsWith('images') ? path + '/storage/' + image : image
}

const displayedComments = computed(() => {
  return showAllcomments.value
})

const showComments = () => {
  showAllcomments.value = !showAllcomments.value
  if (commenText.value === 0) {
    commenText.value = 1
  } else {
    commenText.value = 0
  }
}
</script>

<template>
  <div
    class="h-auto top-0 w-full md:top-[8%] md:left-[35%] xl:left-[28%] 2xl:left-[24%] xl:w-[37.563rem] 2xl:w-60 absolute text-white bg-[#11101A] md:w-31.25 rounded-xl"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-1.5 px-3.5">
      <div class="w-5.625 h-10 flex items-center justify-between">
        <IconEdit @click="openEdit" class="cursor-pointer"></IconEdit>
        <div class="border-r border-r-[#6C757D] h-4"></div>
        <IconTrash @click="deleteQuote" class="cursor-pointer"></IconTrash>
      </div>
      <h1 class="text-2xl font-[500] hidden md:block">{{ $t('movie.view_quote') }}</h1>
      <IconClose @click="props.closeViewQuote"></IconClose>
    </div>
    <div class="p-2 gap-6 flex flex-col">
      <div class="flex items-center gap-4">
        <img
          class="bg-[#D9D9D9] rounded-full w-3.75 h-3.75 object-cover"
          alt="name"
          :src="uploadedImage"
        />
        <p class="text-xl">{{ props.username }}</p>
      </div>
      <div class="px-0.75 flex justify-between pt-0.5 border border-[#6C757DB2] h-5.375 rounded">
        <p class="text-base italic">"{{ quote.body && quote.body['en'] }}"</p>
        <p class="text-[#6C757D] text-base">Eng</p>
      </div>
      <div class="px-0.75 flex justify-between pt-0.5 border border-[#6C757DB2] h-5.375 rounded">
        <p class="text-base italic">"{{ quote.body && quote.body['ka'] }}"</p>
        <p class="text-[#6C757D] text-base">ქარ</p>
      </div>
      <img
        :src="path + '/storage/' + quote.image"
        class="w-22.375 h-18.875 rounded-xl self-center flex lg:w-56 lg:h-32.063 object-cover"
      />
      <div class="flex border-b border-color mt-[5.688] pb-1.5 text-xl">
        <div class="flex mr-1.5">
          <p>{{ quote.comments && quote.comments.length }}</p>
          <IconComment class="ml-0.75"></IconComment>
        </div>
        <div class="flex">
          <p>{{ quote.likes && quote.likes.length }}</p>
          <IconHeart
            class="ml-0.75 cursor-pointer"
            @click="toggleLike"
            :filled-color="src"
          ></IconHeart>
        </div>
        <button class="ml-2" @click="showComments">
          {{ commenText === 0 ? $t('feed.show_all_comments') : $t('feed.hide_comments') }}
        </button>
      </div>
      <div
        v-for="comment in (quote.comments || []).length > 2 && !displayedComments
          ? (quote.comments || []).slice(0, 2)
          : quote.comments || []"
        :key="comment.id"
        class="pt-0.5"
      >
        <div class="flex">
          <div class="flex w-full flex-col items-start mb-0.875">
            <div class="flex items-center mb-1">
              <img
                class="bg-[#D9D9D9] rounded-full w-10 h-10 mr-1.5"
                alt="name"
                :src="comment.user && getImagePath(comment.user.image)"
              />
              <p>{{ comment.user && comment.user.username }}</p>
            </div>
            <div class="border-b border-color pb-1.5 w-full">
              <p>
                {{ comment.body }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex items-center mr-0.75">
          <img class="bg-[#D9D9D9] rounded-full w-10 h-10" alt="name" :src="uploadedImage" />
        </div>
        <Form @submit="onSubmit" class="w-19.125 h-10 md:w-full">
          <Field
            class="bg-[#24222F] w-19.125 pl-1 h-10 rounded-lg md:w-full outline-none"
            :placeholder="$t('feed.write_comment')"
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
