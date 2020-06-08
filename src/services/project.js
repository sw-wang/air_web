import { get, post } from '@/config/http'

const api = {
    add: 'project/add',
    get: 'project/get/',
    list: 'project/list',
    page: 'project/page',
    update: 'project/update',
    delete: 'project/delete/'
}

export const projectAdd = data => post(api.add, data)
export const projectUpdate = data => post(api.update, data)
export const projectGet = id => get(api.get + id)
export const projectList = () => get(api.list)
export const projectPage = data => get(api.page, data)
export const projectDelete = id => get(api.delete + id)
