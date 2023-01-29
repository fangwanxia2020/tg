<template>
  <!-- 成品规格 -->
  <div>
    <div class="formItem-head">
      <span>成品规格</span>
      <el-button
        icon="el-icon-plus"
        size="small"
        type="text"
        @click="openSpec"
        v-if="flag != 1 && flag != 2"
      >新增规格</el-button>
      <el-button
        icon="el-icon-plus"
        size="small"
        type="text"
        @click="openParam"
        v-if="flag != 1 && flag != 2"
      >编辑参数</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        label="规格"
        prop="sizeCodeName"
      >
      </el-table-column>
      <el-table-column
        v-for="(item,idx) in paramForm.paramObjList"
        :key="idx"
        :prop="item.dictLabel?item.dictLabel.toString():''"
        :label="item.dictLabel"
      >
        <template slot-scope="{$index,column}">
          <div>
            <el-input
              size="small"
              type="number"
              v-model="tableData[$index][column.property]"
              :disabled="flag == 1 || flag == 2"
            ></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        v-if="flag != 1 && flag != 2"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑规格"
      :visible.sync="specForm.open"
      width="650px"
      append-to-body
    >
      <el-transfer
        v-model="specForm.value"
        :data="specForm.data"
        :props="specForm.props"
        :titles="['未选','已选']"
      ></el-transfer>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addSpec"
        >确 定</el-button>
        <el-button @click="specForm.open = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑参数"
      :visible.sync="paramForm.open"
      width="650px"
      append-to-body
    >
      <el-transfer
        v-model="paramForm.value"
        :data="paramForm.data"
        :props="paramForm.props"
        :titles="['未选','已选']"
      ></el-transfer>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addParam"
        >确 定</el-button>
        <el-button @click="paramForm.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  sizeList
}
from '@/api/workmanshipManage/garmentTechnology';
import bus from '@/assets/js/eventBus';
export default {
  props: {
    garmentTechParaSpecVoList: {
      type: Array,
      required: true,
    }, //成品规格
    garmentTechParaVoList: {
      type: Array,
      required: true,
    }, //成品规格参数
    flag: null,
  },
  watch: {
    garmentTechParaVoList: {
      handler: function(newVal) {
        this.handleDetai();
        // if (newVal && newVal.length > 0) {
        //   this.handleDetai();
        // }
      }
    },
    garmentTechParaSpecVoList: {
      handler: function(newVal) {
        this.handleDetai();
        // if (newVal && newVal.length > 0) {
        //   this.handleDetai();
        // }
      }
    },
  },
  data() {
    return {
      toDisabled: false,
      tableData: [],
      specForm: {
        open: false,
        value: [],
        data: [],
        specList: [],
        specObjList: [],
        props: {
          key: "sizeId",
          label: "sizeName"
        }
      },
      paramForm: {
        open: false,
        value: [],
        data: [],
        paramList: [],
        paramObjList: [],
        props: {
          key: "dictLabel",
          label: "dictLabel"
        }
      },
    }
  },
  methods: {
    //打开参数弹窗
    openParam() {
      this.paramForm.open = true;
      this.paramForm.value = this.paramForm.paramList;
      this.getDictsParam();
    },
    getDictsParam() {
      this.getDicts("garment_spe_param").then(response => {
        // for (var i = 0; i < response.data.length; i++) {
        //     response.data[i].dictLabel = Number(response.data[i].dictLabel);
        // }
        this.paramForm.data = response.data;
      });
    },
    //新建参数
    addParam() {
      this.paramForm.paramList = this.paramForm.value;
      this.paramForm.open = false;
      const list = this.paramForm.data.filter(item => {
        return this.paramForm.paramList.includes(item.dictLabel);
      })
      this.paramForm.paramObjList = list;
      this.handleSpecAndParam();
    },
    //传送规格参数给材料消耗
    sendSpec(index = null) {
      bus.$emit('sendByBus', {
        list: this.specForm.specObjList,
        index
      });
    },
    //打开规格弹窗
    openSpec() {
      this.specForm.open = true;
      this.specForm.value = this.specForm.specList;
      this.getSizeList();
    },
    //新建规格
    addSpec() {
      this.specForm.specList = this.specForm.value;
      this.specForm.open = false;
      const list = this.specForm.data.filter(item => {
        return this.specForm.specList.includes(item.sizeId);
      })
      this.specForm.specObjList = list;
      this.sendSpec();
      this.handleSpecAndParam();
    },
    //处理详情返回的信息
    handleDetai() {
      this.paramForm.paramList = [];
      this.paramForm.paramObjList = [];
      if (this.garmentTechParaVoList.length > 0) {
        for (let item of this.garmentTechParaVoList) {
          this.paramForm.paramList.push(item.paraName)
          this.paramForm.paramObjList.push({
            dictLabel: item.paraName
          });
        }
      }
      let garmentTechParaUseVoList = [];
      this.specForm.specList = [];
      this.specForm.specObjList = [];
      if (this.garmentTechParaSpecVoList.length > 0) {
        for (let item of this.garmentTechParaSpecVoList) {
          if (item.garmentTechParaUseVoList.length > 0) {
            for (let item1 of item.garmentTechParaUseVoList) {
              item1.sizeId = item.sizeId;
              garmentTechParaUseVoList.push(item1);
            }
          }
          this.specForm.specList.push(item.sizeId)
          this.specForm.specObjList.push({
            sizeId: item.sizeId,
            sizeName: item.sizeCodeName
          });
        }
      }
      this.handleSpecAndParam();
      if (this.tableData.length > 0) {
        for (let item1 of this.tableData) {
          for (let item2 of garmentTechParaUseVoList) {
            if (item1.sizeId === item2.sizeId) {
              item1[item2.paraName] = item2.useNum
            }
          }
        }
      }
    },
    //处理规格和参数
    handleSpecAndParam() {
      // if (this.specForm.specObjList.length === 0 || this.paramForm.paramObjList === 0) {
      //   return;
      // }
      let tableData = [];
      let data = [];
      if (this.specForm.specObjList.length > 0) {
        for (let item1 of this.specForm.specObjList) {
          let obj = {
            sizeCodeName: item1.sizeName,
            sizeId: item1.sizeId
          }
          if (this.paramForm.paramObjList.length > 0) {
            for (let item1 of this.paramForm.paramObjList) {
              obj[item1.dictLabel] = '';
            }
          }
          tableData.push(obj)
        }
      }
      tableData.map(item => {
        const arr = this.tableData.find(i => i.sizeId == item.sizeId)
        if (arr) {
          data.push(arr)
        }
        else {
          data.push(item)
        }
      })
      this.tableData = data;
    },
    //获取规格列表
    getSizeList() {
      sizeList({
        // ruleId: 3,
        pageNum: 1,
        pageSize: 999,
        stopNo: 0
      }).then(res => {
        if (res.code === 200) {
          this.specForm.data = res.data;
        }
      })
    },
    //处理传递的数据
    handleData() {
      // if (this.tableData.length === 0) {
      //   this.messageErr('请选择成品规格再提交');
      //   return null;
      // }
      // if (this.paramForm.paramObjList.length === 0) {
      //   this.messageErr('请选择成品规格参数再提交');
      //   return null;
      // }
      let list = [];
      if (this.tableData.length > 0) {
        for (let data of this.tableData) {
          let obj = {
            addGarmentTechParaDataList: []
          };
          // let index = 0;
          let keys = Object.keys(data);
          for (let key of keys) {
            let item = data[key];
            if (key === 'sizeCodeName' || key === 'sizeId') {
              obj[key] = item;
            }
            // else {
            // if (!item) {
            //   this.messageErr('请填写完全成品规格再提交');
            //   return false;
            // }
            // index++;
            // let item1 = this.paramForm.paramObjList.find(val => {
            //   return val.dictLabel == key;
            // })
            // console.log(item1, 'item1');
            // obj.addGarmentTechParaDataList.push({
            //   sortNo: index,
            //   paraName: item1 ? item1.dictLabel : '',
            //   useNum: item
            // })
            // }
          }
          this.paramForm.paramObjList.map((its, index) => {
            obj.addGarmentTechParaDataList.push({
              sortNo: index,
              paraName: its.dictLabel,
              useNum: data[its.dictLabel] ? data[its.dictLabel] : ''
            })
          })
          list.push(obj);
        }
      }
      return list;
    },
    handleDelete(index, row) {
      // console.log(index, this.specForm, this.tableData);
      let specList = this.specForm.specList.filter(item => item != row.sizeId)
      let specObjList = this.specForm.specObjList.filter(item => item.sizeId != row.sizeId);
      this.tableData.splice(index, 1);
      this.specForm.specList = JSON.parse(JSON.stringify(specList))
      this.specForm.specObjList = JSON.parse(JSON.stringify(specObjList))
      this.sendSpec(index);
      this.handleSpecAndParam()
    }
  }
}

</script>
<style scoped>
</style>
