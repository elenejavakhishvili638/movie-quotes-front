<template>
  <section
    @click.stop
    class="h-screen md:w-[601px] md:h-auto md:rounded-[10px] flex flex-col justify-center"
  >
    <div class="text-white flex flex-col px-[44px] items-center justify-center pt-[73px]">
      <div class="text-center mb-[32px]">
        <h1 class="text-2xl mb-[12px] font-medium">Forgot Password?</h1>
        <p class="w-[274px] md:w-[313px] text-base text-[#6C757D] font-[14px]">
          Enter the email and we’ll send an email with instructions to reset your password
        </p>
      </div>
      <CustomForm>
        <the-input
          v-model="formData.email"
          validate="required|email"
          name="email"
          type="email"
          :label="$t('login.email')"
          :placeholder="$t('login.email_placeholder')"
        ></the-input>
      </CustomForm>
      <the-button @click="submit">Send instructions</the-button>
      <div
        @click="openModal"
        class="mb-[53px] gap-[11px] flex items-center justify-center text-[#6C757D] font-normal"
      >
        <img :src="back" />
        Back to log in
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
  setup(props, { emit }) {
    const passwordResetStore = usePasswordResetStore()

    const openModal = () => {
      emit('changeModal', 'login')
    }

    const submit = () => {
      console.log(passwordResetStore.$state)
    }
    return {
      openModal,
      back,
      formData: passwordResetStore.$state.verifyEmail,
      submit
    }
  }
}
</script>

<style scoped>
section {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
