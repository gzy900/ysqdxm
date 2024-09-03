import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/404',
        component: () => import('../views/error-page/404'),
        name: '404'
    },
    // // 预警报告
    // {
    //     path: '/report-early/:l_id',
    //     component: () => import('../views/report/report-early'),
    //     name: 'report-early'
    // },

    // 游戏登录页
    {
        path: '/',
        component: () => import('../views/index/index'),
        name: 'index'
    },
    // 游戏登录页
    {
        path: '/luck',
        component: () => import('../views/luck/index'),
        name: 'luck'
    },
    // 游戏控制页
    {
        path: '/luck/control',
        component: () => import('../views/luck/control'),
        name: 'control'
    },
    // 游戏1
    {
        path: '/luck/game1',
        component: () => import('../views/luck/game1'),
        name: 'game1'
    },
    // 游戏2
    {
        path: '/luck/game2',
        component: () => import('../views/luck/game2'),
        name: 'game2'
    },
    // 游戏3
    {
        path: '/luck/game3',
        component: () => import('../views/luck/game3'),
        name: 'game3'
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
