<template>
  <section @click.stop class="h-screen md:w-[601px] md:h-auto md:rounded-[10px]">
    <div class="text-white flex flex-col px-[44px] items-center justify-center pt-[73px]">
      <div class="text-center mb-[32px]">
        <h1 class="text-2xl mb-[12px] font-medium">{{ $t('login.log_in') }}</h1>
        <p class="text-base text-[#6C757D] font-normal">{{ $t('login.text') }}</p>
      </div>
      <CustomForm @submit="onSubmit" v-slot="{ meta }">
        <the-input
          v-model="formData.username"
          validate="required"
          name="username"
          type="text"
          :label="$t('login.email')"
          :placeholder="$t('login.email_placeholder')"
        ></the-input>
        <the-input
          v-model="formData.password"
          validate="required"
          name="password"
          type="password"
          :label="$t('login.password')"
          :placeholder="$t('login.password_placeholder')"
        ></the-input>
        <div class="w-[360px] flex justify-between mb-[16px]">
          <div class="flex justify-center">
            <input type="checkbox" name="remember" />
            <label class="ml-[8px]">{{ $t('login.remember_me') }}</label>
          </div>
          <p @click="openModal" class="text-[#0D6EFD] cursor-pointer border-b border-[#0D6EFD]">
            {{ $t('login.forgot_password') }}?
          </p>
        </div>
        <the-button :disabled="!meta.valid">{{ $t('login.sign_in') }}</the-button>
      </CustomForm>
      <button @click="googleSignIn" class="w-[360px] border border-white rounded-[8px] h-[38px]">
        G {{ $t('login.google') }}
      </button>
      <div class="mb-[53px] mt-[32px] flex items-center justify-center">
        <p class="text-[#6C757D] mr-[4px]">{{ $t('login.account') }}?</p>
        <p @click="openSignup" class="text-[#0D6EFD] border-b border-[#0D6EFD]">
          {{ $t('login.sign_up') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { Form } from 'vee-validate'
import TheButton from '../components/TheButton.vue'
import TheInput from '../components/TheInput.vue'
import { useLoginStore } from '../stores/login/index'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import FormLayout from '../components/FormLayout.vue'
import TheModal from '../components/TheModal.vue'

export default {
  setup(props, { emit }) {
    const loginStore = useLoginStore()
    const router = useRouter()
    const showModal = ref(false)

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
        props.closeLogin()
        router.push('/news-feed')
      } catch (error) {
        console.error('Failed to login:', error)
      }
    }

    const googleSignIn = () => {
      loginStore.loginWithGoogle()
    }
    return {
      loginStore,
      onSubmit,
      formData: loginStore.$state.login,
      googleSignIn,
      showModal,
      openModal,
      FormLayout,
      TheModal,
      openSignup
    }
  },
  components: {
    CustomForm: Form,
    TheInput,
    TheButton
  },
  props: ['closeLogin', 'register']
}
</script>

<style scoped>
section {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
