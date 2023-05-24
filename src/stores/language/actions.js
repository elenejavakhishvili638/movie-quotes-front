import i18n from '../../config/i18n/index'
import { setLocale } from '@vee-validate/i18n'

export default {
  setLanguage(payload) {
    const { newLanguage, display } = payload
    setLocale(newLanguage)
    i18n.global.locale = newLanguage
    this.currentLanguage = newLanguage
    this.display = display
  }
}
