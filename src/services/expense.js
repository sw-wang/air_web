import { get, post } from '@/config/http'

const api = {
    add: 'expense/add',
    get: 'expense/get/',
    list: 'expense/list',
    page: 'expense/page',
    update: 'expense/update',
    delete: 'expense/delete/'
}

export const expenseAdd = data => post(api.add, data)
export const expenseUpdate = data => post(api.update, data)
export const expenseGet = id => get(api.get + id)
export const expenseList = () => get(api.list)
export const expensePage = data => get(api.page, data)
export const expenseDelete = id => get(api.delete + id)
