import { defineRule } from 'vee-validate'

defineRule('required', (value) => {
  return !!value && !!value.length
})
