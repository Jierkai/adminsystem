import store from '@/store'
import router from '@/router'
import nprogress from 'nprogress'

const whiteList = ['/404', '/login']
router.beforeEach(async(to, from, next) => {
  const token = store.getters.token
  nprogress.start()
  if (token) {
    if (!store.getters.userId) {
      const res = await store.dispatch('user/getUserInfo')
      await store.dispatch('router/filterRoutes', res)
      next({ ...to, replace: true })
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

