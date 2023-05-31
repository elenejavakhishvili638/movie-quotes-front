<template>
    <div>
        <form-layout :close="closeRegistration" v-if="showRegistration" >
            <the-registration :closeRegistration="closeRegistration" ></the-registration>
        </form-layout>
        <form-layout :close="closeLogin" v-if="showLogin" >
            <the-login  :closeLogin="closeLogin"></the-login>
        </form-layout>
        <div class="bg-background flex flex-col justify-between" >
            <div class="lg:pb-[212px] pb-[100px]" >
                <the-header :register="register" :login="login"></the-header>
                 <div class="mt-[136px] flex flex-col items-center justify-center text-2xl break " >
                     <h1 class="text-cream text-center lg:text-[60px] lg:w-[703px] lg:leading-[90px] w-[281px]">Find any quote in <br/> millions of movie lines</h1>
                     <a class="mt-[32px] justify-center items-center flex w-109 h-38 rounded-[4px] text-white text-base border-none bg-red" >{{ $t("texts.get_started") }}</a>
                 </div>
            </div>
            <div :style="{ backgroundImage: `url(${image1})`}" class="flex h-[500px] lg:h-[1200px] bg-center md:bg-center bg-cover bg-no-repeat lg:pt-[413px] lg:pl-[239px] lg:justify-start lg:items-start justify-center items-center" >
                <div class="w-[305px] text-white lg:w-[761px] lg:leading-[75px] text-xl lg:text-[50px] font-bold">
                  <h1 class="mb-[10px]" >- “You have to leave somethig behind to go forward”</h1>
                  <p class="text-base lg:text-[30px]" >Interstellar, 2014</p>
                </div>
            </div>
            <div :style="{ backgroundImage: `url(${image3})`}" class="flex h-[500px] lg:h-[1000px] bg-center md:bg-center bg-cover bg-fixed bg-no-repeat lg:pt-[413px] lg:pl-[239px] lg:justify-start lg:items-start justify-center items-center" >
                <div class="w-[305px] text-white lg:w-[761px] lg:leading-[75px] text-xl lg:text-[50px] font-bold">
                    <h1 class="mb-[10px] " >- “I think we’re just gonna have to be secretly in love with earch other and leave it that”</h1>
                    <p class="text-base lg:text-[30px]" >The Royal Tenenbaums,2001 </p>
                </div>
            </div>
            <div :style="{ backgroundImage: `url(${image2})`}" class="flex h-[500px] lg:h-[1000px] bg-right md:bg-center bg-cover bg-fixed bg-no-repeat lg:pt-[413px] lg:pl-[239px] lg:justify-start lg:items-start justify-center items-center" >
                <div class="w-[305px] text-white lg:w-[761px] lg:leading-[75px] text-xl lg:text-[50px] font-bold">
                  <h1 class="mb-[10px]" >- “I think we’re just gonna have to be secretly in love with earch other and leave it that”</h1>
                  <p class="text-base lg:text-[30px]" >The Royal Tenenbaums,2001 </p>
                </div>
            </div>
            <the-footer></the-footer>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import TheFooter from "../components/TheFooter.vue";
import TheHeader from "../components/TheHeader.vue";
import image1 from '../assets/images/image1.png';
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import TheRegistration from "./TheRegistration.vue";
import TheLogin from "./TheLogin.vue"
import FormLayout from "../components/FormLayout.vue";
import {  useRoute } from 'vue-router';

export default {
    components: {TheFooter, TheHeader, TheRegistration, FormLayout, TheLogin},
    setup() {
        const image1Ref = ref(image1);
        const image2Ref = ref(image2);
        const image3Ref = ref(image3);
        const showRegistration = ref(false);
        const showLogin = ref(false);

        const route = useRoute();

        const register = () => {
            showRegistration.value = true;
        };

        const login =() => {
            showLogin.value = true;
        };

        const closeRegistration = () => {
            showRegistration.value = false;
        };

        const closeLogin = () => {
            showLogin.value = false;
        };

        watch(() => route.params.modal, (modal) => {
            if (modal && window.innerWidth >= 768) { 
                showRegistration.value = true;
                showLogin.value = true;
            } else {
                showRegistration.value = false;
                showLogin.value = false;
            }
        });

        return {
            image1: image1Ref,
            image2: image2Ref,
            image3: image3Ref,
            showRegistration,
            register,
            closeRegistration,
            showLogin,
            login,
            closeLogin
        };
    },
}
</script>