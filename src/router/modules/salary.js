import Layout from '@/layout/index.vue'

export default {
  path: '/salary',
  component: Layout,
  children: [
    {
      name: 'salary',
      path: '',
      component: () => import('@/views/salary'),
      meta: {
        title: '薪水',
        icon: 'money'
      }
    }

  ]
}
