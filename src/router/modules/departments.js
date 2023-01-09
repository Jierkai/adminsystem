import Layout from '@/layout/index.vue'

export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      path: '',
      name: 'departments',
      component: () => import('@/views/departments'),
      meta: {
        title: '部门',
        icon: 'tree'
      }
    }
  ]
}
