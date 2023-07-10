import { defineRule } from 'vee-validate'
import { required, min, email, confirmed, between } from '@vee-validate/rules'

defineRule('required', required)

defineRule('minmax', between)

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
