<template>
    <section @click.stop class="h-screen md:w-[601px] md:h-auto md:rounded-[10px] flex flex-col  justify-center" >
        <div class="text-white flex flex-col px-[44px] items-center justify-center pt-[73px]" >
            <div class="text-center mb-[32px]" >
                <h1 class="text-2xl mb-[12px] font-medium" >Forgot Password?</h1>
                <p class=" w-[274px] md:w-[313px] text-base text-[#6C757D] font-[14px]" >Enter the email and we’ll send an email with instructions to reset your password</p>
            </div>
            <CustomForm >
                <the-input  validate="required" name="email" type="text" :label="$t('login.email')" :placeholder="$t('login.email_placeholder')"></the-input>
                <the-button>Send instructions</the-button>
            </CustomForm>
            <div @click="openModal" class="mb-[53px] gap-[11px] flex items-center justify-center text-[#6C757D] font-normal" >
                <img :src="back" />
                Back to log in
            </div>
        </div>
    </section>
</template>

<script>
import {Form} from "vee-validate"
import TheButton from "./TheButton.vue";
import TheInput from "./TheInput.vue"
import back from "../assets/images/logos/back.png"

export default {
    components: {
        CustomForm: Form,
        TheButton,
        TheInput
    },
    setup(props, {emit}) {

        const openModal = () => {
            emit('changeModal', 'login');
        }

        return {
            openModal,
            back
        }
    },
}
</script>

<style scoped>
section {
    background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%);
}
</style>