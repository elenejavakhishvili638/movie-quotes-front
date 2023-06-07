<script setup>
import arrow from '../assets/images/logos/arrow.png'
// import { Form, Field } from 'vee-validate'
// const props = defineProps(['username', 'email'])
</script>

<template>
  <div class="ml-187px relative">
    <p class="ml-[61px] mb-[127px] mt-[32px] text-[24px] font-medium">My profile</p>
    <div class="md:w-[600px] xl:w-[998px] bg-[#11101A] flex flex-col items-center">
      <div class="absolute flex flex-col items-center top-20">
        <img :src="arrow" alt="pic" class="rounded-full bg-red h-[188px] w-[188px] mb-[24px]" />
        <p class="text-[20px] font-normal">Upload my photo</p>
      </div>
      <div class="bg-[#11101A]">
        <Form class="flex flex-col gap-[56px] text-base">
          <div class="flex flex-col mt-[197px]">
            <label class="mb-[8px]">Username</label>
            <div class="flex gap-[33px]">
              <input
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
              <!-- <Field /> -->
              <button class="text-[#CED4DA]">Edit</button>
            </div>
          </div>
          <div class="flex flex-col">
            <label class="mb-[8px]">Email</label>
            <div class="flex gap-[33px]">
              <input
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
              <!-- <Field /> -->
              <!-- <button class="text-[#CED4DA]">Edit</button> -->
            </div>
          </div>
          <div class="flex flex-col mb-[157px]">
            <label class="mb-[8px]">Password</label>
            <div class="flex gap-[33px]">
              <input
                class="w-[528px] h-[48px] rounded-[5px] px-[9px] py-[17px] outline-none bg-[#CED4DA]"
              />
              <!-- <Field /> -->
              <button class="text-[#CED4DA]">Edit</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
