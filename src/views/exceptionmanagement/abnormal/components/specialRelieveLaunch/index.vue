<template>
  <div>
    <el-dialog
      title="发起异常"
      :visible.sync="openDialog"
      width="900px"
    >
      <ty-table
        id="throwId"
        v-if="columns"
        :columns="columns"
        :data="tableData"
        :hidePage="true"
      >
        <template
          slot="operations"
          slot-scope="{data}"
        >
          <el-button
            v-if="data.throwState == 1"
            size="small"
            type="text"
            class="clear-abnormal"
            @click="clearAbnormal(data)"
          >解除异常</el-button>
        </template>
      </ty-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="openDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getColumns } from './launchColumn';
  import { clearThrow } from '@/api/exceptionmanagement/abnormal';
  export default {
    data() {
      return {
        columns:null,
        openDialog: false,
      }
    },
    props:{
      tableData:{
        type:Array,
        require:true,
        default:()=> {
          return []
        }
      },
    },
    watch:{
      openDialog(val) {
        if(val) {
          this.init();
        }
      }
    },
    methods: {
      async init() {
        this.columns = await getColumns()
      },
      openLaunch() {
        this.openDialog = true;
      },
      //解除异常
      clearOneThrow(throwId) {
        return new Promise(resolve=>{
          this.confirm("确定解除该异常吗？", () => {
            clearThrow({throwId}).then(res => {
              if (res.code == 200) {
                this.$message.success("解除成功");
                resolve()
              }
            });
          });
        })
      },
      //解除异常
      async clearAbnormal({throwId}) {
        await this.clearOneThrow(throwId);
        this.openDialog = false;
        this.$emit('clearSubmit');
      },
    }
  }
</script>

<style scoped>

</style>