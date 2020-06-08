<template>
    <div class="main">
        <el-container>
            <el-header>
                <a class="logo">
                    <i class="iconfont iconxingyuan"> </i> <span>{{ APP_TITLE }}</span>
                </a>
                <div class="header-right">
                    <span>欢迎您，{{ emp.name }}</span>
                    <a @click="logout" style="margin-left: 20px;"><i class="el-icon-switch-button"></i></a>
                </div>
            </el-header>

            <el-container>
                <el-aside width="200px">
                    <el-menu router class="el-menu-vertical-demo" :default-active="$route.path">
                        <el-menu-item index="/dashboard">
                            <i class="iconfont icondashboard"></i>
                            <span slot="title">数据看板</span>
                        </el-menu-item>

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="iconfont iconbaoxiao"></i>
                                <span slot="title">票据报销</span>
                            </template>
                            <el-menu-item index="/newReimbursement">费用报销申请</el-menu-item>
                            <el-menu-item index="/myReimbursement">我的报销单</el-menu-item>
                            <el-menu-item index="/reimbursementSeach">单据查询</el-menu-item>
                        </el-submenu>

                        <el-menu-item index="/invoice">
                            <i class="iconfont iconfapiao"></i>
                            <span slot="title">票据中心 </span>
                        </el-menu-item>
                        <el-menu-item index="/voucher">
                            <i class="iconfont iconpingzheng"></i>
                            <span slot="title">财务凭证 </span>
                        </el-menu-item>

                        <el-submenu index="5">
                            <template slot="title">
                                <i class="iconfont iconshezhi"></i>
                                <span slot="title">系统管理</span>
                            </template>
                            <el-menu-item index="/department">企业组织</el-menu-item>
                            <el-menu-item index="/personnel">人员信息</el-menu-item>
                        </el-submenu>

                        <el-submenu index="6">
                            <template slot="title">
                                <i class="iconfont iconkongzhi"></i>
                                <span slot="title">系统配置</span>
                            </template>
                            <el-menu-item index="/accountingSubject">会计科目</el-menu-item>
                            <el-menu-item index="/supplier">供应商信息</el-menu-item>
                            <el-menu-item index="/project">项目信息</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import cookie from 'vue-cookie'
import { LoginUser } from '@/services/account'
export default {
    data() {
        return {
            APP_TITLE: process.env.VUE_APP_PAGE_TITLE,
            emp: {}
        }
    },
    created() {
        LoginUser().then(data => {
            this.emp = data.emp || {}
        })
    },
    methods: {
        logout() {
            this.$confirm('确定登出吗？', '登出提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                cookie.delete('TOKENINFO')
                this.$notify.success({
                    title: '提示',
                    message: '登出成功'
                })
                setTimeout(() => {
                    this.$router.push('/login')
                }, 1500)
            })
        }
    }
}
</script>
