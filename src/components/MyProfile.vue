<script setup>
import { ref, computed } from 'vue'
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
)

const userStore = useUserStore()
const updateUserStore = useUpdateUserStore()
const userForm = computed(() => updateUserStore.$state.form)

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
    await userStore.fetchUser('edit')
  } catch (error) {
    console.log(error)
  }
}

const openEditProfile = (name, edit, text, type, rules) => {
  editProfile.value = true
  currentEdit.value = edit
  currentText.value = text
  currentName.value = name
  currentType.value = type
  currentValidation.value = rules
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
        <p class="text-[#0F5132] text-base">{{ $t('profile.changes_success') }}</p>
        <IconExit @click="closeSuccessModal" class="cursor-pointer"></IconExit>
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
        <p class="text-xl font-normal" @click="triggerFileInput">
          {{ $t('profile.upload_photo') }}
        </p>
      </div>
      <div class="w-22.75 flex flex-col gap-8">
        <div>
          <p class="mb-0.25 text-base">{{ $t('profile.username') }}</p>
          <div class="flex justify-between border-b pb-1 text-lg">
            <p>{{ props.username }}</p>
            <button
              class="text-[#CED4DA]"
              @click="
                openEditProfile(
                  'username',
                  'updatedUsername',
                  $t('profile.new_username'),
                  'text',
                  'required|minmax:3,15|lowercase_and_numbers_only'
                )
              "
            >
              {{ $t('profile.edit') }}
            </button>
          </div>
        </div>
        <div>
          <p class="mb-0.25 text-base">{{ $t('profile.email') }}</p>
          <div class="flex justify-between border-b pb-1 text-lg">
            <p>{{ props.email }}</p>
            <button
              class="text-[#CED4DA]"
              @click="
                openEditProfile(
                  'email',
                  'updatedEmail',
                  $t('profile.new_email'),
                  'email',
                  'required|email'
                )
              "
            >
              {{ $t('profile.edit') }}
            </button>
          </div>
        </div>
        <div>
          <p class="mb-0.25 text-base">{{ $t('profile.password') }}</p>
          <div class="flex justify-between border-b pb-1 text-lg">
            <p class="tracking-wider">...............</p>
            <button
              class="text-[#CED4DA]"
              @click="
                openEditProfile(
                  'password',
                  'updatedPassword',
                  $t('profile.new_password'),
                  'password',
                  'required|lowercase_and_numbers_only|minmax:8,15'
                )
              "
            >
              {{ $t('profile.edit') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
