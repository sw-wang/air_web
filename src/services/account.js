import { get, post } from '@/config/http'

const api = {
    login: 'account/login', // 获取员工
    loginUser: 'loginUser' // 获取当前登录人信息
}

export const Login = data => post(api.login, data)
export const LoginUser = () => get(api.loginUser)
