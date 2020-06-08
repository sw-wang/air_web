import { get, post } from '@/config/http'

const api = {
    add: 'emp/add',
    get: 'emp/get/',
    list: 'emp/list',
    page: 'emp/page',
    update: 'emp/update',
    delete: 'emp/delete/'
}

export const empAdd = data => post(api.add, data)
export const empUpdate = data => post(api.update, data)
export const empGet = id => get(api.get + id)
export const empList = () => get(api.list)
export const empPage = data => get(api.page, data)
export const empDelete = id => get(api.delete + id)
