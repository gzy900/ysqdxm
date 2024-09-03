import Layout from '@/layout/index'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
export function reAsyncRoutes(router) {
  const routerList = router || []
  const faterList = {}
  const oterList = {}
  console.log(router)
  for (let i = 0; i < routerList.length; i++) {
    if (routerList[i].component === 'Layout') {
      const faterItem = {
        path: routerList[i].path,
        component: Layout,
        meta: { title: routerList[i].title, icon: routerList[i].icon },
        children: []
      }
      faterList[routerList[i].jurisdictionId] = faterItem
    } else {
      const oterItem = {
        path: routerList[i].path,
        component: _import(routerList[i].component.replace('@/views/', '')),
        // component: () => import(`@/views/${path}`),
        name: routerList[i].name,
        meta: { title: routerList[i].title, icon: routerList[i].icon }
      }
      if (!oterList[routerList[i].father_component]) {
        oterList[routerList[i].father_component] = []
      }
      oterList[routerList[i].father_component].push(oterItem)
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
