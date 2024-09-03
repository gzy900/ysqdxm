/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import SubLayout from '@/layout/subLayout'

const clothesRouter = {
  path: '/clothes',
  component: Layout,
  redirect: 'noRedirect',
  name: 'clothes',
  meta: {
    title: '心电衣',
    icon: 'chart'
  },
  children: [
    {
      path: '/clothes-user',
      component: SubLayout,
      children: [
        {
          path: '/clothes-user-index',
          component: () => import('@/views-clothes/user/index'),
          name: 'clothes-user',
          meta: { title: '用户管理', icon: 'host', noCache: true }
        }
      ]
    },
    {
      path: '/clothes-motion',
      component: SubLayout,
      redirect: '/clothes-motion-group',
      meta: { title: '运动视频', icon: 'host', noCache: true },
      children: [
        {
          path: '/clothes-motion-group',
          component: () => import('@/views-clothes/motion/motion-group'),
          name: 'clothes-motion-group',
          meta: { title: '运动视频组', icon: 'host', noCache: true }
        },
        {
          path: '/clothes-motion-index',
          component: () => import('@/views-clothes/motion/index'),
          name: 'clothes-motion',
          meta: { title: '运动视频', icon: 'host', noCache: true }
        }
      ]
    },
    {
      path: '/clothes-dictionaries',
      component: SubLayout,
      children: [
        {
          path: '/clothes-dictionaries-index',
          component: () => import('@/views-clothes/dictionaries/index'),
          name: 'clothes-dictionaries',
          meta: { title: '字典管理', icon: 'host', noCache: true }
        }
      ]
    },
    {
      path: '/clothes-user-feedback',
      component: SubLayout,
      children: [
        {
          path: '/clothes-user-feedback-index',
          component: () => import('@/views-clothes/user-feedback/index'),
          name: 'clothes-user-feedback',
          meta: { title: '用户反馈', icon: 'host', noCache: true }
        }
      ]
    },
    {
      path: '/clothes-edition',
      component: SubLayout,
      children: [
        {
          path: '/clothes-edition-index',
          component: () => import('@/views-clothes/edition/index'),
          name: 'clothes-edition',
          meta: { title: '版本管理', icon: 'host', noCache: true }
        }
      ]
    },
    {
      path: '/mini',
      component: SubLayout,
      meta: { title: '小程序', icon: 'host', noCache: true },
      children: [
        {
          path: '/mini-user',
          component: () => import('@/views-clothes/mini/user'),
          name: 'mini-user',
          meta: { title: '用户管理', icon: 'host', noCache: true }
        },
        {
          path: '/mini-order',
          component: () => import('@/views-clothes/mini/order'),
          name: 'mini-order',
          meta: { title: '订单管理', icon: 'host', noCache: true }
        },
        {
          path: '/mini-taocan',
          component: () => import('@/views-clothes/mini/taocan'),
          name: 'mini-taocan',
          meta: { title: '套餐管理', icon: 'host', noCache: true }
        },
      ]
    },
  ]
}

export default clothesRouter
