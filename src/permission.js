import store from '@/store'
import router from '@/router'
import nprogress from 'nprogress'

const whiteList = ['/404', '/login']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  nprogress.start()
  if (token) {
    if (!store.getters.name) {
      store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    } else {
      next(to.query.redirect)
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path }})
    }
  }
})

router.afterEach((to, from) => {
  nprogress.done()
})

