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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
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
  //
  // {
  //   path: '/ECG1',
  //   component: Layout,
  //   redirect: '/ECG1-user',
  //   meta: { title: '一代心电衣', icon: 'documentation' },
  //   children: [
  //     {
  //       path: 'ECG1-user',
  //       component: () => import('@/../../../23ecg1admin/src/views/user/user'),
  //       name: 'ECG1-user',
  //       meta: { title: '用户管理', icon: 'documentation' }
  //     },
  //     {
  //       path: 'ECG1-doctor',
  //       component: () => import('@/../../../23ecg1admin/src/views/doctor/doctor'),
  //       name: 'ECG1-doctor',
  //       meta: { title: '医生管理', icon: 'documentation' }
  //     },
  //     {
  //       path: 'ECG1-device',
  //       component: () => import('@/../../../23ecg1admin/src/views/device/device'),
  //       name: 'ECG1-device',
  //       meta: { title: '设备管理', icon: 'documentation' }
  //     },
  //     {
  //       path: 'ECG1-data',
  //       component: () => import('@/../../../23ecg1admin/src/views/data/data'),
  //       name: 'ECG1-data',
  //       meta: { title: '数据管理', icon: 'documentation' }
  //     },
  //     {
  //       path: 'ECG1-org',
  //       component: () => import('@/../../../23ecg1admin/src/views/org/org'),
  //       name: 'ECG1-org',
  //       meta: { title: '机构管理', icon: 'documentation' }
  //     },
  //     {
  //       path: 'ECG1-order',
  //       component: () => import('@/../../../23ecg1admin/src/views/order/order'),
  //       name: 'ECG1-order',
  //       meta: { title: '订单管理', icon: 'documentation' }
  //     },
  //   ]
  // },

  {
    path: '/activity',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views-page/activity/activity'),
        name: 'activity',
        meta: { title: '活动日历', icon: 'people', affix: true }
      }
    ]
  },

  // './patient-info/index.vue
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/patient-info',
  //   children: [
  //     {
  //       path: 'patient-info',
  //       component: () => import('@/views-page/patient-info/index'),
  //       name: 'patient-info',
  //       meta: { title: '患者信息', icon: 'people', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/visit',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views-page/visit/index'),
  //       name: 'visit',
  //       meta: { title: '随访工作', icon: 'peoples' }
  //     }
  //   ]
  // },
  // {
  //   path: '/group',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views-page/group/index'),
  //       name: 'group',
  //       meta: { title: '机构信息', icon: 'peoples' }
  //     }
  //   ]
  // },
  // {
  //   path: '/doctor',
  //   component: Layout,
  //   meta: { title: '医生管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views-page/doctorManage/index'),
  //       name: 'doctor',
  //       meta: { title: '医生账户' }
  //     },
  //     {
  //       path: '/permission',
  //       component: () => import('@/views-page/permission/index'),
  //       name: 'permission',
  //       meta: { title: '权限管理' }
  //     }
  //   ]
  // },
  // {
  //   path: '/record',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views-page/operation/index'),
  //       name: 'record',
  //       meta: { title: '操作记录', icon: 'documentation' }
  //     }
  //   ]
  // },

  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
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
  { path: '*', redirect: '/404', hidden: true }
]

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
