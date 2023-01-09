import Layout from '@/layout/index.vue'

export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }

  ]
}
