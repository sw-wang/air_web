import { get, post } from '@/config/http'

const api = {
    add: 'request/add',
    get: 'request/get/',
    my: 'request/my',
    page: 'request/page',
    update: 'request/update',
    delete: 'request/delete/'
}

export const requestAdd = data => post(api.add, data)
export const requestUpdate = data => post(api.update, data)
export const requestGet = id => get(api.get + id)
export const requestMy = data => get(api.my, data)
export const requestPage = data => get(api.page, data)
export const requestDelete = id => get(api.delete + id)
