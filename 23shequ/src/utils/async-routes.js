import Layout from '@/layout/index'

const _import = require('@/router/_import_' + process.env.NODE_ENV)

export function reAsyncRoutes(router) {
  const routerList = router || []
  const faterList = {}
  const oterList = {}
  for (let i = 0; i < routerList.length; i++) {
    if (routerList[i].component === 'Layout') {
      const faterItem = {
        path: routerList[i].path,
        component: Layout,
        meta: { title: routerList[i].remark, icon: routerList[i].icon },
        children: []
      }
      faterList[routerList[i].permissionId] = faterItem
    } else {
      let path = routerList[i].component.replace('@/views-page/', '')
      // if (path.indexOf('group') < 0 && path.indexOf('patient-info') < 0) {
      //   path += '/index'
      // }

      const oterItem = {
        path: routerList[i].path,
        component: _import(path),
        // component: () => import(`@/views/${path}`),
        name: routerList[i].name,
        meta: { title: routerList[i].remark, icon: routerList[i].icon }
      }
      if (!oterList[routerList[i].parentPermissionId]) {
        oterList[routerList[i].parentPermissionId] = []
      }
      oterList[routerList[i].parentPermissionId].push(oterItem)
    }
  }

  const asyncRoutes = []
  for (const fItem in faterList) {
    for (const oItem in oterList) {
      if (fItem === oItem) {
        faterList[fItem].children = oterList[oItem]
      }
    }
    asyncRoutes.push(faterList[fItem])
  }
  return asyncRoutes
}
