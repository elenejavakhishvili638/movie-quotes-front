import { configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: 'This field is required',
        email: 'This input is not in email format',
        minmax: '{field} must be between 0:{min} and 1:{max} characters',
        same_as_password: 'Password should be the same',
        lowercase_and_numbers_only: 'Only number and lower case latin symbols should be used'
      },
      names: {
        password_confirmation: 'Password'
      }
    },
    ka: {
      ...ka,
      messages: {
        required: 'გთხოვთ შეავსოთ მოცემული ველი',
        email: 'თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს',
        minmax: '{field} უნდა შეიცავდეს მინიმუმ 0:{min} და მაქსიმუმ 1:{max} სიმბოლოს',
        same_as_password: 'პაროლი არ ემთხვევა',
        lowercase_and_numbers_only: 'ტექსტი უნდა შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს და ციფრებს'
      },
      names: {
        password: 'პაროლი',
        username: 'მომხმარებლის სახელი',
        email: 'მეილი',
        password_confirmation: 'პაროლი'
      }
    }
  })
})

setLocale('en')
