import Layout from '@/layout'

export default {
  path: '/system',
  component: Layout,
  alwaysShow: true,
  meta: { title: '系统配置', icon: 'nested', roles: ['ADMIN', 'ASSISTANT'] },
  children: [
    {
      path: 'export',
      component: () => import('@/views/config/index'),
      meta: { title: '提醒配置', icon: 'table' }
    },
    {
      path: 'account',
      component: () => import('@/views/config/account'),
      meta: { title: '账户配置', icon: 'user' }
    }
  ]
}
