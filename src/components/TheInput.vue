<template>
    <div class="flex flex-col w-[360px] mb-[16px]" >
        <label class="mb-[8px] text-base" >{{ label }}</label>
        <Field class="h-[38px] bg-[#CED4DA] rounded-[4px] py-[7px] pl-[13px] outline-none"  :placeholder="placeholder" :name="name" :type="type" @input="handleInput($event.target.value, name)" :rules="validate"   />
        <ErrorMessage class="text-[#F15524] text-base mt-[6px] ml-[20px]" :name="name" />
    </div>
</template>

<script>
import {Field, ErrorMessage} from "vee-validate";

export default {
    props: ['placeholder', 'label', 'name', 'type', 'value', 'validate'],
    components: {
        Field,
        ErrorMessage
    },
    setup(props, context) {
        const handleInput = (value, name) => {
            context.emit('input', { name, value });
        }

        return {
            ...props,
            handleInput
        }
    }
}
</script>