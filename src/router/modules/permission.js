import Layout from '@/layout/index.vue'

export default {
  path: '/permission',
  component: Layout,
  children: [
    {
      name: 'Permission',
      path: '',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }

  ]
}
