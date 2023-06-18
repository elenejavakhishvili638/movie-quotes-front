<script setup>
import arrow from '../assets/images/logos/arrow.png'
import { ref, computed } from 'vue'
import { useUpdateUserStore } from '../stores/updateUser'
import ProfileInput from './ProfileInput.vue'
import { Form } from 'vee-validate'

const props = defineProps(['username', 'email', 'google', 'user'])
const fileInput = ref(null)
const editProfile = ref(false)
const currentEdit = ref(null)
const currentText = ref(null)
const currentName = ref(null)
const currentType = ref(null)
const currentValidation = ref(null)

// const user = computed(() => userStore.$state.user)
const updateUserStore = useUpdateUserStore()
const userForm = computed(() => updateUserStore.$state.form)

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = (e) => {
  console.log(e)
}

const openEditProfile = (edit, name, text, type, rules) => {
  console.log('openEditProfile called with:', name, text)
  editProfile.value = true

  currentEdit.value = edit
  currentText.value = text
  currentName.value = name
  currentType.value = type
  currentValidation.value = rules
  console.log(userForm.value)
}

const closeEditProfile = () => {
  editProfile.value = false
}

const onSubmit = async () => {
  console.log(currentEdit.value)
  try {
    const formData = new FormData()
    formData.append('_method', 'PATCH')
    formData.append('user_id', props.user.id)
    formData.append(currentEdit.value, userForm.value[currentName.value])

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    console.log(userForm.value['updatedUsername'], currentName.value)

    await updateUserStore.updateUser(formData, props.user.id)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="mt-[25px]">
    <router-link to="news-feed">
      <img class="ml-[40px] mb-[25px]" alt="arrow" :src="arrow" />
    </router-link>
    <Form @submit="onSubmit" v-if="editProfile" class="flex justify-center">
      <ProfileInput
        @submitForm="onSubmit"
        :close="closeEditProfile"
        :text="currentText"
        v-model="userForm[currentName]"
        :name="currentName"
        :type="currentType"
        :validation="currentValidation"
      ></ProfileInput>
    </Form>
    <div
      class="bg-[#24222F] h-[765px] rounded-[12px] flex flex-col items-center"
      v-if="!editProfile"
    >
      <div class="flex flex-col mt-[24px] items-center mb-[60px]">
        <img
          class="bg-[#D9D9D9] w-[188px] h-[188px] rounded-full mb-[24px]"
          alt="pic"
          :src="user.image"
        />
        <input
          type="file"
          id="file-input"
          ref="fileInput"
          style="display: none"
          @change="onFileChange"
        />
        <p class="text-[20px] font-normal" @click="triggerFileInput">Upload my photo</p>
      </div>
      <div class="w-[364px] flex flex-col gap-[31px]">
        <div>
          <p class="mb-[4px] text-base">Username</p>
          <div class="flex justify-between border-b pb-[16px] text-[18px]">
            <p>{{ props.username }}</p>
            <button
              class="text-[#CED4DA]"
              @click="
                openEditProfile(
                  'username',
                  'updatedUsername',
                  'Enter new username',
                  'text',
                  'required|minmax:3,15|lowercase_and_numbers_only'
                )
              "
            >
              Edit
            </button>
          </div>
        </div>
        <div>
          <p class="mb-[4px] text-base">Email</p>
          <div class="flex justify-between border-b pb-[16px] text-[18px]">
            <p>{{ props.email }}</p>
            <button
              class="text-[#CED4DA]"
              @click="openEditProfile('updatedEmail', 'Enter new Email', 'email', 'required|email')"
            >
              Edit
            </button>
          </div>
        </div>
        <div>
          <p class="mb-[4px] text-base">Password</p>
          <div class="flex justify-between border-b pb-[16px] text-[18px]">
            <p>....</p>
            <button class="text-[#CED4DA]">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
