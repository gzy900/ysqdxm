/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import SubLayout from '@/layout/subLayout'

const otherRouter = {
  path: '/other',
  component: Layout,
  redirect: '/other-big',
  name: 'other',
  meta: {
    title: '其他',
    icon: 'table'
  },
  children: [
    {
      path: '/other-big',
      component: SubLayout,
      children: [
        {
          path: 'index',
          component: () => import('@/views-other/big/index'),
          name: 'other-big',
          meta: { title: '大屏', icon: 'host', noCache: true }
        }
      ]
    }
  ]
}

export default otherRouter
