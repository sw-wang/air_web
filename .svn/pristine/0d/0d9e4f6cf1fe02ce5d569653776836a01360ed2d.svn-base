import { get, post } from '@/config/http'

const api = {
    add: 'invoice/add',
    get: 'invoice/get/',
    list: 'invoice/list',
    page: 'invoice/page',
    update: 'invoice/update',
    delete: 'invoice/delete/'
}

export const invoiceAdd = data => post(api.add, data)
export const invoiceUpdate = data => post(api.update, data)
export const invoiceGet = id => get(api.get + id)
export const invoiceList = () => get(api.list)
export const invoicePage = data => get(api.page, data)
export const invoiceDelete = id => get(api.delete + id)
