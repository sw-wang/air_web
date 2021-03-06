import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    // mode: "history",
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Main/login.vue')
        },
        {
            path: '/',
            name: 'main',
            redirect: '/dashboard',
            component: () => import('@/views/Main/main.vue'),
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Main/dashboard.vue')
                },
                {
                    path: '/newReimbursement',
                    name: 'newReimbursement',
                    component: () => import('@/views/Payment/newReimbursement.vue')
                },
                {
                    path: '/myReimbursement',
                    name: 'myReimbursement',
                    component: () => import('@/views/Payment/myReimbursement.vue')
                },
                {
                    path: '/reimbursementSeach',
                    name: 'reimbursementSeach',
                    component: () => import('@/views/Payment/reimbursementSeach.vue')
                },
                {
                    path: '/invoice',
                    name: 'invoice',
                    component: () => import('@/views/Center/invoice.vue')
                },
                {
                    path: '/voucher',
                    name: 'voucher',
                    component: () => import('@/views/Proof/voucher.vue')
                },
                {
                    path: '/department',
                    name: 'department',
                    component: () => import('@/views/Management/department.vue')
                },
                {
                    path: '/personnel',
                    name: 'personnel',
                    component: () => import('@/views/Management/personnel.vue')
                },
                {
                    path: '/accountingSubject',
                    name: 'accountingSubject',
                    component: () => import('@/views/Configuration/accountingSubject.vue')
                },
                {
                    path: '/supplier',
                    name: 'supplier',
                    component: () => import('@/views/Configuration/supplier.vue')
                },
                {
                    path: '/project',
                    name: 'project',
                    component: () => import('@/views/Configuration/project.vue')
                }
            ]
        }
    ]
})
