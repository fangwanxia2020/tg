<template>
    <div>
        <ty-table
            :showIndex="false"
            :columns="columns"
            :data="tableData"
            :hidePage="false"
            @pageSizeChange="pageSizeChange"
            @pageCurrentChange="pageCurrentChange"
        >
            <div slot="table_oper" class="searchBox">
                <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>
            </div>
            <template slot="a" slot-scope="{data}">
                <el-switch
                    v-model="data.a"
                    @change="openSetting"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </template>
        </ty-table>
    </div>
</template>

<script>
    export default {
       
        data() {
            return {
                //列表查询接口信息
                getListInterface: {
                    url: "/chemical/checkRectify/list",
                    methodType: "get",
                    resFormatFun: this.getListResFormatFun,
                    params: {},
                },
                //列表字段定义
                columns: [
                    {
                        label: "消息编号",
                        baseSearch: true,
                        prop: "checkNo",
                    },
                    {
                        label: "消息标题",
                        baseSearch: true,
                        prop: "checkNo",
                    },
                    {
                        label: "触发类型",
                        baseSearch: true,
                        prop: "checkNo",
                    },
                    {
                        label: "发送方式",
                        baseSearch: true,
                        prop: "checkNo",
                    },
                    {
                        label: "发送渠道",
                        baseSearch: true,
                        prop: "checkNo",
                    },
                    {
                        prop: "a",
                        label: "操作",
                        width:"100",
                        type:"slot"
                    }
                ],
                tableData:[
                    {
                        checkNo:'ahahaha',

                    }
                ]
            }
        },
        methods: {
            /** 查询参数列表 */
            getList() {
                let sendData = {
                    pageNum: this.page.pageNo,
                    pageSize: this.page.limit,
                };
                // listConfig(sendData).then(response => {
                //     this.tableData = response.rows;
                //     this.page.total = response.total;
                // });
            },
            pageSizeChange(val) {
                this.page.limit = val;
                this.getList();
            },
            pageCurrentChange(val) {
                this.page.pageNo = val;
                this.getList();
            },
            openSetting(){

            },
        }
    }
</script>

<style scoped>

</style>