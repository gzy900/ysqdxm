import axios from 'axios'

console.log(12344444444)
console.log(import.meta.env.VITE_BASE_URL_ECG1)

const service = axios.create({

    baseURL: import.meta.env.VITE_BASE_URL_ECG1,
    timeout: 50000,
})

service.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'test'
        return config
    },
    error => {
        return error
    }
)

service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return error
    }
)
export default service