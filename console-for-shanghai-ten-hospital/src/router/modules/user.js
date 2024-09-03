import Layout from '@/layout'

export default {
  path: '/user',
  component: Layout,
  alwaysShow: true,
  meta: { title: '患者管理', icon: 'user', roles: ['ADMIN', 'ASSISTANT', 'DOCTOR'] },
  children: [
    {
      path: 'patient',
      component: () => import('@/views/patient/index'),
      meta: { title: '所有患者', icon: 'table' },
      children: [
        {
          path: '',
          hidden: true,
          component: () => import('@/views/patient/default'),
        },
        {
          path: 'add',
          hidden: true,
          component: () => import('@/views/patient/add'),
          meta: { title: '添加', icon: 'table' }
        },
        {
          path: 'edit',
          hidden: true,
          component: () => import('@/views/patient/edit'),
          meta: { title: '编辑', icon: 'table' }
        },
        {
          path: 'plan/edit',
          hidden: true,
          component: () => import('@/views/patient/patient-plan-edit'),
          meta: { title: '计划编辑', icon: 'table' }
        },
        {
          path: 'detail/:id',
          hidden: true,
          component: () => import('@/views/patient/detail'),
          meta: { title: '数据详情', icon: 'table' }
        },
        {
          path: 'detail/:id/record',
          hidden: true,
          component: () => import('@/views/patient/record'),
          meta: { title: '数据报表', icon: 'table' }
        }
      ]
    },
    {
      path: 'task',
      component: () => import('@/views/patient/task/'),
      meta: { title: '每日任务', icon: 'tree' }
    },
    {
      path: 'recruit',
      component: () => import('@/views/patient/recruit'),
      meta: { title: '患者招募', icon: 'form' }
    }
  ]
}
