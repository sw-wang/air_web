import { get, post } from '@/config/http'

const api = {
    add: 'voucher/add',
    get: 'voucher/get/',
    list: 'voucher/list',
    page: 'voucher/page',
    update: 'voucher/update',
    delete: 'voucher/delete/'
}

export const voucherAdd = data => post(api.add, data)
export const voucherUpdate = data => post(api.update, data)
export const voucherGet = id => get(api.get + id)
export const voucherList = () => get(api.list)
export const voucherPage = data => get(api.page, data)
export const voucherDelete = id => get(api.delete + id)
