import Vue from 'vue'
import VueI18nEsm from 'vue-i18n'
import elementEN from 'element-ui/lib/locale/lang/en'
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
import Cookies from 'js-cookie'

Vue.use(VueI18nEsm)

export default new VueI18nEsm({
  locale: Cookies.get('lang') || 'zh',
  messages: {
    en: {
      ...elementEN
    },
    zh: {
      ...elementZH
    }
  }
})
