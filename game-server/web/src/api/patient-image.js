import request from '../utils/request'
export function getList(data) {
    return request({
        url:'http://192.168.10.81:8889/counts',
        method: 'get',
        params: data
    })
}
