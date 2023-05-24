<template>
    <div>
        <div class="bg-background flex flex-col justify-between" >
            <div class="lg:pb-[212px] pb-[100px]" >
                <the-header></the-header>
                 <div class="mt-[136px] flex flex-col items-center justify-center text-2xl break " >
                     <h1 class="text-cream text-center lg:text-[60px] lg:w-[703px] lg:leading-[90px] w-[281px]">Find any quote in <br/> millions of movie lines</h1>
                     <a class="mt-[32px] justify-center items-center flex w-109 h-38 rounded-[4px] text-white text-base border-none bg-red" >{{ $t("texts.get_started") }}</a>
                 </div>
            </div>
            <div class="flex h-[500px] lg:h-[1000px] bg-center bg-fixed bg-cover bg-no-repeat lg:pt-[413px] lg:pl-[239px] lg:justify-start lg:items-start justify-center items-center" >
                 <!-- <img src="" /> -->
                <div class="w-[305px] lg:w-[761px] lg:leading-[75px] text-xl lg:text-[50px] font-bold">
                  <h1 class="mb-[10px]" >- “You have to leave somethig behind to go forward”</h1>
                  <p class="text-base lg:text-[30px]" >Interstellar, 2014</p>
                </div>
            </div>
            <the-footer></the-footer>
        </div>
    </div>
</template>

<script>

import TheFooter from "../components/TheFooter.vue"
import TheHeader from "../components/TheHeader.vue"

export default {
    components: {TheFooter, TheHeader}
}
</script>