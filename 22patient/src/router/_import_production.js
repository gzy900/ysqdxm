// module.exports = file => () => import(`@/views/${file}.vue`)
// module.exports = file => () => import('@/views/' + file + '.vue')
module.exports = file => require('@/views-page/' + file + '.vue').default
