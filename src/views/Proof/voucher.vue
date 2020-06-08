<template>
    <div class="secondary-page">
        <div class="max-title">财务凭证</div>
        <div class="secondary-content">
            <!-- <div class="small-tile">
                <span class="tit">查询条件</span>
            </div> -->
            <!-- <div class="input-content">
                <el-form :model="filterForm" ref="filterForm" label-width="90px">
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-form-item label="报销单号" prop="search_LIKE_voucherCode">
                                <el-input v-model="filterForm" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="报销主题" prop="search_LIKE_voucherCode">
                                <el-input v-model="filterForm" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="申请日期" prop="search_LIKE_voucherCode">
                                <el-date-picker v-model="filterForm" type="daterange" style="width: 100%" size="small" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="报销金额" prop="search_LIKE_voucherCode">
                                <el-input v-model="filterForm" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="申请人" prop="search_LIKE_voucherCode">
                                <el-select v-model="filterForm" placeholder="请选择" size="small" style="width: 100%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="申请部门" prop="search_LIKE_voucherCode">
                                <el-select v-model="filterForm" placeholder="请选择" size="small" style="width: 100%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="支付状态" prop="search_LIKE_voucherCode">
                                <el-select v-model="filterForm" placeholder="请选择" size="small" style="width: 100%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="巡检状态" prop="search_LIKE_voucherCode">
                                <el-select v-model="filterForm" placeholder="请选择" size="small" style="width: 100%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item style="text-align: center; margin-right: 90px;">
                        <el-button type="primary" @click="onSubmit" size="small" style="width: 80px">查询</el-button>
                        <el-button size="small" style="width: 80px">重置</el-button>
                    </el-form-item>
                </el-form>
            </div> -->
            <div class="small-tile">
                <span class="tit">单据列表</span>
            </div>

            <el-table :data="voucher.page" border stripe style="width: 100%; margin-top: 10px;">
                <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
                <el-table-column prop="danhao" label="报销单号"> </el-table-column>
                <el-table-column prop="zhuti" label="报销主题"> </el-table-column>
                <el-table-column prop="date" label="申请日期"> </el-table-column>
                <el-table-column prop="jine" label="报销金额"> </el-table-column>
                <el-table-column prop="shuie" label="可抵扣税额"> </el-table-column>
                <el-table-column prop="name" label="申请人"> </el-table-column>
                <el-table-column prop="bumen" label="申请部门"> </el-table-column>
                <el-table-column prop="xunjian" label="支付状态">未支付 </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                    <el-button type="text" icon="el-icon-edit-outline" @click="dialogVisible = true">编辑</el-button>
                </el-table-column>
            </el-table>

            <div class="block" style="padding: 10px 0;">
                <el-pagination background layout="total, prev, pager, next" :total="voucher.total" :current-page.sync="voucher.curr" @current-change="currentChange"></el-pagination>
            </div>

            <el-dialog title="凭证详情" :visible.sync="dialogVisible" width="90" :before-close="handleClose">
                <div class="table-wrap">
                    <el-table :data="tableData2" border stripe style="width: 100%;">
                        <el-table-column prop="xuhao" label="序号" width="50"></el-table-column>
                        <el-table-column label="凭证摘要">
                            <el-input v-model="input4" size="small"> </el-input>
                        </el-table-column>
                        <el-table-column prop="date" label="分录方向">
                            <el-input v-model="input4" size="small"> </el-input>
                        </el-table-column>
                        <el-table-column prop="jine" label="分录金额">
                            <el-input v-model="input4" size="small"> </el-input>
                        </el-table-column>
                        <el-table-column prop="jine" label="对应个人">
                            <el-select v-model="value" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-table-column>
                        <el-table-column prop="jine" label="对应部门">
                            <el-select v-model="value" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-table-column>

                        <el-table-column prop="jine" label="对应项目">
                            <el-select v-model="value" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-table-column>

                        <el-table-column prop="jine" label="对应供应商">
                            <el-select v-model="value" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-table-column>

                        <el-table-column label="操作" width="200">
                            <el-button type="primary" size="mini" circle icon="el-icon-plus"> </el-button>
                            <el-button type="danger" size="mini" circle icon="el-icon-close"> </el-button>
                        </el-table-column>
                    </el-table>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">提 交</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { voucherPage, voucherDelete, voucherUpdate, voucherGet } from '@/services/voucher'
import { expenseList } from '@/services/expense'
import { INVOICETYPE } from '@/assets/script/const'
export default {
    data() {
        return {
            INVOICETYPE,
            filterForm: {
                search_EQ_voucherDate: '',
                search_LIKE_voucherNumber: '',
                search_LIKE_voucherCode: '',
                search_EQ_voucherType: '',
                search_EQ_amount: ''
            },
            filter: {},
            rules: {
                amount: [{ required: true, message: '请输入金额', trigger: 'change' }],
                taxAmount: [{ required: true, message: '请输入税额', trigger: 'change' }],
                expenseId: [{ required: true, message: '请选择费用科目', trigger: 'change' }],
                attacheId: [{ required: true, message: '请上传影像', trigger: 'change' }],
                voucherCode: [{ required: true, message: '请输入发票代码', trigger: 'change' }],
                voucherNumber: [{ required: true, message: '请输入发票号码', trigger: 'change' }],
                voucherDate: [{ required: true, message: '请输入开票日期', trigger: 'change' }],
                voucherType: [{ required: true, message: '请输入发票类型', trigger: 'change' }]
            },
            dialogVisible: false,
            form: {},
            voucher: {
                page: [],
                total: 0,
                curr: 1
            },
            expenses: []
        }
    },
    async created() {
        this.getPage()
        this.expenses = await expenseList()
    },
    methods: {
        getPage() {
            const param = Object.assign(
                {},
                {
                    page: this.voucher.curr,
                    pageSize: 10,
                    orderBy: 'id',
                    sortType: 'DESC'
                },
                this.filter
            )
            voucherPage(param).then(data => {
                this.voucher.total = data.totalElements
                this.voucher.page = data.content
            })
        },
        add() {
            this.form = this.$options.data().form
            this.dialogVisible = true
            this.$refs.form && this.$refs.form.resetFields()
        },
        edit(row) {
            const data = Object.assign({}, row)
            this.form = data
            this.dialogVisible = true
        },
        del(row) {
            this.$confirm('确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                voucherDelete(row.id).then(res => {
                    this.getPage()
                    this.$notify.success({
                        title: '提示',
                        message: '删除成功'
                    })
                })
            })
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    voucherUpdate(this.form).then(res => {
                        this.dialogVisible = false
                        this.getPage()
                        this.$notify.success({
                            title: '提示',
                            message: '编辑成功'
                        })
                    })
                }
            })
        },
        currentChange(curr) {
            this.voucher.curr = curr
            this.getPage()
        },
        reset() {
            this.$refs.filterForm.resetFields()
            this.$forceUpdate()
        },
        search() {
            this.filter = Object.assign({}, this.filterForm)
            this.getPage()
        }
    }
}
</script>
