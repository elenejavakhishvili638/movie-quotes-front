<script setup>
import { ref, computed } from 'vue'
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
import expiredIcon from '../assets/images/logos/expired.png'
import { useEmailStore } from '../stores/email/index'
import ForgotPassword from '../components/ForgotPassword.vue'
import ResetPassword from '../components/ResetPassword.vue'
import { useLanguageStore } from '../stores/language'

const route = useRoute()
const router = useRouter()
const store = useEmailStore()
const modalState = ref('login')
const modal = ref(null)
const languageStore = useLanguageStore()

const changeEmailValue = () => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      modal: 'false'
    }
  })
}

const openModal = (modalName) => {
  modal.value = modalName
  languageStore.show = false
}

const closeModal = () => {
  modal.value = null
}

const handleModalChange = (state) => {
  modalState.value = state
}

const resend = () => {
  store.resend()
}

const emailForPasswordReset = computed(() => store.email)
const emailVerified = computed(() => store.emailVerified)
const expired = computed(() => store.expired)
</script>

<template>
  <div>
    <form-layout :close="closeModal" v-if="modal === 'registration'">
      <the-registration
        :closeRegistration="closeModal"
        :openModal="() => openModal('showModal')"
        :login="() => openModal('login')"
      ></the-registration>
    </form-layout>
    <form-layout :close="closeModal" v-if="modal === 'showModal'">
      <the-modal :icon="email" :text="$t('modals.text')">
        <a
          :href="'mailto:' + email"
          class="text-center w-11.875 rounded-lg bg-red text-white h-2.375 pt-0.5"
          >{{ $t('modals.button') }}</a
        >
      </the-modal>
    </form-layout>
    <form-layout :close="closeModal" v-if="emailVerified">
      <the-modal :icon="verified" :header="$t('modals.header')" :text="$t('modals.text_two')">
        <router-link
          :to="{ name: 'feed' }"
          class="text-center w-11.875 rounded-lg bg-red text-white h-2.375 pt-0.5"
          >{{ $t('modals.button_two') }}</router-link
        >
      </the-modal>
    </form-layout>
    <form-layout :close="closeModal" v-if="expired">
      <the-modal
        :icon="expiredIcon"
        :header="$t('modals.header_four')"
        :text="$t('modals.text_five')"
      >
        <button
          class="text-cen ter w-11.875 rounded-lg bg-red text-white h-2.375 pt-0.25"
          @click="resend"
        >
          {{ $t('modals.button_four') }}
        </button>
      </the-modal>
    </form-layout>
    <form-layout :close="closeModal" v-if="modal === 'login'">
      <the-login
        v-if="modalState === 'login'"
        @changeModal="handleModalChange"
        :closeLogin="closeModal"
        :register="() => openModal('registration')"
      ></the-login>
      <forgot-password
        v-else-if="modalState === 'forgot-password'"
        @changeModal="handleModalChange"
        :closeLogin="closeModal"
        :openEmailForPassword="() => openModal('emailForPassword')"
      ></forgot-password>
    </form-layout>
    <form-layout :close="changeEmailValue" v-if="emailForPasswordReset">
      <reset-password
        @changeModal="handleModalChange"
        :showLogin="() => openModal('login')"
        :closeResetPassword="changeEmailValue"
        :openSuccessModal="() => openModal('openSuccessModal')"
      ></reset-password>
    </form-layout>
    <form-layout :close="closeSuccessModal" v-if="modal === 'openSuccessModal'">
      <the-modal :icon="verified" :header="$t('modals.header_two')" :text="$t('modals.text_three')">
        <p
          @click="() => openModal('login')"
          class="text-center w-11.875 rounded-lg bg-red text-white h-2.375 pt-0.5 cursor-pointer"
        >
          {{ $t('modals.button_three') }}
        </p>
      </the-modal>
    </form-layout>
    <form-layout :close="closeModal" v-if="modal === 'emailForPassword'">
      <the-modal
        :icon="email"
        :header="$t('modals.header_three')"
        :footer="$t('modals.footer')"
        :text="$t('modals.text_four')"
        :close="closeModal"
      >
        <a
          :href="'mailto:' + email"
          class="text-center w-11.875 rounded-lg bg-red text-white h-2.375 pt-0.5"
          >{{ $t('modals.button') }}</a
        >
      </the-modal>
    </form-layout>
    <div class="bg-background flex flex-col justify-between">
      <div class="pb-6.25 h-[53rem]">
        <the-header
          :register="() => openModal('registration')"
          :login="() => openModal('login')"
        ></the-header>
        <div class="mt-[16rem] flex flex-col items-center justify-center text-2xl break">
          <h1 class="text-cream text-center lg:text-6xl lg:w-43.938 lg:leading-[5.625rem] w-17.563">
            {{ $t('landing.text') }}
          </h1>
          <button
            @click="() => openModal('login')"
            class="text-xl mt-2 px-[0.563rem] py-[1.063rem] justify-center items-center flex w-[8.313rem] h-3 rounded text-white border-none bg-red"
          >
            {{ $t('texts.get_started') }}
          </button>
        </div>
      </div>
      <div
        :style="{ backgroundImage: `url(${image1})` }"
        class="flex h-31.25 lg:h-[75rem] bg-center md:bg-center bg-cover bg-no-repeat lg:pt-25.813 lg:pl-14.938 lg:justify-start lg:items-start justify-center items-center"
      >
        <div
          class="w-19.063 text-white lg:w-47.563 lg:leading-[4.688rem] text-xl lg:text-[3.125rem] font-bold"
        >
          <h1 class="mb-[0.625rem]">- “{{ $t('landing.quote_one') }}”</h1>
          <p class="text-base lg:text-3xl">{{ $t('landing.film_one') }}, 2014</p>
        </div>
      </div>
      <div
        :style="{ backgroundImage: `url(${image3})` }"
        class="flex h-31.25 lg:h-62.5 bg-center md:bg-center bg-cover md:bg-fixed bg-no-repeat lg:pt-25.813 lg:pl-14.938 lg:justify-start lg:items-start justify-center items-center"
      >
        <div
          class="w-19.063 text-white lg:w-47.563 lg:leading-[4.688rem] text-xl lg:text-[3.125rem] font-bold"
        >
          <h1 class="mb-[0.625rem]">- “{{ $t('landing.quote_two') }}”</h1>
          <p class="text-base lg:text-3xl">{{ $t('landing.film_two') }},2001</p>
        </div>
      </div>
      <div
        :style="{ backgroundImage: `url(${image2})` }"
        class="flex h-31.25 lg:h-62.5 bg-right md:bg-center bg-cover md:bg-fixed bg-no-repeat lg:pt-25.813 lg:pl-14.938 lg:justify-start lg:items-start justify-center items-center"
      >
        <div
          class="w-19.063 text-white lg:w-47.563 lg:leading-[4.688rem] text-xl lg:text-[3.125rem] font-bold"
        >
          <h1 class="mb-[0.625rem]">- “{{ $t('landing.quote_three') }}”</h1>
          <p class="text-base lg:text-3xl">{{ $t('landing.film_three') }},2003</p>
        </div>
      </div>
      <the-footer></the-footer>
    </div>
  </div>
</template>
