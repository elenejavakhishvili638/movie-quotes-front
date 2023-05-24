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
        min: '{field} must have at least 0:{min} symbols'
      },
      names: {
        // For English version, This will be auto generated according to the keys.
        // so best practice would be to write correct names in rules from the start.
        // no need to write custom names property for english version.
      }
    },
    ka: {
      ...ka,
      messages: {
        required: 'გთხოვთ შეავსოთ მოცემული ველი',
        email: 'თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს',
        min: '{field} უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს'
      },
      names: {
        password: 'პაროლი',
        username: 'მომხმარებლის სახელი',
        email: 'მეილი'
      }
    }
  })
})

setLocale('en')
