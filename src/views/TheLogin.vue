<template>
    <section @click.stop class="h-screen md:w-[601px] md:h-[562px] md:rounded-[10px]" >
        <div class="text-white flex flex-col px-[44px] items-center justify-center pt-[73px]" >
            <div class="text-center mb-[32px]" >
                <h1 class="text-2xl mb-[12px] font-medium" >Log in to your account</h1>
                <p class="text-base text-[#6C757D] font-normal" >Welcome back! Please enter your details.</p>
            </div>
            <CustomForm>
                <the-input validate="required" name="username" type="text" label="Email" placeholder="Enter your email"></the-input>
                <the-input validate="required" name="password" type="password" label="Password" placeholder="Password"></the-input>
                <div class=" w-[360px] flex justify-between mb-[16px]" >
                    <div class="flex justify-center" >
                        <input type="checkbox" />
                        <label class="ml-[8px]" >Remeber me</label>
                    </div>
                    <a class="text-[#0D6EFD]" >Forgot password</a>
                </div>
                <the-button>Sign in</the-button>
            </CustomForm>
            <button class="w-[360px] border border-white rounded-[8px] h-[38px]" >G Sign in with Google</button>
            <div class=" mt-[32px] flex items-center justify-center" >
                <p class=" text-[#6C757D] mr-[4px]" >Don't have an account</p>
                <a class="text-[#0D6EFD]" >Sign up</a>
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