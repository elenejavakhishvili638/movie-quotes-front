<script setup>
import { Form } from 'vee-validate'
import TheButton from './TheButton.vue'
import TheInput from './TheInput.vue'
import IconBackVue from './icons/IconBack.vue'
import { usePasswordResetStore } from '../stores/UpdatePassword/index'
import { computed } from 'vue'

const props = defineProps(['closeLogin', 'openEmailForPassword'])

const emit = defineEmits(['changeModal'])

const passwordResetStore = usePasswordResetStore()

const openModal = () => {
  emit('changeModal', 'login')
}

const onSubmit = async () => {
  try {
    await passwordResetStore.sendEmail(passwordResetStore.$state.verifyEmail)
    props.openEmailForPassword()
    props.closeLogin()
  } catch (error) {
    console.error(error)
  }
}

const formData = computed(() => passwordResetStore.$state.verifyEmail)
</script>

<template>
  <section
    @click.stop
    class="h-screen md:w-[601px] md:h-auto md:rounded-[10px] flex flex-col justify-center"
  >
    <div class="text-white flex flex-col px-[44px] items-center justify-center pt-[73px]">
      <div class="text-center mb-[32px]">
        <h1 class="text-2xl mb-[12px] font-medium">{{ $t('updatePassword.header') }}</h1>
        <p class="w-[274px] md:w-[313px] text-base text-[#6C757D] font-[14px]">
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
        ></the-input>
        <the-button type="submit" :disabled="!meta.valid">{{
          $t('updatePassword.button')
        }}</the-button>
      </Form>
      <div
        @click="openModal"
        class="mb-[53px] gap-[11px] flex items-center justify-center text-[#6C757D] font-normal cursor-pointer"
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
