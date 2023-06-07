<script setup>
import close from '../assets/images/logos/close.png'
const props = defineProps(['username', 'closeMovie'])
</script>

<template>
  <div
    class="h-auto top-0 w-full md:top-[8%] md:left-[35%] xl:left-[28%] 2xl:left-[24%] xl:w-[601px] 2xl:w-[961px] absolute text-white bg-[#11101A] md:w-[500px] rounded-[12px]"
  >
    <div class="flex items-center justify-between border-b border-[#EFEFEF33] py-[25px] px-[54px]">
      <div></div>
      <h1>Add movie</h1>
      <img @click="props.closeMovie" :src="close" />
    </div>
    <div class="p-[35px]">
      <div class="flex items-center gap-[16px]">
        <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
        <p>{{ props.username }}</p>
      </div>
      <form class="flex flex-col mt-[37px] gap-[16px]">
        <div class="border w-[358px]">
          <p>Movie name</p>
          <input />
        </div>
        <div class="border w-[358px]">
          <p>ფილმის სახელი</p>
          <input />
        </div>
        <div class="border w-[358px]">
          <p>ფილმის სახელი</p>
          <input />
        </div>
        <div class="border w-[358px]">
          <p>წელი/Year</p>
          <input />
        </div>
        <div class="border w-[358px]">
          <p>Director</p>
          <input />
        </div>
        <div class="border w-[358px]">
          <p>რეჟისორი</p>
          <input />
        </div>
        <textarea></textarea>
        <textarea></textarea>
        <input type="file" />
        <the-button class="w-full">Add movie</the-button>
        <!-- <button>Post</button> -->
      </form>
    </div>
  </div>
</template>
