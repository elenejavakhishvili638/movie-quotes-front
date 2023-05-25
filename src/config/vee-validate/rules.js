import { defineRule } from 'vee-validate'

defineRule('required', (value) => {
  return !!value && !!value.length
})

defineRule('minmax', (value, [min, max]) => {
  if (!value || value.length < min || value.length > max) {
    return false
  }
  return true
})

defineRule('lowercase_and_numbers_only', (value) => {
  return /^[a-z0-9]+$/.test(value)
})

defineRule('email', (value) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
})

defineRule('same_as_password', (value, [otherValue], { values }) => {
  return value === values[otherValue]
})
