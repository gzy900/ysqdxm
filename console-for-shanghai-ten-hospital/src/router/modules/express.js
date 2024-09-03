import Layout from '@/layout'

export default {
  path: '/express',
  component: Layout,
  meta: { title: '快递管理', icon: 'shopping', roles: ['ADMIN', 'ASSISTANT', 'DOCTOR'] },
  children: [
    {
      path: 'patient',
      component: () => import('@/views/express/index'),
      meta: { title: '发药患者', icon: 'email' },
      children: [
        {
          path: '',
          hidden: true,
          component: () => import('@/views/express/patient'),
          meta: { title: '发药患者', icon: 'email' },
        },
        {
          path: 'add',
          hidden: true,
          component: () => import('@/views/express/add-patient'),
          meta: { title: '增加药物更换患者', icon: 'email' },
        }
      ]
    },
    {
      path: 'history',
      component: () => import('@/views/express/index'),
      meta: { title: '发货历史', icon: 'tree-table' },
      children: [
        {
          path: '',
          hidden: true,
          component: () => import('@/views/express/history')
        }
      ]
    },
    {
      path: 'export',
      component: () => import('@/views/express/index'),
      meta: { title: '导出', icon: 'skill' },
      children: [
        {
          path: '',
          hidden: true,
          component: () => import('@/views/express/export')
        }
      ]
    }
  ]
}
