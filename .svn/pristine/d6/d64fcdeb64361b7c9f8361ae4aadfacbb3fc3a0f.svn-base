<template>
    <div class="secondary-page">
        <div class="max-title">单据查询</div>
        <div class="secondary-content">
            <div class="small-tile">
                <span class="tit">查询条件</span>
            </div>
            <div class="input-content">
                <el-form :model="filterForm" ref="filterForm" label-width="90px">
                    <el-row :gutter="10">
                        <!-- <el-col :span="6">
                            <el-form-item label="报销单号" prop="">
                                <el-input v-model="filterForm" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="报销主题" prop="">
                                <el-input v-model="filterForm" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="申请日期" prop="">
                                <el-date-picker v-model="filterForm" type="daterange" style="width: 100%" size="small" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="8">
                            <el-form-item label="报销金额" prop="search_EQ_totalClaimAmount">
                                <el-input type="number" v-model="filterForm.search_EQ_totalClaimAmount" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="申请人" prop="search_EQ_requester">
                                <el-select v-model="filterForm['search_EQ_requester.id']" placeholder="请选择申请人" size="small" style="width: 100%">
                                    <el-option label="所有人" value=""></el-option>
                                    <el-option v-for="item in emps" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="申请部门" prop="search_EQ_requestDept">
                                <el-select v-model="filterForm['search_EQ_requestDept.id']" placeholder="请选择申请部门" size="small" style="width: 100%">
                                    <el-option label="所有部门" value=""></el-option>
                                    <el-option v-for="item in depts" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="6">
                            <el-form-item label="支付状态" prop="search_EQ_status">
                                <el-select v-model="filterForm.search_EQ_status" placeholder="请选择" size="small" style="width: 100%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                        <!-- <el-col :span="6">
                            <el-form-item label="巡检状态" prop="">
                                <el-select v-model="filterForm" placeholder="请选择" size="small" style="width: 100%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <el-form-item style="text-align: center; margin-right: 90px;">
                        <el-button type="primary" @click="search" size="small" style="width: 80px">
                            查询
                        </el-button>
                        <el-button size="small" style="width: 80px" @click="reset">
                            重置
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="small-tile">
                <span class="tit">单据列表</span>
            </div>
            <el-table :data="request.page" border stripe style="width: 100%; margin-top: 10px;">
                <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
                <el-table-column prop="refNo" label="报销单号"> </el-table-column>
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
                <el-table-column prop="requester.name" label="申请人"> </el-table-column>
                <el-table-column prop="requestDept.name" label="申请部门"> </el-table-column>
                <el-table-column prop="status" label="巡检状态"> </el-table-column>
                <el-table-column label="操作" width="110" align="center">
                    <template slot-scope="scope">
                        <el-button circle type="primary" size="mini" icon="el-icon-search" @click="look(scope.row)"></el-button>
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
import { requestPage } from '@/services/request'
import { empList } from '@/services/emp'
import { deptList } from '@/services/dept'
export default {
    data() {
        return {
            depts: [],
            emps: [],
            filterForm: {
                'search_EQ_requester.id': '',
                'search_EQ_requestDept.id': '',
                search_EQ_status: '',
                search_EQ_totalClaimAmount: ''
            },
            filter: {},
            request: {
                page: [],
                total: 0,
                curr: 1
            }
        }
    },
    async created() {
        this.getRequest()
        this.depts = await deptList()
        this.emps = await empList()
    },
    methods: {
        getRequest() {
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
            requestPage(param).then(data => {
                this.request.total = data.totalElements
                this.request.page = data.content
            })
        },
        look() {},
        currentChange(curr) {
            this.request.curr = curr
            this.getRequest()
        },
        reset() {
            this.$refs.filterForm.resetFields()
            this.$forceUpdate()
        },
        search() {
            this.filter = Object.assign({}, this.filterForm)
            this.getRequest()
        }
    }
}
</script>
