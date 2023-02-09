import Layout from '@/layout/index.vue'

export default {
  path: '/settings',
  component: Layout,
  children: [
    {
      name: 'Setting',
      path: '',
      component: () => import('@/views/setting'),
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }

  ]
}
