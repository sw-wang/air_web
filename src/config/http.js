import axios from 'axios'
import qs from 'qs'
import cookie from 'vue-cookie'
import { Notification, Loading } from 'element-ui'
let [loading, loadingTimer, notiTimer] = [null, false, false]

axios.defaults.baseURL = process.env.VUE_APP_API_DOMAIN
axios.defaults.timeout = parseInt(process.env.VUE_APP_DEFAULT_TIEMOUT)

axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        // IE 缓存bug fix
        if (config.method === 'get') {
            if (!config.params) config.params = {}
            config.params._r = Math.random()
        }
        // // 针对上传请求，单独设置超时时间
        if (config.data instanceof FormData && config.data.get && config.data.get('file') instanceof File) {
            config.timeout = parseInt(process.env.VUE_APP_UPLOAD_TIEMOUT)
        }
        config.withCredentials = true // 允许携带cookie
        let tokenInfo = JSON.parse(cookie.get('TOKENINFO') || '{}')
        if (tokenInfo.accessToken) {
            config.headers.xToken = tokenInfo.accessToken
        }
        // 1s 内如果有其他请求不显示loading
        !loadingTimer && (loading = Loading.service())
        loadingTimer = true
        setTimeout(() => {
            loadingTimer = false
        }, 1000)

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        loading.close()
        const responseData = response.data || {}
        const code = responseData.code
        const message = responseData.reason || responseData.message || responseData.msg || '系统错误，请重试！'
        let data = null
        if (code && code.includes('401')) {
            const url = window.location.href.replace(window.location.hash, '')
            window.location.replace(`${url}#/login`)
            /* eslint-disable */
            //  1s 内如果有其他请求不显示logout
            !notiTimer && Notification({ type: 'error', title: '提示', message: '登录信息过期，请重新登录' })
            notiTimer = true
            setTimeout(() => {
                notiTimer = false
            }, 1000)
            return Promise.reject({ code: 1, message: message || '登录信息过期，请重新登录' })
        }
        // 下载文件
        // if (code === undefined) {
        //     console.log('Bold')
        //     const url = window.URL.createObjectURL(new Blob([responseData]));
        //     console.log(url)
        //     window.open(url)
        //     return responseData
        // }
        // 只要 code !== 200 都当错误处理
        if (code === '200') {
            data = responseData.data || {}
            if (typeof responseData.data === 'object') {
                data.__code = code
                data.__message = message
            }
            return data
        }
        /* eslint-disable */
        Notification({ type: 'error', title: '提示', message })

        return Promise.reject({ code: code, message: message })
    },
    error => {
        loading.close()
        let message = error.message || ''
        if (message.indexOf('timeout of') === 0) {
            message = '接口请求超时，请重试'
        }
        /* eslint-disable */
        Notification({ type: 'error', title: '提示', message: '服务异常，请重试！' })
        return Promise.reject({ code: error.code, message: message })
    }
)

export const get = (url, data, config) => {
    return axios.get(data ? `${url}?${qs.stringify(data)}` : url, config)
}

export const post = (url, data, config) => {
    // return axios.post(url, data, config)
    return axios.post(url, qs.stringify(data, { allowDots: true }), config)
    return axios.post(data ? `${url}?${qs.stringify(data)}` : url, config)
}
export const upload = (url, data, config) => {
    return axios.post(url, data, config)
}
export const down = url => {
    window.open(url, '_blank')
}
