<template>
    <div class="dashboard">
        <div class="dashboard-expense">
            <el-row :gutter="12">
                <el-col :span="6">
                    <div class="grid-content bg-1">
                        <div class="grid-top"><i class="iconfont iconfapiao"></i><span>发票总金额</span></div>
                        <div class="grid-mun">
                            <span class="maxtext"><i>¥</i>25,343.00</span>
                            <div class="grid-mun-r">
                                28张发票
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-2">
                        <div class="grid-top"><i class="iconfont iconyujing"></i><span>异常报销单</span></div>
                        <div class="grid-mun">
                            <span class="maxtext"><i>¥</i>1,985.00</span>
                            <div class="grid-mun-r">
                                2张单据
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-3">
                        <div class="grid-top"><i class="iconfont iconfukuan3"></i><span>待支付</span></div>
                        <div class="grid-mun">
                            <span class="maxtext"><i>¥</i>7,200.00</span>
                            <div class="grid-mun-r">
                                2张单据
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-4">
                        <div class="grid-top"><i class="iconfont iconwancheng"></i><span>报销完成</span></div>
                        <div class="grid-mun">
                            <span class="maxtext"><i>¥</i>683,652.00</span>
                            <div class="grid-mun-r">
                                109张单据
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="report-forms">
            <el-row :gutter="12">
                <el-col :span="12">
                    <div class="report-col">
                        <div class="title">支出周报</div>
                        <div class="select">
                            <el-date-picker
                                v-model="value1"
                                type="week"
                                format="yyyy 第 WW 周"
                                size="small"
                                placeholder="选择周"
                            >
                            </el-date-picker>
                        </div>

                        <!-- 支出周报报表 -->
                        <div class="report-content">
                            <div class="money">
                                <span>¥</span><b>9,401.00</b><span>合计</span>
                                <div style="text-align: center; margin-top: 15px;">
                                    <img
                                        :src="require('@/assets/images/report1.png')"
                                        style=" max-height:184px; max-width: 100% "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="report-col">
                        <div class="title">项目支出</div>
                        <div class="select">
                            <el-select v-model="value" size="small" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>

                        <!-- 项目支出报表 -->
                        <div class="report-content">
                            <div class="money">
                                <span>¥</span><b>18,201.00</b><span>合计</span>
                                <div style="text-align: center; margin-top: 15px;">
                                    <img
                                        :src="require('@/assets/images/report2.png')"
                                        style=" max-height:184px; max-width: 100% "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="report-forms">
            <el-row :gutter="12">
                <el-col :span="16">
                    <div class="report-col" style="height: 416px">
                        <div class="title">报销走势</div>
                        <div class="select">
                            <el-select
                                v-model="value"
                                size="small"
                                placeholder="2020年"
                                style="width: 120px;margin-left: 10px;"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                            <el-select
                                v-model="value"
                                size="small"
                                placeholder="所有部门"
                                style="width: 120px;margin-left: 10px;"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                            <el-select
                                v-model="value"
                                size="small"
                                placeholder="所有项目"
                                style="width: 120px;margin-left: 10px;"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>

                        <!-- 报销走势报表 -->
                        <div class="report-content">
                            <div class="money">
                                <span>¥</span><b>1010,183.00</b><span>合计</span>
                                <div style="text-align: center; margin-top: 0px;">
                                    <img
                                        :src="require('@/assets/images/report3.png')"
                                        style=" max-height:330px; max-width: 100% "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="report-col" style="height: 416px">
                        <div class="title">支出排行</div>
                        <div class="tab">
                            <a href="#" class="selected">按部门</a>
                            <a href="#">按项目</a>
                        </div>

                        <!-- 支出排行 -->
                        <ul class="ranking-list">
                            <li>
                                <i class="one">1</i>
                                <span class="name">销售1部</span>
                                <span class="money">19,267.00</span>
                            </li>
                            <li>
                                <i class="two">2</i>
                                <span class="name">销售1部</span>
                                <span class="money">19,267.00</span>
                            </li>
                            <li>
                                <i class="three">3</i>
                                <span class="name">销售1部</span>
                                <span class="money">19,267.00</span>
                            </li>
                            <li>
                                <i>4</i>
                                <span class="name">销售1部</span>
                                <span class="money">19,267.00</span>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="dashboard-tblist">
            <div class="title">报销单据</div>
            <a class="more" href="#">更多</a>
            <el-table :data="tableData" border stripe style="width: 100%;">
                <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                <el-table-column prop="bxdh" label="报销单号"> </el-table-column>
                <el-table-column prop="bxzt" label="报销主题"> </el-table-column>
                <el-table-column prop="date" label="申请日期"> </el-table-column>
                <el-table-column prop="djje" label="单据金额"> </el-table-column>
                <el-table-column prop="kdkse" label="可抵扣税额"> </el-table-column>
                <el-table-column prop="name" label="申请人"> </el-table-column>
                <el-table-column prop="sqbm" label="申请部门"> </el-table-column>
                <el-table-column prop="zfzt" label="支付状态"> </el-table-column>
                <el-table-column label="操作">
                    <el-button type="text" size="small" icon="el-icon-search">查看</el-button>
                </el-table-column>
            </el-table>
        </div>

        <div class="dashboard-tblist">
            <div class="title">异常报销单</div>
            <a class="more" href="#">更多</a>
            <el-table :data="tableData" border stripe style="width: 100%;">
                <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                <el-table-column prop="bxdh" label="报销单号"> </el-table-column>
                <el-table-column prop="bxzt" label="报销主题"> </el-table-column>
                <el-table-column prop="date" label="申请日期"> </el-table-column>
                <el-table-column prop="djje" label="报销金额"> </el-table-column>
                <el-table-column prop="kdkse" label="可抵扣税额"> </el-table-column>
                <el-table-column prop="name" label="申请人"> </el-table-column>
                <el-table-column prop="sqbm" label="申请部门"> </el-table-column>
                <el-table-column prop="xjzt" label="巡检状态"> </el-table-column>
                <el-table-column label="操作">
                    <el-button type="text" size="small" icon="el-icon-search">查看</el-button>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: '',
            tableData: [
                {
                    bxdh: '202005140001',
                    bxzt: '广州出差报销',
                    date: '2016-05-02',
                    djje: '1,000.00',
                    kdkse: '60.00',
                    name: '王小虎',
                    sqbm: '销售部',
                    zfzt: '未支付',
                    xjzt: '存在作废发票'
                },
                {
                    bxdh: '202005140002',
                    bxzt: '客户需求沟通会议费用报销',
                    date: '2016-05-04',
                    djje: '2,300.00',
                    kdkse: '120.00',
                    name: '周虎',
                    sqbm: '销售部',
                    zfzt: '未支付',
                    xjzt: '存在红冲发票'
                },
                {
                    bxdh: '202005140003',
                    bxzt: '客户样品快递费用',
                    date: '2016-05-01',
                    djje: '3,400.00',
                    kdkse: '110.00',
                    name: '李雷',
                    sqbm: '销售部',
                    zfzt: '未支付',
                    xjzt: '存在红冲发票'
                },
                {
                    bxdh: '202005140004',
                    bxzt: '财务发票快递费用',
                    date: '2016-05-03',
                    djje: '6,000.00',
                    kdkse: '200.00',
                    name: '王小四',
                    sqbm: '销售部',
                    zfzt: '已支付',
                    xjzt: '存在红冲发票'
                }
            ]
        }
    }
}
</script>
