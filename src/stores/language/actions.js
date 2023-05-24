import i18n from '../../config/i18n/index'

export default {
  setLanguage(payload) {
    const { newLanguage, display } = payload
    i18n.global.locale = newLanguage
    this.currentLanguage = newLanguage
    this.display = display
  }
}
