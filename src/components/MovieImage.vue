<script setup>
import IconCamera from '@/components/icons/IconCamera.vue'
import { ref, computed } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import { useLanguageStore } from '@/stores/language/index'

const fileInput = ref(null)
const languageStore = useLanguageStore()

const props = defineProps([
  'onFileChangeParent',
  'onDropParent',
  'triggerFileInputParent',
  'uploadedImageUrl',
  'type',
  'errors'
])

const triggerFileInput = () => {
  props.triggerFileInputParent(fileInput)
}

const onFileChange = async (e, handleChange, validate) => {
  await props.onFileChangeParent(e, handleChange, validate)
}

const onDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'copy'
}

const onDragLeave = (event) => {
  event.preventDefault()
}

const onDrop = async (event, handleChange, validate) => {
  event.preventDefault()
  await props.onDropParent(event, handleChange, validate)
}

const imageRules = computed(() => {
  return props.type === 'edit' ? '' : 'required'
})

const language = computed(() => languageStore.currentLanguage)
</script>

<template>
  <Field name="image" v-slot="{ handleChange, validate }" :rules="imageRules">
    <div
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop($event, handleChange, validate)"
      :class="{ 'h-11.5': uploadedImageUrl }"
      class="flex justify-between items-center border border-[#6C757D] w-full p-[1.75rem] rounded"
    >
      <img
        :src="uploadedImageUrl"
        v-if="uploadedImageUrl"
        class="w-11 lg:w-27 h-7 lg:h-9 object-contain border border-dashed border-[#DDCCAA]"
      />
      <input
        type="file"
        id="file-input"
        ref="fileInput"
        style="display: none"
        @change="onFileChange($event, handleChange, validate)"
      />
      <div
        class="flex items-center gap-5"
        :class="{
          'flex flex-col items-center mr-6 lg:mr-[3.375rem] gap-4': uploadedImageUrl
        }"
      >
        <div class="flex flex-col pl-0.25 items-center">
          <p v-if="uploadedImageUrl" class="text-[#DDCCAA]">{{ $t('movie.replace_photo') }}</p>
          <div v-else class="flex items-center md:hidden">
            <IconCamera></IconCamera>
            <p class="text-base font-normal ml-[0.813rem] text-center">
              {{ $t('movie.upload') }}
            </p>
          </div>
          <div class="md:flex items-center hidden">
            <IconCamera></IconCamera>
            <p class="text-base font-normal ml-[0.813rem] text-center">
              {{ $t('movie.upload') }}
            </p>
          </div>
        </div>
        <button
          type="button"
          class="bg-[#9747FF66] w-6 lg:w-12 h-2.6 md:text-lg outline-none text-sm"
          @click="triggerFileInput"
        >
          {{ $t('movie.choose') }}
        </button>
      </div>
    </div>
    <p class="text-[#F15524] text-base" v-if="props.errors">
      {{ props.errors.image && props.errors.image[0][language] }}
    </p>
    <ErrorMessage class="text-[#F15524] text-base ml-5" name="image" />
  </Field>
</template>
