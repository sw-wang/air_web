import { get, post } from '@/config/http'

const api = {
    add: 'dept/add',
    get: 'dept/get/',
    list: 'dept/list',
    page: 'dept/page',
    update: 'dept/update',
    delete: 'dept/delete/'
}

export const deptAdd = data => post(api.add, data)
export const deptUpdate = data => post(api.update, data)
export const deptGet = id => get(api.get + id)
export const deptList = () => get(api.list)
export const deptPage = data => get(api.page, data)
export const deptDelete = id => get(api.delete + id)
