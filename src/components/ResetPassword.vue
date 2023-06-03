<template>
  <section
    @click.stop
    class="h-screen md:w-[601px] md:h-auto md:rounded-[10px] flex flex-col justify-center"
  >
    <div class="text-white flex flex-col px-[44px] items-center justify-center pt-[73px]">
      <div class="text-center mb-[32px]">
        <h1 class="text-2xl mb-[12px] font-medium">Create new password</h1>
        <p class="w-[274px] md:w-[313px] text-base text-[#6C757D] font-[14px]">
          Your new password must be different from previous used passwords
        </p>
      </div>
      <CustomForm @submit="onSubmit" v-slot="{ meta }">
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
        <the-button type="submit" :disabled="!meta.valid">Reset password</the-button>
      </CustomForm>
      <div
        @click="openModal"
        class="cursor-pointer mb-[53px] gap-[11px] flex items-center justify-center text-[#6C757D] font-normal"
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: {
    CustomForm: Form,
    TheButton,
    TheInput
  },
  props: ['showLogin', 'closeResetPassword'],
  setup(props) {
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
          email: route.query.email[0],
          token: route.params.token
        })
        console.log(passwordResetStore.$state.updatePassword)
        await passwordResetStore.updatePassword(formData.value)
      } catch (error) {
        console.error(error)
      }
    }
    return {
      openModal,
      back,
      formData: passwordResetStore.$state.updatePassword,
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
