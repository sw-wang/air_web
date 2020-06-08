import { down, get, post, upload } from '@/config/http'

const api = {
    itemInvoice: 'invoiceOrc/itemInvoice',
    multipleInvoice: 'invoiceOrc/multipleInvoice',
    upload: 'upload',
    download: 'download/'

}

export const itemInvoice = (data, config) => upload(api.itemInvoice, data, config)
export const multipleInvoice = (data, config) => upload(api.multipleInvoice, data, config)
export const uploadFile = (data, config) => upload(api.upload, data, config)
export const download = (id) => down(api.download + id)
