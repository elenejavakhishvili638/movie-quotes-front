<template>
    <div class="flex justify-between lg:px-[70px] px-[16px] pt-[24px] items-center" >
        <h2 class="text-cream">MOVIE QUOTES</h2>
        <div class="flex items-center" >
            <div class="mr-[10px] md:mr-[40px] flex justify-center items-center" >
              <div @click="toggleLang" class="flex items-center gap-[10px]" >
                <p class="text-white">{{ language.display }}</p>
                <img :src="Vector" />
              </div>

              <div v-show="showLang" class="absolute border-1 top-[7%] bg-slate-500 px-[50px] py-[10px] rounded-[8px]" >
                <div class="flex flex-col gap-[10px]" >
                  <button class="text-white" @click="changeLanguage('en', 'Eng')">Eng</button>
                  <button class="text-white" @click="changeLanguage('ka', 'ქარ')">ქარ</button>
                </div>
              </div>
            </div>
            <div class="flex" >
                <button class="mr-[8px] justify-center items-center flex w-72 h-32 border border-white rounded-[4px] text-white text-sm" >{{ $t("texts.log_in") }}</button>
                <button class="justify-center items-center flex px-[10px] h-32 rounded-[4px] text-white text-sm border-none bg-red" >{{ $t("texts.sign_up") }}</button>
            </div>
        </div>
    </div>
</template>

<script>

import Vector from "../assets/images/logos/Vector.png"
import {useLanguageStore} from "../stores/language/index"
import { ref } from 'vue';

export default {
    setup() {
    const language = useLanguageStore();
    const showLang = ref(false); 

    const changeLanguage = (newLanguage, display) => {
        showLang.value = false; 
        language.setLanguage({newLanguage, display});
    };

    const toggleLang = () => {
        showLang.value = !showLang.value; 
    };

    return {
      language,
      changeLanguage,
      showLang,
      toggleLang
    };
  },
    data(){
    return {
      Vector,
    }
  },
}
</script>