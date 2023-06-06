<script setup>
import comment from '../assets/images/logos/comment.png'
import heart from '../assets/images/logos/heart.png'

const props = defineProps(['quote', 'movie', 'user', 'poster', 'year'])
</script>

<template>
  <div class="bg-black flex justify-center text-white mb-[32px] md:w-[500px] xl:w-[938px]">
    <div class="w-[358px] my-[28px]">
      <div class="flex items-center mb-[14px]">
        <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
        <p class="ml-[16px]">{{ props.user }}</p>
      </div>
      <div>
        <p class="mb-[16px]">
          “{{ props.quote }}”movie- <span class="text-cream">{{ props.movie }}.</span> ({{
            props.year
          }})
        </p>
        <img class="bg-[#D9D9D9] rounded-[10px] w-[358px] h-[200px]" alt="film" />
        <div class="flex my-[19px]">
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
      <div class="border-t border-b border-border-color pt-[16px] pb-[24px]">
        <div class="flex items-center mb-[14px]">
          <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
          <p class="ml-[16px]">Maia Nakashidze</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa
          facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing
          enim integer mi leo nisl. Arcu vitae mauris odio eget.
        </p>
      </div>
      <div class="border-t border-b border-border-color pt-[16px] pb-[24px]">
        <div class="flex items-center mb-[14px]">
          <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
          <p class="ml-[16px]">Maia Nakashidze</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa
          facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing
          enim integer mi leo nisl. Arcu vitae mauris odio eget.
        </p>
      </div>
      <div class="flex items-center mt-[16px]">
        <div class="flex items-center mr-[12px]">
          <img class="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]" alt="name" />
        </div>
        <input class="bg-[#24222F] w-[306px] pl-[16px] h-[40px]" placeholder="Write a comment" />
      </div>
    </div>
  </div>
</template>
