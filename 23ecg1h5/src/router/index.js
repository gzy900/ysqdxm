import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/404',
    component: () => import('../views/error-page/404'),
    name: '404'
  },
  // 隐私协议
  {
    path: '/privacy-agreement',
    component: () => import('../views/agreement/privacy-agreement'),
    name: 'privacy-agreement',
    meta: {
      title: '隐私政策条款'
    },
    title: '隐私政策条款'
  },
  // 用户协议
  {
    path: '/user-agreement',
    component: () => import('../views/agreement/user-agreement'),
    name: 'user-agreement',
    meta: {
      title: '用户服务协议'
    },
    title: '用户服务协议'
  },
  // 图表
  {
    path: '/health-trends/:s_id/:token',
    component: () => import('../views/health-trends/index'),
    name: 'health-trends'
  },
  // 预警报告
  {
    path: '/report-early/:l_id',
    component: () => import('../views/report/report-early'),
    name: 'report-early'
  },

  // 图表
  {
    path: '/health',
    component: () => import('../views/health-12/index'),
    name: 'health'
  },
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
