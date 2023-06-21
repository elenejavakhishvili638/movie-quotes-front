<script setup>
import { Form } from 'vee-validate'
import TheButton from '../components/TheButton.vue'
import TheInput from '../components/TheInput.vue'
import { useAuthStore } from '../stores/registration/index'
import google from '../assets/images/logos/google.png'
import { computed } from 'vue'

const props = defineProps({
  closeRegistration: Function,
  openModal: Function,
  login: Function
})

const authStore = useAuthStore()
const errors = computed(() => authStore.$state.errors)

const onSubmit = async () => {
  try {
    await authStore.registerUser(authStore.$state.form)
    console.log(errors.value)
    if (Object.keys(errors.value).length === 0) {
      props.openModal()
      props.closeRegistration()
    }
  } catch (error) {
    console.log(error)
  }
}

const openLogin = () => {
  props.closeRegistration()
  props.login()
}

const googleSignUp = () => {
  authStore.registerWithGoogle()
}

const formData = computed(() => authStore.$state.form)
</script>

<template>
  <section @click.stop class="h-screen md:w-[601px] md:h-auto md:rounded-[10px] overflow-scroll">
    <div class="text-white flex flex-col px-[44px] items-center justify-center pt-[73px]">
      <div class="text-center mb-[32px]">
        <h1 class="text-2xl mb-[12px] font-medium">{{ $t('registration.account') }}</h1>
        <p class="text-base text-[#6C757D] font-normal">{{ $t('registration.text') }}</p>
      </div>
      <Form @submit="onSubmit" v-slot="{ meta }">
        <the-input
          class="w-[360px]"
          v-model="formData.username"
          name="username"
          type="text"
          :label="$t('registration.name')"
          :placeholder="$t('registration.name_placeholder')"
          validate="required|minmax:3,15|lowercase_and_numbers_only"
        ></the-input>

        <the-input
          class="w-[360px]"
          v-model="formData.email"
          name="email"
          type="email"
          :label="$t('registration.email')"
          :placeholder="$t('registration.email_placeholder')"
          validate="required|email"
        ></the-input>

        <the-input
          class="w-[360px]"
          v-model="formData.password"
          name="password"
          type="password"
          :label="$t('registration.password')"
          :placeholder="$t('registration.password_placeholder')"
          validate="required|lowercase_and_numbers_only|minmax:8,15"
        ></the-input>

        <the-input
          class="w-[360px]"
          v-model="formData.password_confirmation"
          name="password_confirmation"
          type="password"
          :label="$t('registration.confirm_password')"
          :placeholder="$t('registration.confirm_password_placeholder')"
          validate="required|confirmed:password"
        ></the-input>
        <the-button type="submit" :disabled="!meta.valid">{{
          $t('registration.get_started')
        }}</the-button>
      </Form>
      <button
        @click="googleSignUp"
        class="flex justify-center items-center w-[360px] border border-white rounded-[8px] h-[38px]"
      >
        <img :src="google" class="mr-[8px]" /> {{ $t('registration.google') }}
      </button>
      <div class="mb-[53px] mt-[32px] flex items-center justify-center">
        <p class="text-[#6C757D] mr-[4px]">{{ $t('registration.have_account') }}</p>
        <p @click="openLogin" class="text-[#0D6EFD] border-b border-[#0D6EFD]">
          {{ $t('texts.log_in') }}
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
