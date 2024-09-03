import request from '../util/request.js'

export function getData(data) {
    return request({
        url: '/api/content',
        method: 'get',
        data
    })
}