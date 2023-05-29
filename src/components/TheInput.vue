<template>
    <div class="flex flex-col w-[360px] mb-[16px]">
        <label class="mb-[8px] text-base">{{ label }}</label>
        <Field class="h-[38px] bg-[#CED4DA] rounded-[4px] py-[7px] pl-[13px] outline-none" 
               :placeholder="placeholder" 
               :name="name" 
               :type="type" 
               :rules="validate"
               v-model="internalValue" />
        <ErrorMessage class="text-[#F15524] text-base mt-[6px] ml-[20px]" :name="name" />
    </div>
</template>

<script>
import {Field, ErrorMessage} from "vee-validate";
import { ref, watch } from 'vue';

export default {
    props: ['placeholder', 'label', 'name', 'type', 'validate', 'modelValue'],
    components: {
        Field,
        ErrorMessage
    },
    setup(props, { emit }) {
        const internalValue = ref(props.modelValue);

        watch(internalValue, newValue => {
            emit('update:modelValue', newValue);
        });

        return {
            internalValue
        }
    }
}
</script>