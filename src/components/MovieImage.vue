<script setup>
import image from '../assets/images/logos/image.png'
import { ref } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

const fileInput = ref(null)
// const uploadedImageUrl = ref(null)

const props = defineProps([
  'onFileChangeParent',
  'onDropParent',
  'triggerFileInputParent',
  'uploadedImageUrl'
])

const triggerFileInput = () => {
  props.triggerFileInputParent(fileInput)
}

const onFileChange = async (e, handleChange, validate) => {
  await props.onFileChangeParent(e, handleChange, validate)
  //   uploadedImageUrl.value = e.target.result
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
  //   uploadedImageUrl.value = event.target.result
}
</script>

<template>
  <Field name="image" v-slot="{ handleChange, validate }" rules="required">
    <div
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop($event, handleChange, validate)"
      :class="{ 'h-[142px] lg:h-[185px]': uploadedImageUrl }"
      class="flex justify-between items-center border border-[#6C757D] w-full h-[82px] rounded-[4px]"
    >
      <img
        :src="uploadedImageUrl"
        v-if="uploadedImageUrl"
        class="ml-[24px] w-[433px] h-[110px] lg:h-[144px] object-contain border border-dashed border-[DDCCAA]"
      />
      <input
        type="file"
        id="file-input"
        ref="fileInput"
        style="display: none"
        @change="onFileChange($event, handleChange, validate)"
      />
      <div
        class="flex items-center gap-[20px]"
        :class="{
          'flex flex-col items-center mr-[24px] lg:mr-[54px] gap-[16px]': uploadedImageUrl
        }"
      >
        <div class="flex ml-[16px] items-center">
          <img :src="image" />
          <p class="text-[20px] font-normal ml-[13px]">{{ $t('movie.upload') }}</p>
        </div>
        <button
          type="button"
          class="bg-[#9747FF66] ml-[16px] w-[150px] h-[42px] mr-[16px] text-[18px] outline-none"
          @click="triggerFileInput"
        >
          {{ $t('movie.choose') }}
        </button>
      </div>
    </div>
    <ErrorMessage class="text-[#F15524] text-base ml-[20px]" name="image" />
  </Field>
</template>

<!-- <script setup>
import { ref, watch } from 'vue'
import { useField, Field, ErrorMessage } from 'vee-validate'

const fileInput = ref(null)
const uploadedImageUrl = ref(null)
const imageUrl = ref(null)

// Props from parent
const props = defineProps({
  onFileChangeParent: Function,
  onDropParent: Function,
  triggerFileInputParent: Function
})

const triggerFileInput = () => {
  props.triggerFileInputParent()
}

const onFileChange = async (e, handleChange, validate) => {
  await props.onFileChangeParent(e, handleChange, validate)
  uploadedImageUrl.value = e.target.result
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
  uploadedImageUrl.value = event.target.result
}
</script> -->
