<template>
    <div class="h-screen w-full md:rounded-[10px] overflow-scroll md:w-[538px] md:h-[414px] bg flex flex-col justify-center items-center rounded-[10px]" >
            <img :src="logo" />
            <h1 class="text-white text-[32px] font-medium mb-[21px]" >Thank you!</h1>
            <p class=" w-[357px] text-center text-white text-[16px] mb-[40px]" >{{ modalText }}</p>
            <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['text', 'icon'],
    setup(props) {
        console.log(props)
        return {
            logo: props.icon,
            modalText: props.text
        }
    }
}
</script>

<style scoped>
div {
    background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%);
}

</style>