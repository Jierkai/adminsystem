import store from '@/store'
import router from '@/router'
import nprogress from 'nprogress'

const whiteList = ['/404', '/login']
router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token

  nprogress.start()
  if (token) {
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/dashboard')
      nprogress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path }})
    }
  }
  nprogress.done()
})

router.afterEach((to, from) => {
  nprogress.done()
})

