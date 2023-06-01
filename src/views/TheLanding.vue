<template>
    <div>
        <form-layout :close="closeRegistration" v-if="showRegistration" >
            <the-registration :closeRegistration="closeRegistration" :openModal="openModal" ></the-registration>
        </form-layout>
        <form-layout :close="closeModal" v-if="showModal">
            <the-modal :icon="email" text="Please check your email and follow the instructions to activate your account." >
                <a :href="'mailto:' + email" class=" text-center w-[190px] rounded-[8px] bg-red text-white h-[38px] pt-[5px]">Go to my email</a>
            </the-modal>
        </form-layout>
        <form-layout :close="closeModal" v-if="emailVerified">
            <the-modal :icon="verified" text="Your account has been activated." >
                <router-link to="/news-feed" class=" text-center w-[190px] rounded-[8px] bg-red text-white h-[38px] pt-[5px]" >Go to news feed</router-link>
            </the-modal>
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
import TheModal from "../components/TheModal.vue"
import email from "../assets/images/logos/email.png"
import verified from "../assets/images/logos/verifed.png"
import {useEmailStore} from "../stores/email/index"

export default {
    components: {TheFooter, TheHeader, TheRegistration, FormLayout, TheLogin, TheModal},
    setup() {
        const image1Ref = ref(image1);
        const image2Ref = ref(image2);
        const image3Ref = ref(image3);
        const showRegistration = ref(false);
        const showLogin = ref(false);
        const showModal = ref(false);
        const store = useEmailStore()

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

        const openModal = () => {
            showModal.value = true;
        }

        const closeModal = () => {
            showModal.value = false;
        }

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
            closeLogin,
            showModal,
            closeModal,
            openModal,
            email,
            emailVerified: store.emailVerified,
            verified
        };
    },
}
</script>