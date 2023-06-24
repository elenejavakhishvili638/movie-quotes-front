<script setup>
import { Form } from 'vee-validate'
import TheButton from '../components/TheButton.vue'
import TheInput from '../components/TheInput.vue'
import { useLoginStore } from '../stores/login/index'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import IconGoogle from "./icons/IconGoogle.vue"


const props = defineProps({
  closeLogin: Function,
  register: Function
})

const emit = defineEmits(['changeModal'])

const loginStore = useLoginStore()
const router = useRouter()
const errors = computed(() => loginStore.$state.errors)




const openModal = () => {
  emit('changeModal', 'forgot-password')
}

const openSignup = () => {
  props.closeLogin()
  props.register()
}

const onSubmit = async () => {
  try {
    await loginStore.loginUser(loginStore.$state.login)
    if (Object.keys(errors.value).length === 0) {
      props.closeLogin()
      router.push('/news-feed')
    }
  } catch (error) {
    console.error('Failed to login:', error)
  }
}

const googleSignIn = () => {
  loginStore.loginWithGoogle()
}

const formData = computed(() => loginStore.$state.login)
</script>

<template>
  <section @click.stop class="h-screen md:w-37.5 md:h-auto md:rounded-lg overflow-y-scroll">
    <div class="text-white flex flex-col px-2.75 items-center justify-center pt-4.563">
      <div class="text-center mb-2">
        <h1 class="text-2xl mb-0.75 font-medium">{{ $t('login.log_in') }}</h1>
        <p class="text-base text-[#6C757D] font-normal">{{ $t('login.text') }}</p>
      </div>
      <Form @submit="onSubmit" v-slot="{ meta }">
        <the-input
          v-model="formData.username"
          validate="required"
          name="username"
          type="text"
          :label="$t('login.email')"
          :placeholder="$t('login.email_placeholder')"
          :errors="errors"
        ></the-input>
        <the-input
          v-model="formData.password"
          validate="required"
          name="password"
          type="password"
          :label="$t('login.password')"
          :placeholder="$t('login.password_placeholder')"
          :errors="errors"
        ></the-input>
        <div class="w-22.5 flex justify-between mb-1">
          <div class="flex justify-center">
            <input type="checkbox" name="remember" />
            <label class="ml-0.5">{{ $t('login.remember_me') }}</label>
          </div>
          <p @click="openModal" class="text-[#0D6EFD] cursor-pointer border-b border-[#0D6EFD]">
            {{ $t('login.forgot_password') }}?
          </p>
        </div>
        <the-button :disabled="!meta.valid" >{{ $t('login.sign_in') }}</the-button>
      </Form>
      <button @click="googleSignIn" class="flex justify-center items-center  w-22.5 border border-white rounded-lg h-2.375">
        <IconGoogle class=" mr-0.5" ></IconGoogle> {{ $t('login.google') }}
      </button>
      <div class="mb-3.313 mt-2 flex items-center justify-center">
        <p class="text-[#6C757D]  mr-0.25">{{ $t('login.account') }}?</p>
        <p @click="openSignup" class="text-[#0D6EFD] border-b border-[#0D6EFD]">
          {{ $t('login.sign_up') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
