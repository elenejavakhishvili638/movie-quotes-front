<script setup>
import { Form } from 'vee-validate'
import TheButton from '@/components/TheButton.vue'
import TheInput from '@/components/TheInput.vue'
import IconBackVue from '@/components/icons/IconBack.vue'
import { usePasswordResetStore } from '@/stores/UpdatePassword/index'
import { computed } from 'vue'

const props = defineProps(['closeLogin', 'openEmailForPassword'])

const emit = defineEmits(['changeModal'])

const passwordResetStore = usePasswordResetStore()
const errors = computed(() => passwordResetStore.$state.errors)

const openModal = () => {
  emit('changeModal', 'login')
}

const onSubmit = async () => {
  try {
    passwordResetStore.errors = {}
    await passwordResetStore.sendEmail(passwordResetStore.$state.verifyEmail)
    if (Object.keys(errors.value).length === 0) {
      props.closeLogin()
      props.openEmailForPassword()
    }
  } catch (error) {
    console.error(error)
  }
}

const formData = computed(() => passwordResetStore.$state.verifyEmail)
</script>

<template>
  <section
    @click.stop
    class="h-screen md:w-37.5 md:h-auto md:rounded-lg flex flex-col justify-center"
  >
    <div class="text-white flex flex-col px-2.75 items-center justify-center pt-4.563">
      <div class="text-center mb-2">
        <h1 class="text-2xl mb-0.75 font-medium">{{ $t('updatePassword.header') }}</h1>
        <p class="w-17.125 md:w-19.563 text-base text-[#6C757D]">
          {{ $t('updatePassword.text') }}
        </p>
      </div>
      <Form @submit="onSubmit" v-slot="{ meta }">
        <the-input
          v-model="formData.email"
          validate="required|email"
          name="email"
          type="email"
          :label="$t('login.email')"
          :placeholder="$t('login.email_placeholder')"
          :errors="errors"
        ></the-input>
        <the-button type="submit" :disabled="!meta.valid">{{
          $t('updatePassword.button')
        }}</the-button>
      </Form>
      <div
        @click="openModal"
        class="mb-3.313 gap-3 flex items-center justify-center text-[#6C757D] font-normal cursor-pointer"
      >
        <IconBackVue></IconBackVue>
        {{ $t('updatePassword.button_two') }}
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
