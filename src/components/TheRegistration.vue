<script setup>
import { Form } from 'vee-validate'
import TheButton from '../components/TheButton.vue'
import TheInput from '../components/TheInput.vue'
import { useAuthStore } from '../stores/registration/index'
import IconGoogle from './icons/IconGoogle.vue'
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
  <section @click.stop class="h-screen md:w-37.5 md:h-auto md:rounded-lg overflow-scroll">
    <div class="text-white flex flex-col px-2.75 items-center justify-center pt-4.563">
      <div class="text-center mb-2">
        <h1 class="text-2xl mb-0.75 font-medium">{{ $t('registration.account') }}</h1>
        <p class="text-base text-[#6C757D] font-normal">{{ $t('registration.text') }}</p>
      </div>
      <Form @submit="onSubmit" v-slot="{ meta }">
        <the-input
          v-model="formData.username"
          name="username"
          type="text"
          :label="$t('registration.name')"
          :placeholder="$t('registration.name_placeholder')"
          validate="required|minmax:3,15|lowercase_and_numbers_only"
          :errors="errors"
        ></the-input>

        <the-input
          v-model="formData.email"
          name="email"
          type="email"
          :label="$t('registration.email')"
          :placeholder="$t('registration.email_placeholder')"
          validate="required|email"
          :errors="errors"
        ></the-input>

        <the-input
          v-model="formData.password"
          name="password"
          type="password"
          :label="$t('registration.password')"
          :placeholder="$t('registration.password_placeholder')"
          validate="required|lowercase_and_numbers_only|minmax:8,15"
          :errors="errors"
        ></the-input>

        <the-input
          v-model="formData.password_confirmation"
          name="password_confirmation"
          type="password"
          :label="$t('registration.confirm_password')"
          :placeholder="$t('registration.confirm_password_placeholder')"
          validate="required|confirmed:password"
          :errors="errors"
        ></the-input>
        <the-button type="submit" :disabled="!meta.valid">{{
          $t('registration.get_started')
        }}</the-button>
      </Form>
      <button
        @click="googleSignUp"
        class="flex justify-center items-center w-22.5 border border-white rounded-lg h-2.375"
      >
        <IconGoogle class="mr-0.5"></IconGoogle>
        {{ $t('registration.google') }}
      </button>
      <div class="mb-3.313 mt-2 flex items-center justify-center">
        <p class="text-[#6C757D] mr-0.25">{{ $t('registration.have_account') }}</p>
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
