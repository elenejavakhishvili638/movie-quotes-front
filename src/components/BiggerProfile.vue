<script setup>
import { ref, computed } from 'vue'
import { useUpdateUserStore } from '../stores/updateUser/index'
import { Form, Field } from 'vee-validate'
const props = defineProps(['username', 'email', 'google', 'user'])

const fileInput = ref(null)
const newUsername = ref(false)
const newEmail = ref(false)
const newPassword = ref(false)
const openButtons = ref(false)

const updateUserStore = useUpdateUserStore()

const triggerFileInput = () => {
  fileInput.value.click()
  openButtons.value = true
}

const onFileChange = (e) => {
  console.log(e)
}

const cancelButtons = () => {
  newUsername.value = false
  newEmail.value = false
  newPassword.value = false
  openButtons.value = false
}
const formData = computed(() => updateUserStore.form)

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
</script>

<template>
  <div class="relative">
    <p class="ml-3.813 mb-7.938 mt-[32px] text-2xl font-medium">My profile</p>
    <Form class="md:w-37.5 xl:w-62.375 bg-[#11101A] flex flex-col items-center">
      <div class="absolute flex flex-col items-center top-20">
        <img :src="user.img" alt="pic" class="rounded-full bg-[#D9D9D9] h-11.75 w-11.75 mb-1.5" />
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
        <div class="flex flex-col gap-14 pb-40 text-base">
          <div class="flex flex-col mt-12.313">
            <label class="mb-0.5">Username</label>
            <div class="flex gap-8">
              <Field
                name="oldName"
                type="text"
                :value="props.username"
                class="w-33 h-3 rounded px-2 py-4 outline-none bg-[#CED4DA]"
              />
              <button type="button" class="text-[#CED4DA]" @click="openUsername">Edit</button>
            </div>
            <div v-if="newUsername" class="flex flex-col mt-3.5">
              <div class="border border-[#CED4DA33] mb-2 w-33 h-9 rounded p-6">
                <p class="text-base mb-1">Username should contain:</p>
                <div class="flex items-center gap-2">
                  <div class="w-1 h-1 bg-[#198754] rounded-full"></div>
                  <p class="text-sm mb-0.5">3 or more characters</p>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-1 h-1 bg-[#9C9A9A] rounded-full"></div>
                  <p class="text-sm text-[#9C9A9A]">15 lowercase character</p>
                </div>
              </div>
              <label class="mb-[8px]">New username</label>
              <Field
                name="username"
                type="text"
                :value="formData.username"
                class="w-33 h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <label class="mb-[8px]">Email</label>
            <div class="flex gap-[33px]">
              <Field
                name="oldEmail"
                type="email"
                :value="props.email"
                :readonly="props.google !== null"
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
              <!-- <Field /> -->
              <button
                type="button"
                class="text-[#CED4DA]"
                @click="openEmail"
                v-if="props.google === null"
              >
                Edit
              </button>
            </div>
            <div v-if="newEmail" class="flex flex-col mt-[56px]">
              <label class="mb-[8px]">New Email</label>
              <Field
                name="email"
                type="email"
                :value="formData.email"
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
            </div>
          </div>
          <div class="flex flex-col" v-if="props.google === null">
            <label class="mb-[8px]">Password</label>
            <div class="flex gap-[33px]">
              <Field
                name="oldPassword"
                type="password"
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
              <button type="button" class="text-[#CED4DA]" @click="openPassword">Edit</button>
            </div>
            <div v-if="newPassword" class="flex flex-col mt-[56px]">
              <label class="mb-[8px]">New Password</label>
              <Field
                name="password"
                type="password"
                :value="formData.password"
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
              <label class="mb-[8px] mt-[56px]">Confirm new password</label>
              <Field
                name="password_confirmation"
                type="password_confirmation"
                :value="formData.password_confirmation"
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="openButtons" class="flex gap-[26px] self-end">
        <button class="text-[20px] text-[#CED4DA]" type="button" @click="cancelButtons">
          Cancel
        </button>
        <button
          class="bg-[#E31221] rounded-[5px] px-[17px] py-[9px] h-[48px] w-[160px] text-[20px]"
        >
          Save changes
        </button>
      </div>
    </Form>
  </div>
</template>
