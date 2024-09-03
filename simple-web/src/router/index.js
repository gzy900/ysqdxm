/**
 * index.js Created by xh on 2017-10-9
 */
import Vue from 'vue'
import Router from 'vue-router'

// 架子
import App from '@/App'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          component: () => import('@/pages/default'),
          children: [
            // 动态
            {
              path: 'dynamic',
              component: () => import('@/pages/home'),
              name: 'dynamic',
              meta: {
                title: '健康报告'
              }
            },
            // 记录
            {
              path: 'record',
              component: () => import('@/pages/recordDefault'),
              meta: {
                title: '记录'
              },
              children: [
                {
                  path: 'record/:type?',
                  component: () => import('@/pages/record'),
                  meta: {
                    title: '记录'
                  }
                }
              ]
            },
            // 用户中心
            {
              path: 'user',
              component: () => import('@/pages/userDefault'),
              meta: {
                title: '个人中心'
              },
              children: [
                {
                  path: 'info',
                  component: () => import('@/pages/userInfo'),
                  meta: {
                    title: '个人资料'
                  }
                }
              ]
            }
          ]
        },
        {
          path: '/bindMobile', // 绑定手机
          component: () => import('@/pages/bindMobile'),
          meta: {
            title: '更新资料'
          }
        },
        {
          path: 'warn',
          component: () => import('@/pages/warn'),
          meta: {
            title: '提示'
          }
        },
        {
          path: '/collect',
          component: () => import('@/pages/collect'),
          meta: {
            title: 'SIMPLE成员招募'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
