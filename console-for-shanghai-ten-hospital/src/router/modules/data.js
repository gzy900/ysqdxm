import Layout from '@/layout'

export default {
  path: '/data',
  component: Layout,
  meta: { title: '数据管理', icon: 'excel', roles: ['ADMIN', 'ASSISTANT', 'DOCTOR'] },
  children: [
    {
      path: 'report',
      component: () => import('@/views/report/index'),
      meta: { title: '数据列表', icon: 'table' },
      children: [
        {
          path: '',
          hidden: true,
          component: () => import('@/views/report/default')
        }
      ]
    }
  ]
}
