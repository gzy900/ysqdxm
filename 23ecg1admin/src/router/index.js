import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

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
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/ECG1-user',
    component: Layout,
    redirect: '/ECG1-user',
    children: [
      {
        path: 'ECG1-user',
        component: () => import('@/views/user/user'),
        name: 'ECG1-user',
        meta: { title: '用户管理', icon: 'documentation' }
      }
    ]
  },

  {
    path: '/ECG1-order',
    component: Layout,
    redirect: '/ECG1-order',
    children: [

      {
        path: 'ECG1-order',
        component: () => import('@/views/order/order'),
        name: 'ECG1-order',
        meta: { title: '订单管理', icon: 'documentation' }
      },
    ]
  },

  {
    path: '/ECG1-org-tree',
    component: Layout,
    redirect: '/ECG1-org-tree',
    children: [

      {
        path: 'ECG1-org-tree',
        component: () => import('@/views/org/org'),
        name: 'ECG1-org-tree',
        meta: { title: '机构管理tree', icon: 'documentation' }
      },
    ]
  },

  {
    path: '/ECG1-org',
    component: Layout,
    redirect: '/ECG1-org',
    children: [

      {
        path: 'ECG1-org',
        component: () => import('@/views/group/index'),
        name: 'ECG1-org',
        meta: { title: '机构管理', icon: 'documentation' }
      },
    ]
  },

  {
    path: '/ECG1-data',
    component: Layout,
    redirect: '/ECG1-data',
    children: [

      {
        path: 'ECG1-data',
        component: () => import('@/views/data/data'),
        name: 'ECG1-data',
        meta: { title: '数据管理', icon: 'documentation' }
      },
    ]
  },

  {
    path: '/ECG1-device',
    component: Layout,
    redirect: '/ECG1-device',
    children: [

      {
        path: 'ECG1-device',
        component: () => import('@/views/device/device'),
        name: 'ECG1-device',
        meta: { title: '设备管理', icon: 'documentation' }
      },
    ]
  },

  {
    path: '/ECG1-doctor',
    component: Layout,
    redirect: '/ECG1-doctor',
    children: [

      {
        path: 'ECG1-doctor',
        component: () => import('@/views/doctor/doctor'),
        name: 'ECG1-doctor',
        meta: { title: '医生管理', icon: 'documentation' }
      },
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/user-manage-admin',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/user-manage-admin/index'),
        name: 'user-manage-admin',
        meta: { title: '后台用户', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/user-manage-app',
    component: Layout,
    redirect: '/index',
    meta: { title: 'APP用户', icon: 'dashboard' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user-manager-app/index'),
        name: 'user-manager-app',
        meta: { title: 'APP用户', icon: 'dashboard' }
      },
      {
        path: 'real-name',
        component: () => import('@/views/user-manager-app/real-name'),
        name: 'real-name',
        meta: { title: '实名认证', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/ECG-data',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/ECG-data/index'),
        name: 'ECG-data',
        meta: { title: '心电数据', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/edition',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/edition/index'),
        name: 'edition',
        meta: { title: '版本控制', icon: 'dashboard' }
      }
    ]
  },

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
