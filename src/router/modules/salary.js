import Layout from '@/layout/index.vue'

export default {
  path: '/salarys',
  component: Layout,
  children: [
    {
      name: 'Salary',
      path: '',
      component: () => import('@/views/salary'),
      meta: {
        title: '薪水',
        icon: 'money'
      }
    }

  ]
}
