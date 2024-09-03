import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/Documentation',
    children: [
      {
        path: '/Documentation',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: '个人中心', icon: 'documentation', affix: true }
      }
    ]
  },

  {
    path: '/wc-report',
    component: Layout,
    redirect: '/wc-report-index',
    meta: { title: '小程序反馈', icon: 'documentation' },
    children: [
      {
        path: '/wc-report-index',
        component: () => import('@/views/feedback/wcReport1'),
        name: 'wc-report',
        meta: { title: '小程序反馈', icon: 'documentation' }
      },
      {
        path: '/wc-check',
        component: () => import('@/views/feedback/wcCheck'),
        name: 'wc-check',
        meta: { title: '小程序审核', icon: 'documentation' }
      }
    ]
  },

  {
    path: '/heart-clothes',
    component: Layout,
    redirect: '/heart-clothes/index',
    meta: { title: '心电衣', icon: 'documentation' },
    children: [
      {
        path: '/heart-clothes/index',
        component: () => import('@/views/heart-clothes/index_new'),
        name: 'heart-clothes',
        meta: { title: '心电衣', icon: 'documentation' }
      }
    ]
  }
  // {
  //   path: '/heart-clothes',
  //   component: Layout,
  //   redirect: '/heart-clothes-warning',
  //   meta: { title: '心电衣反馈', icon: 'documentation' },
  //   children: [
  //     {
  //       path: '/heart-clothes-warning',
  //       component: () => import('@/views/heart-clothes/index'),
  //       name: 'heart-clothes-warning',
  //       meta: { title: '心电衣-预警', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/reply',
  //   component: Layout,
  //   redirect: '/reply-index',
  //   children: [
  //     {
  //       path: '/reply-index',
  //       component: () => import('@/views/reply/index'),
  //       name: 'reply-index',
  //       meta: { title: '快速回复', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },

  //
  // {
  //   path: '/week-report',
  //   component: Layout,
  //   meta: { title: '周报反馈', icon: 'documentation' },
  //   children: [
  //     {
  //       path: '/week-report-index',
  //       component: () => import('@/views/feedback/week-report'),
  //       name: 'week-report',
  //       meta: { title: '周报反馈', icon: 'documentation' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/feedback',
  //   component: Layout,
  //   meta: { title: '测量反馈', icon: 'documentation' },
  //   children: [
  //     {
  //       path: '/feedback-index',
  //       component: () => import('@/views/feedback/index'),
  //       name: 'feedback',
  //       meta: { title: '心率失常反馈', icon: 'documentation' }
  //     },
  //     {
  //       path: '/cardiac-load',
  //       component: () => import('@/views/feedback/cardiac-load'),
  //       name: 'cardiac-load',
  //       meta: { title: '心脏负荷反馈', icon: 'documentation' }
  //     },
  //     {
  //       path: '/blood-pressure',
  //       component: () => import('@/views/feedback/blood-pressure'),
  //       name: 'blood-pressure',
  //       meta: { title: '血压反馈', icon: 'documentation' }
  //     },
  //     {
  //       path: '/BMI',
  //       component: () => import('@/views/feedback/BMI'),
  //       name: 'BMI',
  //       meta: { title: 'BMI反馈', icon: 'documentation' }
  //     },
  //     // {
  //     //   path: '/motion',
  //     //   component: () => import('@/views/feedback/motion'),
  //     //   name: 'motion',
  //     //   meta: { title: '运动反馈', icon: 'documentation' }
  //     // },
  //     // {
  //     //   path: '/smoke',
  //     //   component: () => import('@/views/feedback/smoke'),
  //     //   name: 'smoke',
  //     //   meta: { title: '吸烟反馈', icon: 'documentation' }
  //     // }
  //   ]
  // },
  //
  // {
  //   path: '/verify',
  //   component: Layout,
  //   redirect: '/verify-index',
  //   meta: { title: '审核', icon: 'documentation' },
  //   children: [
  //     {
  //       path: '/verify-index',
  //       component: () => import('@/views/verify/index'),
  //       name: 'verify',
  //       meta: { title: '反馈审核', icon: 'documentation' }
  //     },
  //     {
  //       path: '/week-verify',
  //       component: () => import('@/views/verify/week-verify'),
  //       name: 'week-verify',
  //       meta: { title: '周报审核', icon: 'documentation' }
  //     },
  //   ]
  // },
  //
  // {
  //   path: '/power',
  //   component: Layout,
  //   meta: { title: '医生管理', icon: 'documentation', affix: false },
  //   children: [
  //     {
  //       path: '/doctor-power',
  //       component: () => import('@/views/power/doctor-power'),
  //       name: 'doctor-power',
  //       meta: { title: '医生管理' }
  //     },
  //     {
  //       path: '/power-manage',
  //       component: () => import('@/views/power/index'),
  //       name: 'power-manage',
  //       meta: { title: '权限管理' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/record',
  //   component: Layout,
  //   meta: { title: '操作记录', icon: 'documentation', affix: false },
  //   children: [
  //     {
  //       path: '/record-index',
  //       component: () => import('@/views/record/index'),
  //       name: 'record-index',
  //       meta: { title: '操作记录' }
  //     },
  //     {
  //       path: '/record-type',
  //       component: () => import('@/views/record/record-type'),
  //       name: 'record-type',
  //       meta: { title: '操作类型' }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
