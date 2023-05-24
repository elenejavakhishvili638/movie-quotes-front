<template>
    <section @click.stop class="h-screen md:w-[601px] md:h-[704px] md:rounded-[10px]" >
        <div class="text-white flex flex-col px-[44px] items-center justify-center pt-[73px]" >
            <div class="text-center mb-[32px]" >
                <h1 class="text-2xl mb-[12px] font-medium" >Register</h1>
                <p class="text-base text-[#6C757D] font-normal" >start your journey!</p>
            </div>
            <CustomForm>
                <the-input name="username" type="text"  label="Name" placeholder="Enter your name" ></the-input>

                <the-input name="email" type="email" label="Email" placeholder="Enter your email" ></the-input>

                <the-input name="password" type="password" label="Password" placeholder="Password" ></the-input>

                <the-input name="password_confirmation" type="password" label="Confirm Password" placeholder="Password" ></the-input>
                <the-button>Get started</the-button>
            </CustomForm>
            <button type="submit" class="w-[360px] border border-white rounded-[8px] h-[38px]" >G Sign up with Google</button>
            <div class=" mt-[32px] flex items-center justify-center" >
                <p class=" text-[#6C757D] mr-[4px]" >Already have an account?</p>
                <a class="text-[#0D6EFD]" >Log in</a>
            </div>
        </div>
    </section>
</template>

<script>

import {Form} from "vee-validate"
import TheButton from "../components/TheButton.vue";
import TheInput from "../components/TheInput.vue"

export default {
    components: {
        CustomForm: Form,
        TheInput,
        TheButton
    },
}
</script>

<style scoped>
section {
    background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%);
}
</style>