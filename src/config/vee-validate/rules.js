import { defineRule } from 'vee-validate'
import { required, min, email, confirmed } from '@vee-validate/rules'

defineRule('required', required)

defineRule('minmax', (value, [min, max]) => {
  if (!value || value.length < min || value.length > max) {
    return false
  }
  return true
})

defineRule('minSymbols', min)

defineRule('lowercase_and_numbers_only', (value) => {
  return /^[a-z0-9]+$/.test(value)
})

defineRule('email', email)

defineRule('confirmed', confirmed)

defineRule('arrayNotEmpty', (value) => {
  if ((value && value.length === 0) || value === undefined) {
    return false
  }
  return true
})

defineRule('english', (value) => {
  return /^[a-zA-Z0-9$@$!%*?&#^_. +,();-]+$/.test(value)
})

defineRule('georgian', (value) => {
  return /^[\u10A0-\u10FF\s0-9$@$!%*?&#^_.+,();-]+$/.test(value)
})
