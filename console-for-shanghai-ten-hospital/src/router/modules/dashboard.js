import Layout from '@/layout'

export default {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  meta: { roles: ['ADMIN', 'DOCTOR'] },
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: { title: '综合看板', icon: 'dashboard', roles: ['ADMIN', 'DOCTOR'] }
  }]
}
