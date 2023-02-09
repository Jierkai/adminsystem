import Layout from '@/layout/index.vue'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Employees',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工管理',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id',
      name: 'EmployeesDetail',
      hidden: true,
      component: () => import('@/views/employees/components/details/Detail.vue'),
      meta: {
        title: '员工详情'
      }
    },
    {
      path: 'print/:id',
      name: 'PrintPage',
      hidden: true,
      component: () => import('@/views/employees/components/details/PrintPage.vue'),
      meta: {
        title: '打印信息'
      }
    }

  ]
}
