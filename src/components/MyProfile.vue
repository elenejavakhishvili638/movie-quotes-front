<script setup>
import arrow from '../assets/images/logos/arrow.png'
const props = defineProps(['username', 'email'])
</script>

<template>
  <div class="mt-[25px]">
    <router-link to="news-feed">
      <img class="ml-[40px] mb-[25px]" alt="arrow" :src="arrow" />
    </router-link>
    <div class="bg-[#24222F] h-[765px] rounded-[12px] flex flex-col items-center">
      <div class="flex flex-col mt-[24px] items-center mb-[60px]">
        <img
          class="bg-[#D9D9D9] w-[188px] h-[188px] rounded-full mb-[24px]"
          alt="pic"
          :src="arrow"
        />
        <p class="text-[20px]">Upload new photo</p>
      </div>
      <div class="w-[364px] flex flex-col gap-[31px]">
        <div>
          <p class="mb-[4px] text-base">Username</p>
          <div class="flex justify-between border-b pb-[16px] text-[18px]">
            <p>{{ props.username }}</p>
            <button class="text-[#CED4DA]">Edit</button>
          </div>
        </div>
        <div>
          <p class="mb-[4px] text-base">Email</p>
          <div class="flex justify-between border-b pb-[16px] text-[18px]">
            <p>{{ props.email }}</p>
            <button class="text-[#CED4DA]">Edit</button>
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
