<script setup>
import image from '../assets/images/logos/image.png'
import { ref, computed } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

const fileInput = ref(null)

const props = defineProps([
  'onFileChangeParent',
  'onDropParent',
  'triggerFileInputParent',
  'uploadedImageUrl',
  'type'
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
</script>

<template>
  <Field name="image" v-slot="{ handleChange, validate }" :rules="imageRules">
    <div
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop($event, handleChange, validate)"
      :class="{ 'h-11.5': uploadedImageUrl }"
      class="flex justify-between items-center border border-[#6C757D] w-full p-7 rounded"
    >
      <img
        :src="uploadedImageUrl"
        v-if="uploadedImageUrl"
        class="ml-1.5 w-11 lg:w-27 h-7 lg:h-9 object-contain border border-dashed border-[#DDCCAA]"
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
          'flex flex-col items-center mr-6 lg:mr-[54px] gap-4': uploadedImageUrl
        }"
      >
        <div class="flex pl-4 items-center">
          <img :src="image" />
          <p class="text-[16px] font-normal ml-[13px]">{{ $t('movie.upload') }}</p>
        </div>
        <button
          type="button"
          class="bg-[#9747FF66] w-6 lg:w-12 h-2.6 text-lg outline-none"
          @click="triggerFileInput"
        >
          {{ $t('movie.choose') }}
        </button>
      </div>
    </div>
    <ErrorMessage class="text-[#F15524] text-base ml-5" name="image" />
  </Field>
</template>
