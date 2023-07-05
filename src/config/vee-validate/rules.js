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

defineRule('minSymbols', (value, [min]) => {
  if (!value || value.length < min) {
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

defineRule('confirmed', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true
  }
  return false
})

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
