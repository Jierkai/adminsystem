import Layout from '@/layout/index.vue'

export default {
  path: '/social_securitys',
  component: Layout,
  children: [
    {
      name: 'social',
      path: '',
      component: () => import('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }

  ]
}
