import Layout from '@/layout'

export default {
  path: '/device',
  component: Layout,
  alwaysShow: true,
  name: 'Device',
  meta: { title: '设备管理', icon: 'example', roles: ['ADMIN'] },
  children: [
    {
      path: 'pressure',
      component: () => import('@/views/device/index'),
      meta: { title: '所有设备', icon: 'table' },
      children: [
        {
          path: '',
          hidden: true,
          component: () => import('@/views/device/default')
        },
        {
          path: 'add',
          hidden: true,
          component: () => import('@/views/device/add'),
          meta: { title: '添加', icon: 'table' }
        },
        {
          path: 'batch',
          hidden: true,
          component: () => import('@/views/device/batch'),
          meta: { title: '批量添加', icon: 'table' }
        },
        {
          path: 'edit',
          hidden: true,
          component: () => import('@/views/device/edit'),
          meta: { title: '编辑', icon: 'table' }
        }
      ]
    }
  ]
}
