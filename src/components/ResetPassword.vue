<script setup>
import { Form } from 'vee-validate'
import TheButton from './TheButton.vue'
import TheInput from './TheInput.vue'
import back from '../assets/images/logos/back.png'
import { usePasswordResetStore } from '../stores/UpdatePassword/index'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['showLogin', 'closeResetPassword', 'openSuccessModal'])

const passwordResetStore = usePasswordResetStore()

const openModal = () => {
  props.closeResetPassword()
  props.showLogin()
}

const route = useRoute()

const onSubmit = async () => {
  try {
    const formData = ref({
      password: passwordResetStore.$state.updatePassword.password,
      password_confirmation: passwordResetStore.$state.updatePassword.password_confirmation,
      email: route.query.email,
      token: route.params.token
    })
    await passwordResetStore.updatePassword(formData.value)
    props.closeResetPassword()
    props.openSuccessModal()
  } catch (error) {
    console.error(error)
  }
}

const formData = computed(() => passwordResetStore.$state.updatePassword)
</script>

<template>
  <section
    @click.stop
    class="h-screen md:w-[601px] md:h-auto md:rounded-[10px] flex flex-col justify-center"
  >
    <div class="text-white flex flex-col px-[44px] items-center justify-center pt-[73px]">
      <div class="text-center mb-[32px]">
        <h1 class="text-2xl mb-[12px] font-medium">{{ $t('updatePassword.header_two') }}</h1>
        <p class="w-[274px] md:w-[313px] text-base text-[#6C757D] font-[14px]">
          {{ $t('updatePassword.text_two') }}
        </p>
      </div>
      <Form @submit="onSubmit" v-slot="{ meta }">
        <the-input
          v-model="formData.password"
          name="password"
          type="password"
          :label="$t('registration.password')"
          :placeholder="$t('registration.password_placeholder')"
          validate="required|lowercase_and_numbers_only|minmax:8,15"
        ></the-input>

        <the-input
          v-model="formData.password_confirmation"
          name="password_confirmation"
          type="password"
          :label="$t('registration.confirm_password')"
          :placeholder="$t('registration.confirm_password_placeholder')"
          validate="required|confirmed:password"
        ></the-input>
        <the-button type="submit" :disabled="!meta.valid">{{
          $t('updatePassword.button_three')
        }}</the-button>
      </Form>
      <div
        @click="openModal"
        class="cursor-pointer mb-[53px] gap-[11px] flex items-center justify-center text-[#6C757D] font-normal"
      >
        <img :src="back" />
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