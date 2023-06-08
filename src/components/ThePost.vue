<script setup>
import comment from '../assets/images/logos/comment.png'
import heart from '../assets/images/logos/heart.png'

const props = defineProps(['quote', 'movie', 'user', 'poster', 'year'])
</script>

<template>
  <div
    class="bg-[#11101A] rounded-[12px] flex justify-center text-white mb-[32px] md:w-[500px] xl:w-[938px]"
  >
    <div class="w-[358px] my-[28px] md:w-[452px] xl:w-[890px]">
      <div class="flex items-center mb-[14px]">
        <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
        <p class="ml-[16px]">{{ props.user }}</p>
      </div>
      <div>
        <p class="mb-[16px]">
          “{{ props.quote }}” movie - <span class="text-cream">{{ props.movie }}.</span> ({{
            props.year
          }})
        </p>
        <img
          class="bg-[#D9D9D9] rounded-[10px] w-[358px] h-[200px] md:w-full md:h-[501px]"
          alt="film"
        />
        <div class="flex my-[19px] border-b border-color pb-[26px]">
          <div class="flex mr-[24px]">
            <p>10</p>
            <img class="ml-[12px]" :src="comment" />
          </div>
          <div class="flex">
            <p>10</p>
            <img class="ml-[12px]" :src="heart" />
          </div>
        </div>
      </div>
      <div class="pt-[16px] pb-[24px]">
        <div class="flex">
          <div class="flex flex-col items-start mb-[14px] border-b border-color pb-[24px]">
            <div class="flex items-center mb-[24px]">
              <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px] mr-[24px]" alt="name" />
              <p>Maia Nakashidze</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa
              facilisis consequat elit morbi convallis convallis.
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex items-center mr-[12px]">
          <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
        </div>
        <input
          class="bg-[#24222F] w-[306px] pl-[16px] h-[40px] rounded-[10px] md:w-full"
          placeholder="Write a comment"
        />
      </div>
    </div>
  </div>
</template>
