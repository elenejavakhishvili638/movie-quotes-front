<script setup>
import { ref, watch, computed } from 'vue'
import TheFooter from '../components/TheFooter.vue'
import TheHeader from '../components/TheHeader.vue'
import image1 from '../assets/images/image1.png'
import image2 from '../assets/images/image2.png'
import image3 from '../assets/images/image3.png'
import TheRegistration from '../components/TheRegistration.vue'
import TheLogin from '../components/TheLogin.vue'
import FormLayout from '../components/FormLayout.vue'
import { useRoute, useRouter } from 'vue-router'
import TheModal from '../components/TheModal.vue'
import email from '../assets/images/logos/email.png'
import verified from '../assets/images/logos/verifed.png'
import { useEmailStore } from '../stores/email/index'
import ForgotPassword from '../components/ForgotPassword.vue'
import ResetPassword from '../components/ResetPassword.vue'

const route = useRoute()
const router = useRouter()
const showRegistration = ref(false)
const showLogin = ref(false)
const showModal = ref(false)
const successModal = ref(false)
const store = useEmailStore()
const modalState = ref('')
const emailForPassword = ref(false)

const changeEmailValue = () => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      modal: 'false'
    }
  })
}

const register = () => {
  showRegistration.value = true
}

const login = () => {
  showLogin.value = true
  modalState.value = 'login'
}

const closeRegistration = () => {
  showRegistration.value = false
}

const closeLogin = () => {
  showLogin.value = false
}

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const openSuccessModal = () => {
  successModal.value = true
}

const closeSuccessModal = () => {
  successModal.value = false
}

const openEmailForPassword = () => {
  emailForPassword.value = true
}

const closeEmailForPassword = () => {
  emailForPassword.value = false
}

const handleModalChange = (state) => {
  modalState.value = state
}

watch(
  () => route.params.modal,
  (modal) => {
    if (modal && window.innerWidth >= 768) {
      showRegistration.value = true
      showLogin.value = true
    } else {
      showRegistration.value = false
      showLogin.value = false
    }
  }
)

const emailForPasswordReset = computed(() => store.email)
const emailVerified = computed(() => store.emailVerified)
</script>

<template>
  <div>
    <form-layout :close="closeRegistration" v-if="showRegistration">
      <the-registration
        :closeRegistration="closeRegistration"
        :openModal="openModal"
        :login="login"
      ></the-registration>
    </form-layout>
    <form-layout :close="closeModal" v-if="showModal">
      <the-modal :icon="email" :text="$t('modals.text')">
        <a
          :href="'mailto:' + email"
          class="text-center w-[190px] rounded-[8px] bg-red text-white h-[38px] pt-[5px]"
          >{{ $t('modals.button') }}</a
        >
      </the-modal>
    </form-layout>
    <form-layout :close="closeModal" v-if="emailVerified">
      <the-modal :icon="verified" :header="$t('modals.header')" :text="$t('modals.text_two')">
        <router-link
        :to="{ name: 'feed' }"
          class="text-center w-[190px] rounded-[8px] bg-red text-white h-[38px] pt-[5px]"
          >{{ $t('modals.button_two') }}</router-link
        >
      </the-modal>
    </form-layout>
    <form-layout :close="closeLogin" v-if="showLogin">
      <the-login
        v-if="modalState === 'login'"
        @changeModal="handleModalChange"
        :closeLogin="closeLogin"
        :register="register"
      ></the-login>
      <forgot-password
        v-else-if="modalState === 'forgot-password'"
        @changeModal="handleModalChange"
        :closeLogin="closeLogin"
        :openEmailForPassword="openEmailForPassword"
      ></forgot-password>
    </form-layout>
    <form-layout :close="changeEmailValue" v-if="emailForPasswordReset">
      <reset-password
        @changeModal="handleModalChange"
        :showLogin="login"
        :closeResetPassword="changeEmailValue"
        :openSuccessModal="openSuccessModal"
      ></reset-password>
    </form-layout>
    <form-layout :close="closeSuccessModal" v-if="successModal">
      <the-modal :icon="verified" :header="$t('modals.header_two')" :text="$t('modals.text_three')">
        <p
          @click="login"
          class="text-center w-[190px] rounded-[8px] bg-red text-white h-[38px] pt-[5px]"
        >
          {{ $t('modals.button_three') }}
        </p>
      </the-modal>
    </form-layout>
    <form-layout :close="closeEmailForPassword" v-if="emailForPassword">
      <the-modal
        :icon="email"
        :header="$t('modals.header_three')"
        :footer="$t('modals.footer')"
        :text="$t('modals.text_four')"
        :close="closeEmailForPassword"
      >
        <a
          :href="'mailto:' + email"
          class="text-center w-[190px] rounded-[8px] bg-red text-white h-[38px] pt-[5px]"
          >{{ $t('modals.button') }}</a
        >
      </the-modal>
    </form-layout>
    <div class="bg-background flex flex-col justify-between">
      <div class="lg:pb-[212px] pb-[100px]">
        <the-header :register="register" :login="login"></the-header>
        <div class="mt-[136px] flex flex-col items-center justify-center text-2xl break">
          <h1
            class="text-cream text-center lg:text-[60px] lg:w-[703px] lg:leading-[90px] w-[281px]"
          >
            Find any quote in <br />
            millions of movie lines
          </h1>
          <button
            @click="login"
            class="mt-[32px] justify-center items-center flex w-109 h-38 rounded-[4px] text-white text-base border-none bg-red"
          >
            {{ $t('texts.get_started') }}
          </button>
        </div>
      </div>
      <div
        :style="{ backgroundImage: `url(${image1})` }"
        class="flex h-[500px] lg:h-[1200px] bg-center md:bg-center bg-cover bg-no-repeat lg:pt-[413px] lg:pl-[239px] lg:justify-start lg:items-start justify-center items-center"
      >
        <div
          class="w-[305px] text-white lg:w-[761px] lg:leading-[75px] text-xl lg:text-[50px] font-bold"
        >
          <h1 class="mb-[10px]">- “You have to leave somethig behind to go forward”</h1>
          <p class="text-base lg:text-[30px]">Interstellar, 2014</p>
        </div>
      </div>
      <div
        :style="{ backgroundImage: `url(${image3})` }"
        class="flex h-[500px] lg:h-[1000px] bg-center md:bg-center bg-cover bg-fixed bg-no-repeat lg:pt-[413px] lg:pl-[239px] lg:justify-start lg:items-start justify-center items-center"
      >
        <div
          class="w-[305px] text-white lg:w-[761px] lg:leading-[75px] text-xl lg:text-[50px] font-bold"
        >
          <h1 class="mb-[10px]">
            - “I think we’re just gonna have to be secretly in love with earch other and leave it
            that”
          </h1>
          <p class="text-base lg:text-[30px]">The Royal Tenenbaums,2001</p>
        </div>
      </div>
      <div
        :style="{ backgroundImage: `url(${image2})` }"
        class="flex h-[500px] lg:h-[1000px] bg-right md:bg-center bg-cover bg-fixed bg-no-repeat lg:pt-[413px] lg:pl-[239px] lg:justify-start lg:items-start justify-center items-center"
      >
        <div
          class="w-[305px] text-white lg:w-[761px] lg:leading-[75px] text-xl lg:text-[50px] font-bold"
        >
          <h1 class="mb-[10px]">
            - “I think we’re just gonna have to be secretly in love with earch other and leave it
            that”
          </h1>
          <p class="text-base lg:text-[30px]">The Royal Tenenbaums,2001</p>
        </div>
      </div>
      <the-footer></the-footer>
    </div>
  </div>
</template>
