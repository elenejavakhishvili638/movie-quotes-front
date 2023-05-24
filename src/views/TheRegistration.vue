<template>
    <section @click.stop class="h-screen md:w-[601px] md:h-auto md:rounded-[10px]" >
        <div class=" text-white flex flex-col px-[44px] items-center justify-center pt-[73px]" >
            <div class="text-center mb-[32px]" >
                <h1 class="text-2xl mb-[12px] font-medium" >Register</h1>
                <p class="text-base text-[#6C757D] font-normal" >start your journey!</p>
            </div>
            <CustomForm  @submit="onSubmit" >
                <the-input name="username" type="text"  label="Name" placeholder="Enter your name" validate="required|minmax:3,15|lowercase_and_numbers_only" :value="authStore.$state.form.username" @input="handleInput"></the-input>

                <the-input name="email" type="email" label="Email" placeholder="Enter your email" validate="required|email" :value="authStore.$state.form.email" @input="handleInput"></the-input>

                <the-input name="password" type="password" label="Password" placeholder="Password" validate="required|lowercase_and_numbers_only|minmax:8,15" :value="authStore.$state.form.password" @input="handleInput"></the-input>

                <the-input name="password_confirmation" type="password" label="Confirm Password" placeholder="Password" validate="required|same_as_password:password" :value="authStore.$state.form.password_confirmation" @input="handleInput"></the-input>
                <the-button>Get started</the-button>
            </CustomForm>
            <button type="submit" class="w-[360px] border border-white rounded-[8px] h-[38px]" >G Sign up with Google</button>
            <div class="mb-[53px] mt-[32px] flex items-center justify-center" >
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
import { useAuthStore } from '../stores/registration/index';

export default {
    setup() {
    const authStore = useAuthStore();

    const handleInput = (payload) => {
        authStore.setUser(payload)
    }

    const onSubmit = () => {
        authStore.registerUser(authStore.$state.form)
    }
    return {
        authStore,
        handleInput,
        onSubmit
    }
  },
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