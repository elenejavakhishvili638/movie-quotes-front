<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUpdateUserStore } from '../stores/updateUser'
import { useUserStore } from '../stores/user'
import ProfileInput from './ProfileInput.vue'
import { Form } from 'vee-validate'
import IconTick from './icons/IconTick.vue'
import IconExit from './icons/IconExit.vue'
import ModalLayout from './ModalLayout.vue'
import IconArrow from './icons/IconArrow.vue'

const props = defineProps(['username', 'email', 'google', 'user'])
const fileInput = ref(null)
const editProfile = ref(false)
const currentText = ref(null)
const currentName = ref(null)
const currentEdit = ref(null)

const currentType = ref(null)
const successModal = ref(false)
const currentValidation = ref(null)
let path = import.meta.env.VITE_BACKEND_URL

const imageUrl = ref(null)
const uploadedImageUrl = ref(
  props.user.image && props.user.image.startsWith('images') 
    ? path + '/storage/' + props.user.image 
    : props.user.image
);

const userStore = useUserStore()
const updateUserStore = useUpdateUserStore()
const userForm = computed(() => updateUserStore.$state.form)

const triggerFileInput = () => {
  fileInput.value.click()
}

onMounted(() => {
  console.log(uploadedImageUrl)
})

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

const openEditProfile = (name, edit, text, type, rules) => {
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
  successModal.value = true
  const formData = new FormData()
  formData.append('_method', 'PATCH')
  formData.append('user_id', props.user.id)
  if (userForm.value['password_confirmation']) {
    formData.append(currentName.value, userForm.value[currentName.value])
    formData.append('password_confirmation', userForm.value['password_confirmation'])

    await updateUserStore.updateUser(formData, props.user.id)
    await userStore.fetchUser('edit')
  } else {
    try {
      formData.append(currentName.value, userForm.value[currentName.value])

      await updateUserStore.updateUser(formData, props.user.id)
      await userStore.fetchUser('edit')
    } catch (error) {
      console.log(error)
    }
  }
}

const closeSuccessModal = () => {
  successModal.value = false
}
</script>

<template>
  <div class="mt-[1.563rem]">
    <ModalLayout v-if="successModal" class="items-baseline pt-1">
      <div class="bg-[#BADBCC] z-10 w-26 h-14 flex items-center justify-around rounded">
        <IconTick></IconTick>
        <p class="text-[#0F5132] text-base">Changes updated succsessfully</p>
        <IconExit @click="closeSuccessModal" class="cursor-pointer" ></IconExit>
      </div>
    </ModalLayout>
    <router-link to="news-feed">
      <IconArrow class="ml-2.5 mb-1.5"></IconArrow>
    </router-link>
    <Form @submit="onSubmit" v-if="editProfile" class="flex justify-center">
      <ProfileInput
        @submitForm="onSubmit"
        :close="closeEditProfile"
        :text="currentText"
        v-model="userForm[currentName]"
        :name="currentEdit"
        :type="currentType"
        :validation="currentValidation"
      ></ProfileInput>
    </Form>
    <div class="bg-[#24222F] h-47.813 rounded-xl flex flex-col items-center" v-if="!editProfile">
      <div class="flex flex-col mt-1.5 items-center mb-3.75">
        <img
          class="bg-[#D9D9D9] w-11.75 h-11.75 rounded-full mb-1.5 object-cover"
          alt="pic"
          :src="uploadedImageUrl"
        />
        <input
          type="file"
          id="file-input"
          ref="fileInput"
          style="display: none"
          @change="onFileChange"
        />
        <p class="text-xl font-normal" @click="triggerFileInput">Upload my photo</p>
      </div>
      <div class="w-22.75 flex flex-col gap-8">
        <div>
          <p class="mb-0.25 text-base">Username</p>
          <div class="flex justify-between border-b pb-1 text-lg">
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
          <p class="mb-0.25 text-base">Email</p>
          <div class="flex justify-between border-b pb-1 text-lg">
            <p>{{ props.email }}</p>
            <button
              class="text-[#CED4DA]"
              @click="
                openEditProfile(
                  'email',
                  'updatedEmail',
                  'Enter new Email',
                  'email',
                  'required|email'
                )
              "
            >
              Edit
            </button>
          </div>
        </div>
        <div>
          <p class="mb-0.25 text-base">Password</p>
          <div class="flex justify-between border-b pb-1 text-lg">
            <p class="tracking-wider">...............</p>
            <button
              class="text-[#CED4DA]"
              @click="
                openEditProfile(
                  'password',
                  'updatedPassword',
                  'Enter new password',
                  'password',
                  'required|lowercase_and_numbers_only|minmax:8,15'
                )
              "
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
