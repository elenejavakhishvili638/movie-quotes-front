<script setup>
import { ref, computed } from 'vue'
import { useUpdateUserStore } from '../stores/updateUser/index'
import { Form, Field } from 'vee-validate'
import { useUserStore } from '../stores/user'
import TheInput from '../components/TheInput.vue'
import ProfileValidation from './ProfileValidation.vue'
import { useLanguageStore } from '../stores/language/index'

const props = defineProps(['username', 'email', 'google', 'user'])

const fileInput = ref(null)
const newUsername = ref(false)
const newEmail = ref(false)
const newPassword = ref(false)
const openButtons = ref(false)
const userStore = useUserStore()
const updateUserStore = useUpdateUserStore()
const languageStore = useLanguageStore()
const formData = computed(() => updateUserStore.form)
let path = import.meta.env.VITE_BACKEND_URL

const imageUrl = ref(null)
const uploadedImageUrl =  ref(
  props.user.image && props.user.image.startsWith('images') 
    ? path + '/storage/' + props.user.image 
    : props.user.image
);
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

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }
    await updateUserStore.updateUser(formData, props.user.id)
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
  newUsername.value = false
  newEmail.value = false
  newPassword.value = false
  openButtons.value = false
}

const language = computed(() => languageStore.currentLanguage)
</script>

<template>
  <div class="relative">
    <p class="ml-3.813 mb-7.938 mt-2 text-2xl font-medium">My profile</p>
    <Form class="md:w-37.5 xl:w-62.375 bg-[#11101A] flex flex-col items-center" @submit="onSubmit">
      <div class="absolute flex flex-col items-center top-20">
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
        <p class="text-xl font-normal" @click="triggerFileInput">Upload new photo</p>
      </div>
      <div class="bg-[#11101A]">
        <div class="flex flex-col gap-14 pb-10 text-base">
          <div class="flex flex-col mt-12.313">
            <label class="mb-0.5">Username</label>
            <div class="flex gap-8">
              <Field
                name="oldName"
                type="text"
                disabled
                :value="props.username"
                class="text-[#212529] w-33 h-3 rounded px-0.5 py-1 outline-none bg-[#CED4DA]"
              />

              <button type="button" class="text-[#CED4DA]" @click="openUsername">Edit</button>
            </div>
            <div v-if="newUsername" class="flex flex-col mt-3.5">
              <ProfileValidation
                label="Username should contain:"
                :condition-one="usernameMin"
                :condition-two="lowerCaseAndNumbersOnly"
                condition-text-one="3 or more characters"
                condition-text-two="15 lowercase character"
              ></ProfileValidation>
              <the-input
                class="w-33 h-3"
                v-model="formData.username"
                name="username"
                type="text"
                label="New username"
                validate="minmax:3,15|lowercase_and_numbers_only"
              >
              </the-input>
            </div>
          </div>
          <div class="flex flex-col">
            <label class="mb-0.5">Email</label>
            <div class="flex gap-8">
              <Field
                name="oldEmail"
                type="email"
                disabled
                :value="props.email"
                :readonly="props.google !== null"
                class="text-[#212529] w-33 h-3 rounded px-0.5 py-1 outline-none bg-[#CED4DA]"
              />
              <button
                type="button"
                class="text-[#CED4DA]"
                @click="openEmail"
                v-if="props.google === null"
              >
                Edit
              </button>
            </div>
            <div v-if="newEmail" class="flex flex-col mt-3.5">
              <the-input
                class="w-33 h-3"
                v-model="formData.email"
                name="email"
                type="email"
                label="New Email"
                validate="email"
              >
              </the-input>
              <p class="text-[#F15524] text-base ml-1.25 mt-1" v-if="errors">
                {{ errors['email'] && errors['email'][0][language] }}
              </p>
            </div>
          </div>
          <div class="flex flex-col" v-if="props.google === null">
            <label class="mb-0.5">Password</label>
            <div class="flex gap-8">
              <Field
                name="oldPassword"
                disabled
                value="passwordpassword"
                type="password"
                class="text-[#212529] w-33 h-3 rounded px-0.5 py-1 outline-none bg-[#CED4DA]"
              />
              <button type="button" class="text-[#CED4DA]" @click="openPassword">Edit</button>
            </div>
            <div v-if="newPassword" class="flex flex-col mt-3.5 gap-12">
              <ProfileValidation
                label="Password should contain:"
                :condition-one="passwordMin"
                :condition-two="lowerCaseAndNumbersOnlyPass"
                condition-text-one="8 or more characters"
                condition-text-two="15 lowercase character"
              ></ProfileValidation>
              <the-input
                class="w-33 h-3"
                v-model="formData.password"
                disabled
                name="password"
                type="password"
                label="New Password"
                validate="lowercase_and_numbers_only|minmax:8,15"
              >
              </the-input>
              <the-input
                class="w-33 h-3"
                v-model="formData.password_confirmation"
                name="password_confirmation"
                type="password"
                label="Confirm new password"
                validate="required|confirmed:password"
              >
              </the-input>
            </div>
          </div>
        </div>
      </div>
      <div v-if="openButtons" class="flex gap-7 self-end">
        <button class="text-xl text-[#CED4DA]" type="button" @click="cancelButtons">Cancel</button>
        <button type="submit" class="bg-[#E31221] rounded px-1 py-0.5 h-3 w-[10rem] text-xl">
          Save changes
        </button>
      </div>
    </Form>
  </div>
</template>
