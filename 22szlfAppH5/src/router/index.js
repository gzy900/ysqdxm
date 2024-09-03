import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRoutes = [
    {
        path: '/404',
        component: () => import('../views/error-page/404'),
        name: '404'
    },
    // 明星医生，医疗资讯 文章详情
    {
        path: '/article-details/:id/:type',
        component: () => import('../views/article-details/index'),
        name: 'article-details',
        meta:{
            title:'文章详情'
        },
    },
    // 隐私协议
    {
        path: '/privacy-agreement',
        component: () => import('../views/agreement/privacy-agreement'),
        name: 'privacy-agreement',
        meta:{
            title:'隐私政策条款'
        },
        title: '隐私政策条款'
    },
    // 用户协议
    {
        path: '/user-agreement',
        component: () => import('../views/agreement/user-agreement'),
        name: 'user-agreement',
        meta:{
            title:'用户服务协议'
        },
        title:'用户服务协议'
    },
    // 心脏健康H5
    {
        path: '/heart-health',
        component: () => import('../views/heart-health/heart-health'),
        name: 'heart-health'
    },
    // 健康计划
    {
        path: '/health-plan/:id',
        component: () => import('../views/health-plan/index'),
        name: 'health-plan'
    },
    // 说明书
    {
        path: '/explain/:type',
        component: () => import('../views/explain'),
        name: 'explain'
    },
    // 健康计划
    {
        path: '/health-plan-a/:id',
        component: () => import('../views/health-plan-a/index'),
        name: 'health-plan-a'
    },
    // 私人医生
    {
        path: '/prvivate-doctor/:id',
        component: () => import('../views/prvivate-doctor/index'),
        name: 'prvivate-doctor'
    },
    // 判读报告
    {
        path: '/report/:type/:id',
        component: () => import('../views/report/index'),
        name: 'report'
    },
    // 判读报告 测试
    {
        path: '/report/88/',
        component: () => import('../views/report/report-test'),
        name: 'report-test'
    },
    // 健康趋势
    {
        path: '/health-trends/:type/:id',
        component: () => import('../views/health-trends/index'),
        name: 'health-trends'
    },
    // 健康趋势
    {
        path: '/health-trends-list',
        component: () => import('../views/health-trends/list'),
        name: 'health-trends-list'
    },
    // // 心率失常图表
    // {
    //     path: '/arrhythmia',
    //     component: () => import('../views/health-trends/arrhythmia'),
    //     name: 'arrhythmia'
    // },
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
