import Layout from '@/layout/index.vue'

export default {
  path: '/attendances',
  component: Layout,
  children: [
    {
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances'),
      meta: {
        title: '考勤',
        icon: 'skill'
      }
    }
  ]
}
