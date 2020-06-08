import { get, post } from '@/config/http'

const api = {
    add: 'vendor/add',
    get: 'vendor/get/',
    list: 'vendor/list',
    page: 'vendor/page',
    update: 'vendor/update',
    delete: 'vendor/delete/'
}

export const vendorAdd = data => post(api.add, data)
export const vendorUpdate = data => post(api.update, data)
export const vendorGet = id => get(api.get + id)
export const vendorList = () => get(api.list)
export const vendorPage = data => get(api.page, data)
export const vendorDelete = id => get(api.delete + id)
