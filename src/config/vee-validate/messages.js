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
        confirmed: 'Password should be the same',
        lowercase_and_numbers_only: 'Only number and lower case latin symbols should be used',
        arrayNotEmpty: 'This field is required',
        english: 'This field should be in English',
        georgian: 'This field should be in Georgian',
        min: 'This field must be more than 0:{min} characters',
        max: 'This field must be less than 0:{max} characters'
      },
      names: {
        password_confirmation: 'Password',
        updatedPassword: 'Password',
        updatedUsername: 'Username',
        updatedEmail: 'Email'
      }
    },
    ka: {
      ...ka,
      messages: {
        required: 'გთხოვთ შეავსოთ მოცემული ველი',
        email: 'თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს',
        confirmed: 'პაროლი არ ემთხვევა',
        lowercase_and_numbers_only: 'ტექსტი უნდა შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს და ციფრებს',
        arrayNotEmpty: 'გთხოვთ შეავსოთ მოცემული ველი',
        english: 'ველი უნდა შეიცავდეს მხოლოდ ინგლისურ ანბანს',
        georgian: 'ველი უნდა შეიცავდეს მხოლოდ ქართულ ანბანს',
        min: 'ველი უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს',
        max: 'ველი უნდა შეიცავდეს მაქსიმუმ 0:{max} სიმბოლოს'
      },
      names: {
        password: 'პაროლი',
        username: 'მომხმარებლის სახელი',
        email: 'მეილი',
        password_confirmation: 'პაროლი',
        updatedPassword: 'პაროლი',
        updatedUsername: 'მომხმარებლის სახელი',
        updatedEmail: 'მეილი'
      }
    }
  })
})

setLocale('en')
