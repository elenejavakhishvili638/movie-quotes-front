<script setup>
import { ref, computed } from 'vue'
import { useUpdateUserStore } from '../stores/updateUser/index'
import { Form, Field } from 'vee-validate'
import { useUserStore } from '../stores/user'
import TheInput from '../components/TheInput.vue'
import ProfileValidation from './ProfileValidation.vue'
import { useLanguageStore } from '../stores/language/index'
import { useNotificationStore } from '../stores/notification'
import IconTick from './icons/IconTick.vue'
import IconExit from './icons/IconExit.vue'

const props = defineProps(['username', 'email', 'google', 'user'])

const fileInput = ref(null)
const newUsername = ref(false)
const newEmail = ref(false)
const newPassword = ref(false)
const openButtons = ref(false)
const successModal = ref(false)
const userStore = useUserStore()
const updateUserStore = useUpdateUserStore()
const languageStore = useLanguageStore()
const formData = computed(() => updateUserStore.form)
let path = import.meta.env.VITE_BACKEND_URL
const notificationStore = useNotificationStore()

const imageUrl = ref(null)
const uploadedImageUrl = ref(
  props.user.image && props.user.image.startsWith('images')
    ? path + '/storage/' + props.user.image
    : props.user.image
)
const errors = computed(() => updateUserStore.$state.errors)

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = async (e) => {
  const file = e.target.files[0]
  imageUrl.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }

  try {
    const formData = new FormData()
    formData.append('_method', 'PATCH')
    formData.append('user_id', props.user.id)
    formData.append('image', imageUrl.value)
    await updateUserStore.updateUser(formData, props.user.id)
    successModal.value = true
    await userStore.fetchUser('edit')
  } catch (error) {
    console.log(error)
  }
}

const usernameMin = computed(
  () => formData.value.username.length >= 3 && formData.value.username.length <= 15
)

const passwordMin = computed(
  () => formData.value.password.length >= 8 && formData.value.password.length <= 15
)

const lowerCaseAndNumbersOnly = computed(() => {
  return /^[a-z0-9]+$/.test(formData.value.username)
})

const lowerCaseAndNumbersOnlyPass = computed(() => {
  return /^[a-z0-9]+$/.test(formData.value.password)
})

const cancelButtons = () => {
  newUsername.value = false
  newEmail.value = false
  newPassword.value = false
  openButtons.value = false
}

const openUsername = () => {
  newUsername.value = true
  openButtons.value = true
}

const openEmail = () => {
  newEmail.value = true
  openButtons.value = true
}

const openPassword = () => {
  newPassword.value = true
  openButtons.value = true
}

const onSubmit = async () => {
  let data = formData.value
  data._method = 'PATCH'

  Object.keys(data).forEach((key) => {
    if (data[key] === '') delete data[key]
  })

  await updateUserStore.updateUser(data, props.user.id)
  await userStore.fetchUser('edit')
  if (Object.keys(errors.value).length === 0) {
    successModal.value = true
    newUsername.value = false
    newEmail.value = false
    newPassword.value = false
    openButtons.value = false
  }
}

const closeSuccessModal = () => {
  successModal.value = false
}

const language = computed(() => languageStore.currentLanguage)
</script>

<template>
  <div>
    <div
      v-if="successModal"
      class="bg-lightGreen top-[38%] left-[43%] absolute z-10 w-26 h-14 flex items-center justify-around rounded"
    >
      <IconTick></IconTick>
      <p class="text-successGreen text-base">{{ $t('profile.changes_success') }}</p>
      <IconExit @click="closeSuccessModal" class="cursor-pointer"></IconExit>
    </div>
    <p class="ml-3.813 mb-7.938 mt-2 text-2xl font-medium">{{ $t('profile.profile') }}</p>
    <Form class="md:w-37.5 xl:w-62.375 bg-modal flex flex-col items-center" @submit="onSubmit">
      <div
        class="absolute flex flex-col items-center top-36"
        v-if="!notificationStore.notificationOpen"
      >
        <img
          :src="uploadedImageUrl"
          alt="pic"
          class="rounded-full bg-[#D9D9D9] h-11.75 w-11.75 mb-1.5 object-cover"
        />
        <input
          type="file"
          id="file-input"
          ref="fileInput"
          style="display: none"
          @change="onFileChange"
        />
        <p class="text-xl font-normal cursor-pointer" @click="triggerFileInput">
          {{ $t('profile.upload_photo') }}
        </p>
      </div>
      <div class="bg-modal">
        <div class="flex flex-col gap-14 pb-10 text-base">
          <div class="flex flex-col mt-12.313">
            <label class="mb-0.5">{{ $t('profile.username') }}</label>
            <div class="flex gap-8">
              <Field
                name="oldName"
                type="text"
                disabled
                :value="props.username"
                class="text-charcoal w-33 h-3 rounded px-0.5 py-1 outline-none bg-cyanBlue"
              />

              <button type="button" class="text-cyanBlue" @click="openUsername">
                {{ $t('profile.edit') }}
              </button>
            </div>
            <div v-if="newUsername" class="flex flex-col mt-3.5">
              <ProfileValidation
                :label="$t('profile.username_should_contain')"
                :condition-one="usernameMin"
                :condition-two="lowerCaseAndNumbersOnly"
                :condition-text-one="`3 ${$t('profile.more_chars')}`"
                :condition-text-two="`15 ${$t('profile.lowercase')}`"
              ></ProfileValidation>
              <the-input
                class="w-33 h-3"
                v-model="formData.username"
                name="username"
                type="text"
                :label="$t('profile.new_username')"
                validate="minmax:3,15|lowercase_and_numbers_only"
                :errors="errors"
              >
              </the-input>
            </div>
          </div>
          <div class="flex flex-col">
            <label class="mb-0.5">{{ $t('profile.email') }}</label>
            <div class="flex gap-8">
              <Field
                name="oldEmail"
                type="email"
                disabled
                :value="props.email"
                :readonly="props.google"
                class="text-charcoal w-33 h-3 rounded px-0.5 py-1 outline-none bg-cyanBlue"
              />
              <button type="button" class="text-cyanBlue" @click="openEmail" v-if="!props.google">
                {{ $t('profile.edit') }}
              </button>
            </div>
            <div v-if="newEmail" class="flex flex-col mt-3.5">
              <the-input
                class="w-33 h-3"
                v-model="formData.email"
                name="email"
                type="email"
                :label="$t('profile.new_email')"
                validate="email"
                :errors="errors"
              >
              </the-input>
            </div>
          </div>
          <div class="flex flex-col" v-if="!props.google">
            <label class="mb-0.5">{{ $t('profile.password') }}</label>
            <div class="flex gap-8">
              <Field
                name="oldPassword"
                disabled
                value="passwordpassword"
                type="password"
                class="text-charcoal w-33 h-3 rounded px-0.5 py-1 outline-none bg-cyanBlue"
              />
              <button type="button" class="text-cyanBlue" @click="openPassword">
                {{ $t('profile.edit') }}
              </button>
            </div>
            <div v-if="newPassword" class="flex flex-col mt-3.5 gap-12">
              <ProfileValidation
                :label="$t('profile.password_should_contain')"
                :condition-one="passwordMin"
                :condition-two="lowerCaseAndNumbersOnlyPass"
                :condition-text-one="`8 ${$t('profile.more_chars')}`"
                :condition-text-two="`15 ${$t('profile.more_chars')}`"
              ></ProfileValidation>
              <the-input
                class="w-33 h-3"
                v-model="formData.password"
                disabled
                name="password"
                type="password"
                :label="$t('profile.new_password')"
                validate="lowercase_and_numbers_only|minmax:8,15"
                :errors="errors"
              >
              </the-input>
              <the-input
                class="w-33 h-3"
                v-model="formData.password_confirmation"
                name="password_confirmation"
                type="password"
                :label="$t('profile.confirm_password')"
                validate="required|confirmed:@password"
                :errors="errors"
              >
              </the-input>
            </div>
          </div>
        </div>
      </div>
      <div v-if="openButtons" class="flex gap-7 self-end">
        <button class="text-xl text-cyanBlue" type="button" @click="cancelButtons">
          {{ $t('profile.cancel') }}
        </button>
        <button
          :class="{
            'text-sm': language === 'ka',
            'text-lg': language === 'en'
          }"
          type="submit"
          class="bg-red rounded px-1 py-0.25 h-3 w-[12rem]"
        >
          {{ $t('profile.save_changes') }}
        </button>
      </div>
    </Form>
  </div>
</template>
