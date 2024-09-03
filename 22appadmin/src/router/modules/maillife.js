/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import SubLayout from '@/layout/subLayout'

const mailLifeRouter = {
  path: '/mail-life',
  component: Layout,
  redirect: '/user-manager',
  name: 'mail-life',
  meta: {
    title: '脉迩生活',
    icon: 'table'
  },
  children: [
    {
      path: '/permission',
      redirect: '/permission/accountRole',
      alwaysShow: true, // will always show the root menu
      name: 'Permission',
      hidden: true,
      meta: {
        title: '权限管理',
        icon: 'tree',
        roles: ['admin', 'editor'] // you can set roles in root nav
      },
      children: [
        {
          path: 'AccountRole',
          component: () => import('@/views/permission/accountRole'),
          name: 'AccountRole',
          meta: {
            title: '账户权限',
            roles: ['admin']
          }
        },
        {
          path: 'role',
          component: () => import('@/views/permission/role'),
          name: 'RolePermission',
          meta: {
            title: '角色权限',
            roles: ['admin']
          }
        }
      ]
    },
    {
      path: '/user-manager',
      component: SubLayout,
      redirect: '/user-manager',
      // alwaysShow: true, // will always show the root menu
      name: 'user-manager',
      meta: {
        title: '用户管理',
        icon: 'peoples'
      },
      children: [
        {
          path: 'user-manager',
          component: () => import('@/views/user-manager/index'),
          name: 'user-manager-index',
          meta: {
            title: '用户管理',
            icon: 'user'
          }
        },
        {
          path: 'real-name-audit',
          component: () => import('@/views/user-manager/real-name-audit'),
          name: 'real-name-audit',
          meta: {
            title: '实名审核',
            icon: 'user'
          }
        },
        {
          path: 'user-illness',
          component: () => import('@/views/user-manager/user-illness'),
          name: 'user-illness',
          meta: {
            title: '用户病种',
            icon: 'user'
          }
        }
      ]
    },
    // {
    //   path: '/star-doctor',
    //   component: Layout,
    //   redirect: '/star-doctor',
    //   // alwaysShow: true, // will always show the root menu
    //   name: 'star-doctor',
    //   meta: {
    //     title: '明星医生',
    //     icon: 'people'
    //   },
    //   children: [
    //     {
    //       path: 'star-doctor',
    //       component: () => import('@/views/star-doctor/index'),
    //       name: 'star-doctor-index',
    //       meta: {
    //         title: '明星医生'
    //       }
    //     }
    //   ]
    // },
    // {
    //   path: '/medical-info',
    //   component: Layout,
    //   redirect: '/medical-info',
    //   // alwaysShow: true, // will always show the root menu
    //   name: 'medical-info',
    //   meta: {
    //     title: '医疗资讯',
    //     icon: 'international'
    //   },
    //   children: [
    //     {
    //       path: 'medical-info',
    //       component: () => import('@/views/medical-info/index'),
    //       name: 'medical-info-index',
    //       meta: {
    //         title: '医疗资讯'
    //       }
    //     }
    //   ]
    // },
    {
      path: '/private-doctor',
      component: SubLayout,
      redirect: '/private-doctor',
      // alwaysShow: true, // will always show the root menu
      name: 'private-doctor',
      meta: {
        title: '私人医生',
        icon: 'user'
      },
      children: [
        {
          path: 'private-doctor',
          component: () => import('@/views/private-doctor/index'),
          name: 'private-doctor-index',
          meta: {
            title: '私人医生',
            icon: 'user'
          }
        }
      ]
    },

    {
      path: '/health-plan',
      component: SubLayout,
      redirect: '/health-plan',
      // alwaysShow: true, // will always show the root menu
      name: 'health-plan',
      meta: {
        title: '健康计划',
        icon: 'edit'
      },
      children: [
        {
          path: 'big-health-plan',
          component: () => import('@/views/health-plan/big-plan'),
          name: 'big-health-plan',
          meta: {
            title: '大计划模板',
            icon: 'edit'
          }
        },
        // {
        //   path: 'small-health-plan',
        //   component: () => import('@/views/health-plan/small-plan'),
        //   name: 'small-health-plan-index',
        //   meta: {
        //     title: '小计划'
        //   }
        // },
        {
          path: 'small-plan-tem',
          component: () => import('@/views/health-plan/small-plan-tem'),
          name: 'small-plan-tem',
          meta: {
            title: '小计划模板',
            icon: 'user'
          }
        }
        // ,
        // {
        //   path: 'health-plan',
        //   component: () => import('@/views/health-plan/index'),
        //   name: 'health-plan-index',
        //   meta: {
        //     title: '用户计划'
        //   }
        // }
      ]
    },
    {
      path: '/set-meal',
      component: SubLayout,
      redirect: '/set-meal',
      // alwaysShow: true, // will always show the root menu
      name: 'set-meal',
      meta: {
        title: '套餐管理',
        icon: 'example'
      },
      children: [
        {
          path: 'set-meal',
          component: () => import('@/views/set-meal/index'),
          name: 'set-meal-index',
          meta: {
            title: '套餐管理',
            icon: 'user'
          }
        },
        {
          path: 'set-meal/set-meal-code',
          component: () => import('@/views/set-meal/code'),
          name: 'set-meal-code',
          meta: {
            title: '兑换码',
            icon: 'user'
          }
        },
        // {
        //   path: 'set-meal/set-meal-code-zip',
        //   component: () => import('@/views/set-meal/code-zip'),
        //   name: 'set-meal-code-zip',
        //   meta: {
        //     title: '兑换码压缩下载'
        //   }
        // }
      ]
    },
    {
      path: '/message-push',
      component: SubLayout,
      redirect: '/message-push',
      // alwaysShow: true, // will always show the root menu
      name: 'message-push',
      meta: {
        title: '消息推送',
        icon: 'guide'
      },
      children: [
        {
          path: 'message-push',
          component: () => import('@/views/message-push/index'),
          name: 'message-push-index',
          meta: {
            title: '消息推送',
            icon: 'user'
          }
        }
      ]
    },
    {
      path: '/system-settings',
      component: SubLayout,
      redirect: '/system-settings',
      // alwaysShow: true, // will always show the root menu
      name: 'system-settings',
      hidden: true,
      meta: {
        title: '系统设置',
        icon: 'component'
      },
      children: [
        {
          path: 'system-settings',
          component: () => import('@/views/system-settings/index'),
          name: 'system-settings-index',
          meta: {
            title: '系统设置',
            icon: 'user'
          }
        }
      ]
    },
    {
      path: '/version-control',
      component: SubLayout,
      redirect: '/version-control',
      // alwaysShow: true, // will always show the root menu
      name: 'version-control',
      hidden: true,
      meta: {
        title: '版本控制',
        icon: 'dashboard'
      },
      children: [
        {
          path: 'version-control',
          component: () => import('@/views/version-control/index'),
          name: 'version-control-index',
          meta: {
            title: '版本控制',
            icon: 'user'
          }
        }
      ]
    },

    {
      path: '/primary-doctor',
      component: SubLayout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/primary-doctor/index'),
          name: 'primary-doctor',
          meta: {title: '主治医生', icon: 'host', noCache: true}
        }
      ]
    },

    {
      path: '/medical-history',
      component: SubLayout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/medical-history/index'),
          name: 'medical-history',
          meta: {title: '病史模板', icon: 'host', noCache: true}
        }
      ]
    },
    {
      path: '/organization',
      component: SubLayout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/organization/index'),
          name: 'organization',
          meta: {title: '机构管理', icon: 'host', noCache: true}
        }
      ]
    }
  ]
}

export default mailLifeRouter
