<template>
    <div class="secondary-page">
        <div class="max-title">我的报销单</div>
        <div class="secondary-content">
            <el-button type="primary" icon="el-icon-plus" size="small" class="new-btn" @click="newReimbursement">新增</el-button>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="待付款" name="1"></el-tab-pane>
                <el-tab-pane label="已付款" name="2"></el-tab-pane>
                <el-tab-pane label="异常报销单" name="3"></el-tab-pane>
            </el-tabs>
            <el-table :data="request.page" border stripe style="width: 100%;">
                <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
                <el-table-column prop="refNo" label="报销单号" width="120"> </el-table-column>
                <el-table-column prop="subject" label="报销主题"> </el-table-column>
                <el-table-column prop="requestDate" label="申请日期" width="110"> </el-table-column>
                <el-table-column prop="totalClaimAmount" width="120" label="报销金额">
                    <template slot-scope="scope">
                        {{ scope.row.totalClaimAmount | amount }}
                    </template>
                </el-table-column>
                <el-table-column prop="totalOffsetAmount" width="120" label="可抵扣税额">
                    <template slot-scope="scope">
                        {{ scope.row.totalOffsetAmount | amount }}
                    </template>
                </el-table-column>
                <el-table-column prop="requester.name" width="120" label="申请人"> </el-table-column>
                <el-table-column prop="requestDept.name" width="100" label="申请部门"> </el-table-column>
                <el-table-column prop="status" label="巡检状态" width="100"> </el-table-column>
                <el-table-column label="操作" width="110" align="center">
                    <template slot-scope="scope">
                        <el-button circle type="primary" size="mini" icon="el-icon-search" @click="look(scope.row)"></el-button>
                        <el-button circle type="danger" size="mini" icon="el-icon-close" @click="del(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="padding: 10px 0;">
                <el-pagination background layout="total, prev, pager, next" :total="request.total" :current-page.sync="request.curr" @current-change="currentChange"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { requestMy, requestDelete } from '@/services/request'
export default {
    data() {
        return {
            activeName: '1',
            filter: {},
            request: {
                page: [],
                total: 0,
                curr: 1
            }
        }
    },
    async created() {
        this.getPage()
    },
    methods: {
        getPage() {
            const param = Object.assign(
                {},
                {
                    page: this.request.curr,
                    pageSize: 10,
                    orderBy: 'id',
                    sortType: 'DESC'
                },
                this.filter
            )
            requestMy(param).then(data => {
                this.request.total = data.totalElements
                this.request.page = data.content
            })
        },
        currentChange(curr) {
            this.request.curr = curr
            this.getPage()
        },
        look(row) {},
        del(row) {
            this.$confirm('确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                requestDelete(row.id).then(res => {
                    this.getPage()
                    this.$notify.success({
                        title: '提示',
                        message: '删除成功'
                    })
                })
            })
        },
        newReimbursement() {
            this.$router.push('/newReimbursement')
        }
    },
    watch: {
        activeName: function(val) {
            console.log(val)
        }
    }
}
</script>
