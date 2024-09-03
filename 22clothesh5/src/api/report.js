import request from '../utils/request.js'

export function getDoctorReport(params) {
    return request({
        url: '/report/docReport', method: 'get', params
    })
}

export function getReport(params) {
    return request({
        url: `/report/detail/${params.reportId}/${params.type}`,
        method: 'get',
    })
}

export function getWeek(params) {

    return request({
        url: `/report/week/detail/${params.uuid}/${params.startTime}/${params.endTime}`,
        method: 'get',
    })
}