<template>
    <div class="secondary-page">
        <div class="max-title">
            企业组织列表
        </div>
        <div class="secondary-content">
            <div class="small-tile">
                <span class="tit">查询条件</span>
            </div>
            <div class="input-content">
                <el-form :model="filterForm" ref="filterForm" label-width="90px">
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-form-item label="组织编号" prop="search_LIKE_code">
                                <el-input clearable v-model="filterForm.search_LIKE_code" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="组织名称" prop="search_LIKE_name">
                                <el-input clearable v-model="filterForm.search_LIKE_name" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="负责人">
                                <el-select filterable v-model="filterForm['search_EQ_managerEmp.id']" placeholder="请选择负责人" size="small" style="width: 100%" @change="forceUpdate">
                                    <el-option v-for="item in emps" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="组织状态" prop="search_EQ_isEnabled">
                                <el-select filterable v-model="filterForm.search_EQ_isEnabled" placeholder="请选择组织状态" size="small" style="width: 100%">
                                    <el-option label="有效" :value="1"></el-option>
                                    <el-option label="无效" :value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
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
                <span class="tit">组织列表</span>
                <el-button type="primary" size="mini" icon="el-icon-plus" style="margin-left: 20px;" @click="add">
                    新增
                </el-button>
                <el-button type="primary" size="mini" style="margin-left: 20px;">
                    导出
                </el-button>
            </div>
            <el-table :data="dept.page" border="" stripe="" style="width: 100%; margin-top: 10px;">
                <el-table-column type="selection" width="50" align="center"> </el-table-column>
                <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
                <el-table-column prop="code" label="组织编号"> </el-table-column>
                <el-table-column prop="name" label="组织名称"> </el-table-column>
                <el-table-column label="负责人">
                    <template slot-scope="scope">
                        {{ (scope.row.managerEmp && scope.row.managerEmp.name) || '' }}
                    </template>
                </el-table-column>
                <el-table-column prop="isEnabled" label="组织状态">
                    <template slot-scope="scope">
                        {{ scope.row.isEnabled === 1 ? '有效' : '无效' }}
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column prop="updateBy.name" label="最后编辑人"></el-table-column>
                <el-table-column prop="updateDate" width="170" label="最后编辑时间"></el-table-column>
                <el-table-column label="操作" width="110" align="center">
                    <template slot-scope="scope">
                        <el-button circle type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                        <el-button circle type="danger" size="mini" icon="el-icon-close" @click="del(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="padding: 10px 0;">
                <el-pagination background layout="total, prev, pager, next" :total="dept.total" :current-page.sync="dept.curr" @current-change="currentChange"></el-pagination>
            </div>
            <el-dialog :title="form.id ? '编辑' : '新增'" :visible.sync="dialogVisible" width="500">
                <div class="input-content">
                    <el-form ref="form" :rules="rules" :model="form" label-width="90px">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-form-item label="组织编号" prop="code">
                                    <el-input v-model="form.code" size="small" placeholder="请输入组织编号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="组织名称" prop="name">
                                    <el-input v-model="form.name" size="small" placeholder="请输入组织名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="负责人">
                                    <el-select filterable v-model="form.managerEmpId" placeholder="请选择负责人" size="small" style="width: 100%" @change="forceUpdate">
                                        <el-option v-for="item in emps" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="组织状态" prop="isEnabled">
                                    <el-select filterable v-model="form.isEnabled" placeholder="请选择组织状态" size="small" style="width: 100%">
                                        <el-option label="有效" :value="1"></el-option>
                                        <el-option label="无效" :value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="备注">
                                    <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" placeholder="请输入备注" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">
                        取 消
                    </el-button>
                    <el-button type="primary" @click="save">
                        提 交
                    </el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { deptPage, deptAdd, deptUpdate, deptDelete } from '@/services/dept'
import { empList } from '@/services/emp'
export default {
    data() {
        return {
            filterForm: {
                search_LIKE_code: '',
                search_LIKE_name: '',
                search_EQ_isEnabled: '',
                'search_EQ_managerEmp.id': ''
            },
            filter: {},
            rules: {
                name: [{ required: true, message: '请输入组织名称', trigger: 'change' }],
                code: [{ required: true, message: '请输入组织编号', trigger: 'change' }],
                isEnabled: [{ required: true, message: '请选择组织状态', trigger: 'change' }]
            },
            emps: [],
            dialogVisible: false,
            form: {},
            dept: {
                page: [],
                total: 0,
                curr: 1
            }
        }
    },
    async created() {
        this.getDepts()
        this.emps = await empList()
    },
    methods: {
        getDepts() {
            const param = Object.assign(
                {},
                {
                    page: this.dept.curr,
                    pageSize: 10,
                    orderBy: 'id',
                    sortType: 'DESC'
                },
                this.filter
            )
            deptPage(param).then(data => {
                this.dept.total = data.totalElements
                this.dept.page = data.content
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
            this.form.managerEmpId = data.managerEmp.id
            this.dialogVisible = true
        },
        del(row) {
            this.$confirm('确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deptDelete(row.id).then(res => {
                    this.getDepts()
                    this.$notify.success({
                        title: '提示',
                        message: '删除成功'
                    })
                })
            })
        },
        forceUpdate() {
            this.$forceUpdate()
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const func = t => {
                        this.dialogVisible = false
                        this.getDepts()
                        this.$notify.success({
                            title: '提示',
                            message: `${t}成功`
                        })
                    }
                    /* eslint-disable */
                    this.form.id
                        ? deptUpdate(this.form).then(res => {
                              func('更新')
                          })
                        : deptAdd(this.form).then(res => {
                              func('新增')
                          })
                }
            })
        },
        currentChange(curr) {
            this.dept.curr = curr
            this.getEmps()
        },
        reset() {
            this.$refs.filterForm.resetFields()
            this.$forceUpdate()
        },
        search() {
            this.filter = Object.assign({}, this.filterForm)
            this.getDepts()
        }
    }
}
</script>
