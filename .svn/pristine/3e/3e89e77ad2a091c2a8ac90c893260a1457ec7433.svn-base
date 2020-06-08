<template>
    <div class="secondary-page">
        <div class="max-title">会计科目</div>
        <div class="secondary-content">
            <div class="small-tile">
                <span class="tit">查询条件</span>
            </div>
            <div class="input-content">
                <el-form :model="filterForm" ref="filterForm" label-width="90px">
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-form-item label="科目编号" prop="search_LIKE_code">
                                <el-input v-model="filterForm.search_LIKE_code" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="科目名称" prop="search_LIKE_name">
                                <el-input v-model="filterForm.search_LIKE_name" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="科目类型" prop="search_EQ_type">
                                <el-select filterable v-model="filterForm.search_EQ_type" placeholder="请选择科目类型" size="small" style="width: 100%">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option v-for="item in expenseType" :key="item" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="个人核算" prop="search_EQ_byEmp">
                                <el-radio v-model="filterForm.search_EQ_byEmp" label="">全部</el-radio>
                                <el-radio v-model="filterForm.search_EQ_byEmp" :label="1">是</el-radio>
                                <el-radio v-model="filterForm.search_EQ_byEmp" :label="0">否</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="部门核算" prop="byDept">
                                <el-radio v-model="filterForm.byDept" label="">全部</el-radio>
                                <el-radio v-model="filterForm.byDept" :label="1">是</el-radio>
                                <el-radio v-model="filterForm.byDept" :label="0">否</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目核算" prop="search_EQ_byProject">
                                <el-radio v-model="filterForm.search_EQ_byProject" label="">全部</el-radio>
                                <el-radio v-model="filterForm.search_EQ_byProject" :label="1">是</el-radio>
                                <el-radio v-model="filterForm.search_EQ_byProject" :label="0">否</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="供应商核算" prop="search_EQ_byVendor">
                                <el-radio v-model="filterForm.search_EQ_byVendor" label="">全部</el-radio>
                                <el-radio v-model="filterForm.search_EQ_byVendor" :label="1">是</el-radio>
                                <el-radio v-model="filterForm.search_EQ_byVendor" :label="0">否</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="有效性" prop="search_EQ_isEnabled">
                                <el-radio v-model="filterForm.search_EQ_isEnabled" label="">全部</el-radio>
                                <el-radio v-model="filterForm.search_EQ_isEnabled" :label="1">有效</el-radio>
                                <el-radio v-model="filterForm.search_EQ_isEnabled" :label="0">无效</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item style="text-align: center;  margin-right: 90px;">
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
                <span class="tit">会计科目列表</span>
                <el-button type="primary" size="mini" icon="el-icon-plus" style="margin-left: 20px;" @click="add">新增</el-button>
                <el-button type="primary" size="mini" style="margin-left: 20px;">导出</el-button>
            </div>

            <el-table :data="expense.page" border stripe style="width: 100%; margin-top: 10px;">
                <el-table-column type="selection" width="50" align="center"> </el-table-column>
                <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                <el-table-column prop="code" label="科目编号"> </el-table-column>
                <el-table-column prop="name" label="科目名称"> </el-table-column>
                <el-table-column prop="type" label="科目类型"> </el-table-column>
                <el-table-column prop="byEmp" label="个人核算">
                    <template slot-scope="scope">
                        {{ scope.row.byEmp === 1 ? '是' : '否' }}
                    </template>
                </el-table-column>
                <el-table-column prop="byDept" label="部门核算">
                    <template slot-scope="scope">
                        {{ scope.row.byDept === 1 ? '是' : '否' }}
                    </template>
                </el-table-column>
                <el-table-column prop="byProject" label="项目核算">
                    <template slot-scope="scope">
                        {{ scope.row.byProject === 1 ? '是' : '否' }}
                    </template>
                </el-table-column>
                <el-table-column prop="byVendor" label="供应商核算">
                    <template slot-scope="scope">
                        {{ scope.row.byVendor === 1 ? '是' : '否' }}
                    </template>
                </el-table-column>
                <el-table-column prop="isEnabled" label="有效性">
                    <template slot-scope="scope">
                        {{ scope.row.isEnabled === 1 ? '有效' : '无效' }}
                    </template>
                </el-table-column>
                <el-table-column prop="updateBy.name" label="最后编辑人"></el-table-column>
                <el-table-column prop="updateDate" label="最后编辑时间" width="170"></el-table-column>
                <el-table-column label="操作" width="110" align="center">
                    <template slot-scope="scope">
                        <el-button circle type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                        <el-button circle type="danger" size="mini" icon="el-icon-close" @click="del(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block" style="padding: 10px 0;">
                <el-pagination background layout="total, prev, pager, next" :total="expense.total" :current-page.sync="expense.curr" @current-change="currentChange"></el-pagination>
            </div>

            <el-dialog :title="form.id ? '编辑' : '新增'" :visible.sync="dialogVisible" width="500">
                <div class="input-content">
                    <el-form ref="form" :rules="rules" :model="form" label-width="90px">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-form-item label="科目编号" prop="code">
                                    <el-input v-model="form.code" size="small"> </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="科目名称" prop="name">
                                    <el-input v-model="form.name" size="small"> </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="科目类型" prop="type">
                                    <el-select filterable v-model="form.type" placeholder="请选择" size="small" style="width: 100%">
                                        <el-option v-for="item in expenseType" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="个人核算">
                                    <el-radio v-model="form.byEmp" :label="1">是</el-radio>
                                    <el-radio v-model="form.byEmp" :label="0">否</el-radio>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="部门核算">
                                    <el-radio v-model="form.byDept" :label="1">是</el-radio>
                                    <el-radio v-model="form.byDept" :label="0">否</el-radio>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="项目核算">
                                    <el-radio v-model="form.byProject" :label="1">是</el-radio>
                                    <el-radio v-model="form.byProject" :label="0">否</el-radio>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="供应商核算">
                                    <el-radio v-model="form.byVendor" :label="1">是</el-radio>
                                    <el-radio v-model="form.byVendor" :label="0">否</el-radio>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="有效性" prop="isEnabled">
                                    <el-radio v-model="form.isEnabled" :label="1">有效</el-radio>
                                    <el-radio v-model="form.isEnabled" :label="0">无效</el-radio>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">提 交</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { expensePage, expenseDelete, expenseUpdate, expenseAdd, expenseGet } from '@/services/expense'
import { expenseType } from './const'
export default {
    data() {
        return {
            expenseType,
            filterForm: {
                search_LIKE_code: '',
                search_LIKE_name: '',
                search_EQ_type: '',
                search_EQ_byEmp: '',
                search_EQ_byDept: '',
                search_EQ_byProject: '',
                search_EQ_byVendor: '',
                search_EQ_isEnabled: ''
            },
            filter: {},
            rules: {
                name: [{ required: true, message: '请输入科目名称', trigger: 'change' }],
                code: [{ required: true, message: '请输入科目编号', trigger: 'change' }],
                isEnabled: [{ required: true, message: '请选择科目有效性', trigger: 'change' }],
                type: [{ required: true, message: '请选择科目类型', trigger: 'change' }]
            },
            dialogVisible: false,
            form: {},
            expense: {
                page: [],
                total: 0,
                curr: 1
            }
        }
    },
    async created() {
        this.getExpense()
    },
    methods: {
        getExpense() {
            const param = Object.assign(
                {},
                {
                    page: this.expense.curr,
                    pageSize: 10,
                    orderBy: 'id',
                    sortType: 'DESC'
                },
                this.filter
            )
            expensePage(param).then(data => {
                this.expense.total = data.totalElements
                this.expense.page = data.content
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
                expenseDelete(row.id).then(res => {
                    this.getExpense()
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
                    const func = t => {
                        this.dialogVisible = false
                        this.getExpense()
                        this.$notify.success({
                            title: '提示',
                            message: `${t}成功`
                        })
                    }
                    /* eslint-disable */
                    this.form.id
                        ? expenseUpdate(this.form).then(res => {
                              func('更新')
                          })
                        : expenseAdd(this.form).then(res => {
                              func('新增')
                          })
                }
            })
        },
        currentChange(curr) {
            this.expense.curr = curr
            this.getExpense()
        },
        reset() {
            this.$refs.filterForm.resetFields()
            this.$forceUpdate()
        },
        search() {
            this.filter = Object.assign({}, this.filterForm)
            this.getExpense()
        }
    }
}
</script>
