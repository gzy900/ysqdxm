import request from '../utils/request-ecg1.js'

export function getReport(params) {
    return request({
        url: `/app/report/getDetail`,
        method: 'get',
        params
    })
}
