import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import 'nprogress/nprogress.css'
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directive from '@/directives'
import plugin from '@/components/Plugin'
import filter from '@/filter'
import FullScreen from '@/components/FullScreen/index.vue'
import '@/styles/element-variables.sass'
import i18n from '@/utils/lang'

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently, MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.use(plugin)
Object.keys(directive).forEach(i => {
  Vue.directive(i, directive[i])
})

Object.keys(filter).forEach(i => {
  Vue.filter(i, filter[i])
})

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.component('FullScreen', FullScreen)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
