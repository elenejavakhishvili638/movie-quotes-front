<script setup>
import arrow from '../assets/images/logos/arrow.png'
import { ref, computed } from 'vue'
import { useUpdateUserStore } from '../stores/updateUser/index'
import { Form, Field } from 'vee-validate'
const props = defineProps(['username', 'email'])

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
  <div class="ml-187px relative">
    <p class="ml-[61px] mb-[127px] mt-[32px] text-[24px] font-medium">My profile</p>
    <Form class="md:w-[600px] xl:w-[998px] bg-[#11101A] flex flex-col items-center">
      <div class="absolute flex flex-col items-center top-20">
        <img :src="arrow" alt="pic" class="rounded-full bg-red h-[188px] w-[188px] mb-[24px]" />
        <input
          type="file"
          id="file-input"
          ref="fileInput"
          style="display: none"
          @change="onFileChange"
        />
        <p class="text-[20px] font-normal" @click="triggerFileInput">Upload my photo</p>
      </div>
      <div class="bg-[#11101A]">
        <div class="flex flex-col gap-[56px] text-base">
          <div class="flex flex-col mt-[197px]">
            <label class="mb-[8px]">Username</label>
            <div class="flex gap-[33px]">
              <Field
                name="oldName"
                type="text"
                :value="props.username"
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
              <button type="button" class="text-[#CED4DA]" @click="openUsername">Edit</button>
            </div>
            <div v-if="newUsername" class="flex flex-col mt-[56px]">
              <label class="mb-[8px]">New username</label>
              <Field
                name="username"
                type="text"
                :value="formData.username"
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
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
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
              <!-- <Field /> -->
              <button type="button" class="text-[#CED4DA]" @click="openEmail">Edit</button>
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
          <div class="flex flex-col mb-[157px]">
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
        <button type="button" @click="cancelButtons">Cancel</button>
        <button>Save changes</button>
      </div>
    </Form>
  </div>
</template>
