<template>
    <div class="secondary-page">
        <div class="secondary-content">
            <div class="content-title">费用报销申请</div>
            <div class="small-tile">
                <span class="tit">基本信息</span>
            </div>
            <div class="input-content">
                <el-form ref="base" :model="base" :rules="rulesBase" label-width="90px">
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="报销主题" prop="subject">
                                <el-input v-model="base.subject" size="small"> </el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="报销金额" prop="totalClaimAmount">
                                <el-input type="number" :min="0" v-model="base.totalClaimAmount" size="small"> </el-input>
                            </el-form-item>
                        </el-col>

                        <!-- <el-col :span="6">
                            <el-form-item label="申请人">
                                <el-select v-model="value" placeholder="请选择" size="small" style="width: 100%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="申请部门">
                                <el-select v-model="value" placeholder="请选择" size="small" style="width: 100%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                        <!-- <el-col :span="6">
                            <el-form-item label="开户行">
                                <el-input v-model="input4" size="small"> </el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="10">
                            <el-form-item label="供应商">
                                <el-select filterable v-model="base.vendorId" placeholder="请选择供应商" size="small" style="width: 100%">
                                    <el-option label="无" value=""></el-option>
                                    <el-option v-for="item in vendors" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否按项目分摊" label-width="140px">
                                <el-radio v-model="base.isShareByProject" :label="true">是</el-radio>
                                <el-radio v-model="base.isShareByProject" :label="false">否</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="可抵扣税额">
                                <el-input type="number" :min="0" v-model="base.totalOffsetAmount" size="small"> </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div v-show="base.isShareByProject">
                <div class="small-tile">
                    <span class="tit">项目分配</span>
                </div>
                <div class="table-wrap">
                    <el-table :data="projectShareDetailDTOs" border stripe style="width: 100%;">
                        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                        <el-table-column label="项目">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.projectId" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                    <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="分配比例">
                            <template slot-scope="scope">
                                <el-input @change="e => changePercent(e, scope.$index)" type="number" :min="0" :max="100" v-model="scope.row.percent" size="small">
                                    <template slot="append">%</template>
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="分配金额">
                            <template slot-scope="scope">
                                <el-input @change="e => changeAmount(e, scope.$index)" type="number" :min="0" v-model="scope.row.amount" size="small"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="130" align="center">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" circle icon="el-icon-plus" @click="addDetail(scope.$index, 'projectShareDetailDTOs')"></el-button>
                                <el-button type="danger" size="mini" circle icon="el-icon-close" @click="delDetail(scope.$index, 'projectShareDetailDTOs')"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="small-tile">
                <span class="tit">报销票据</span>
                <el-button type="primary" @click="Camer" size="mini" style="margin-left: 20px;">高拍仪</el-button>
                <upload btnText="批量识别" orc style="margin-left: 10px;margin-right: 10px;" @change="orcChange" />
            </div>
            <div class="table-wrap">
                <el-table :data="invoiceDetailDTOs" border stripe style="width: 100%;">
                    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column label="报销说明">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.remark" size="small"> </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="报销金额">
                        <template slot-scope="scope">
                            <el-input type="number" :min="0" v-model="scope.row.amount" size="small"> </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="可抵扣税额">
                        <template slot-scope="scope">
                            <el-input type="number" :min="0" v-model="scope.row.taxAmount" size="small"> </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="票据类型">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.invoiceType" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option v-for="item in INVOICETYPE.array" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="会计科目">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.expenseId" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option v-for="item in expenses" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="上传文件" width="110" align="center">
                        <template slot-scope="scope">
                            <upload orc @change="e => orcDetailChange(e, scope.$index)" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="attacheType" width="120" label="文件类型"></el-table-column>
                    <el-table-column label="票据结果" width="140">
                        <template slot-scope="scope">
                            <div style="width: 120px; height: 20px; overflow: hidden;">{{ scope.row.invoiceJson }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="130" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" circle icon="el-icon-plus" @click="addDetail(scope.$index, 'invoiceDetailDTOs')"></el-button>
                            <el-button type="danger" size="mini" circle icon="el-icon-close" @click="delDetail(scope.$index, 'invoiceDetailDTOs')"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="small-tile">
                <span class="tit">凭证明细</span>
            </div>
            <div class="table-wrap">
                <el-table :data="voucherDetailDTOs" border stripe style="width: 100%;">
                    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column label="凭证摘要">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.voucherAbstract" size="small"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="分录方向">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.entryTarget" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option label="不选" value=""></el-option>
                                <el-option v-for="item in entryTarget" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="分录金额">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.entryAmount" size="small"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="对应个人">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.empId" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option label="不选" value=""></el-option>
                                <el-option v-for="item in emps" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="对应部门">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.deptId" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option label="不选" value=""></el-option>
                                <el-option v-for="item in depts" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column label="对应项目">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.projectId" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option label="不选" value=""></el-option>
                                <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column label="对应供应商">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.vendorId" filterable size="small" placeholder="请选择" style="width: 100%; ">
                                <el-option label="不选" value=""></el-option>
                                <el-option v-for="item in vendors" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="130" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" circle icon="el-icon-plus" @click="addDetail(scope.$index, 'voucherDetailDTOs')"></el-button>
                            <el-button type="danger" size="mini" circle icon="el-icon-close" @click="delDetail(scope.$index, 'voucherDetailDTOs')"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="input-content-btn">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>放弃</el-button>
            </div>
        </div>
        <!-- 弹框 -->
        <el-dialog title="高拍仪" :visible.sync="dialogKm" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
            <kemi @change="orcChange" />
        </el-dialog>
    </div>
</template>

<script>
import Kemi from '@/components/Kemi/Kemi.vue'
import { requestAdd } from '@/services/request'
import { vendorList } from '@/services/vendor'
import { projectList } from '@/services/project'
import { empList } from '@/services/emp'
import { deptList } from '@/services/dept'
import { expenseList } from '@/services/expense'
import { INVOICETYPE } from '@/assets/script/const'
import { entryTarget } from './const'
import Upload from '@/components/upload'
export default {
    data() {
        return {
            INVOICETYPE,
            entryTarget,
            dialogKm: false,
            vendors: [],
            projects: [],
            depts: [],
            emps: [],
            expenses: [],
            // 项目分配
            projectShareDetailDTOs: [
                {
                    projectId: '',
                    percent: '',
                    amount: ''
                }
            ],
            // 报销票据
            invoiceDetailDTOs: [
                {
                    remark: '',
                    amount: '',
                    taxAmount: '',
                    invoiceType: '',
                    expenseId: '',
                    invoiceJson: '',
                    // 不展示于列表
                    attacheId: '',
                    attacheName: '',
                    invoiceDate: '',
                    invoiceCode: '',
                    attacheType: '',
                    invoiceNumber: ''
                }
            ],
            // 凭证明细
            voucherDetailDTOs: [
                {
                    voucherAbstract: '',
                    entryTarget: '',
                    entryAmount: '',
                    empId: '',
                    deptId: '',
                    vendorId: '',
                    projectId: ''
                }
            ],
            rulesBase: {
                subject: [{ required: true, message: '请输入报销主题', trigger: 'change' }],
                totalClaimAmount: [{ required: true, message: '请输入报销金额', trigger: 'change' }]
            },
            // 基本信息
            base: {
                id: '',
                subject: '',
                remark: '',
                vendorId: '',
                isShareByProject: true,
                totalClaimAmount: '',
                totalOffsetAmount: '',
                status: 'Submited'
            }
        }
    },
    async created() {
        this.vendors = await vendorList()
        this.projects = await projectList()
        this.depts = await deptList()
        this.emps = await empList()
        this.expenses = await expenseList()
    },
    methods: {
        addDetail(ind, key) {
            this[key].push(this.$options.data()[key][0])
        },
        delDetail(ind, key) {
            if (this[key].length <= 1) {
                this.$notify({ title: '提示', type: 'warning', message: '至少保留一行明细' })
                return false
            }
            this[key].splice(ind, 1)
        },
        onSubmit() {
            this.$refs.base.validate(valid => {
                if (valid) {
                    const projectShareDetailDTOs = Object.assign([], this.projectShareDetailDTOs)
                    const invoiceDetailDTOs = Object.assign([], this.invoiceDetailDTOs)
                    const voucherDetailDTOs = Object.assign([], this.voucherDetailDTOs)
                    // 验证项目分摊
                    if (this.base.isShareByProject) {
                        let p = 0
                        projectShareDetailDTOs.forEach((item, ind) => {
                            !item.projectId ? projectShareDetailDTOs.splice(ind, 1) : (p += Number(item.percent))
                        })
                        if (p > 100) {
                            this.$notify({ title: '提示', type: 'error', message: '项目分配超过报销总金额' })
                            return false
                        }
                        if (p < 100) {
                            this.$notify({ title: '提示', type: 'error', message: '项目分配没有完成或没有选择项目' })
                            return false
                        }
                    }
                    // 验证报销票据
                    let invoiceError = []
                    invoiceDetailDTOs.forEach((item, ind) => {
                        if (!item.amount || !item.expenseId || !item.attacheId || !item.invoiceType) {
                            invoiceError.push(ind + 1)
                        }
                    })
                    if (invoiceError.length > 0) {
                        this.$notify({ title: '提示', type: 'error', message: `请完善第${invoiceError.toString()}行报销票据` })
                        return false
                    }
                    let data = {}
                    this.base.isShareByProject &&
                        projectShareDetailDTOs.forEach((item, ind) => {
                            Object.keys(item).forEach(key => {
                                data[`projectShareDetailDTOs[${ind}].${key}`] = item[key]
                            })
                        })
                    invoiceDetailDTOs.forEach((item, ind) => {
                        Object.keys(item).forEach(key => {
                            data[`invoiceDetailDTOs[${ind}].${key}`] = item[key]
                        })
                    })
                    voucherDetailDTOs.forEach((item, ind) => {
                        Object.keys(item).forEach(key => {
                            data[`voucherDetailDTOs[${ind}].${key}`] = item[key]
                        })
                    })
                    requestAdd(Object.assign({}, data, this.base)).then(res => {
                        this.$notify({ title: '提示', type: 'success', message: '提交成功' })
                        setTimeout(() => {
                            this.$router.push('/myReimbursement')
                        }, 1500)
                    })
                }
            })
        },
        orcDetailChange(e, i) {
            Object.keys(this.invoiceDetailDTOs[i]).forEach(key => {
                this.invoiceDetailDTOs[i][key] = e[0][key] || ''
            })
        },
        orcChange(e) {
            e.forEach(item => {
                let data = {}
                Object.keys(this.$options.data().invoiceDetailDTOs[0]).forEach(key => {
                    data[key] = item[key] || ''
                })
                this.invoiceDetailDTOs.push(data)
            })
        },
        Camer() {
            this.dialogKm = true
        },
        changePercent(e, i) {
            const { totalClaimAmount } = this.base
            if (e < 0 || e > 100) {
                this.projectShareDetailDTOs[i].percent = 0
            }
            this.projectShareDetailDTOs[i].amount = (Number(totalClaimAmount) * (Number(this.projectShareDetailDTOs[i].percent) / 100)).toFixed(2)
        },
        changeAmount(e, i) {
            const { totalClaimAmount } = this.base
            this.projectShareDetailDTOs[i].percent = ((Number(this.projectShareDetailDTOs[i].amount) / Number(totalClaimAmount)) * 100).toFixed(4)
        }
    },
    watch: {
        invoiceDetailDTOs: {
            handler(val, old) {
                let [total, taxTotal] = [0, 0]
                this.invoiceDetailDTOs.forEach(item => {
                    if (Number(item.amount) < 0) item.amount = 0
                    if (Number(item.taxAmount < 0)) item.taxAmount = 0
                    total += Number(item.amount)
                    taxTotal += Number(item.taxAmount)
                })
                this.base.totalClaimAmount = total
                this.base.totalOffsetAmount = taxTotal
            },
            deep: true
        },
        'base.totalClaimAmount': function(val) {
            if (val < 0) this.base.totalClaimAmount = 0
        },
        'base.totalOffsetAmount': function(val) {
            if (val < 0) this.base.totalOffsetAmount = 0
        }
    },
    components: {
        Kemi,
        Upload
    }
}
</script>
