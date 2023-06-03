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
      <CustomForm @submit="onSubmit" v-slot="{ meta }">
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
      </CustomForm>
      <div
        @click="openModal"
        class="mb-[53px] gap-[11px] flex items-center justify-center text-[#6C757D] font-normal"
      >
        <img :src="back" />
        {{ $t('updatePassword.button_two') }}
      </div>
    </div>
  </section>
</template>

<script>
import { Form } from 'vee-validate'
import TheButton from './TheButton.vue'
import TheInput from './TheInput.vue'
import back from '../assets/images/logos/back.png'
import { usePasswordResetStore } from '../stores/UpdatePassword/index'

export default {
  components: {
    CustomForm: Form,
    TheButton,
    TheInput
  },
  props: ['closeLogin', 'openEmailForPassword'],
  setup(props, { emit }) {
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
    return {
      openModal,
      back,
      formData: passwordResetStore.$state.verifyEmail,
      onSubmit
    }
  }
}
</script>

<style scoped>
section {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
