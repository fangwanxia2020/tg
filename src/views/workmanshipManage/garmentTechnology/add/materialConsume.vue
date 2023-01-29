<template>
  <!-- 材料消耗 -->
  <div>
    <div class="formItem-head">
      <span>材料消耗（单位：每10件）</span>
      <!-- <el-button icon="el-icon-plus" size="small" type="text" @click="openSpec" v-if="flag != 1 && flag != 2">新增规格</el-button> -->
      <el-button
        icon="el-icon-plus"
        size="small"
        type="text"
        @click="openParam"
        v-if="flag != 1 && flag != 2"
      >编辑料位</el-button>
    </div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        :label="item.colorCodeName"
        :name="item.code"
        v-for="(item,idx) in activeList"
        :key="idx"
      >
        <el-table
          :data="item.tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            label="规格"
            prop="sizeCodeName"
          >
          </el-table-column>
          <el-table-column
            label="寸数"
            prop="littleNum"
            width="100"
          >
            <template slot-scope="{$index,column}">
              <div>
                <el-input
                  size="small"
                  type="number"
                  v-model="item.tableData[$index][column.property]"
                  :disabled="flag == 1 || flag == 2"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="机号"
            prop="machineNum"
            width="100"
          >
            <template slot-scope="{$index,column}">
              <div>
                <el-input
                  size="small"
                  type="number"
                  v-model="item.tableData[$index][column.property]"
                  :disabled="flag == 1 || flag == 2"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="轧幅"
            prop="rollingNum"
            width="200"
          >
            <template slot-scope="{row}">
              <div class="part-num">
                <el-input
                  size="small"
                  type="number"
                  v-model="row.rollingNum"
                  :disabled="flag == 1 || flag == 2"
                ></el-input>
                <span>/</span>
                <el-input
                  size="small"
                  type="number"
                  v-model="row.rollingNum2"
                  :disabled="flag == 1 || flag == 2"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item,idx) in materialForm.materialObjList"
            :key="`material`+idx"
            :prop="item.dictLabel"
            :label="item.dictLabel"
          >
            <el-table-column
              label="门幅"
              :prop="`doorNum-${item.dictLabel}`"
              width="100"
            >
              <template slot-scope="{row}">
                <div>
                  <el-input
                    size="small"
                    type="number"
                    v-model.number="row[`doorNum-${item.dictLabel}`]"
                    :disabled="flag == 1 || flag == 2"
                    @input="sunSquare(row,item)"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="段长"
              :prop="`lengthNum-${item.dictLabel}`"
              width="100"
            >
              <template slot-scope="{row}">
                <div>
                  <el-input
                    size="small"
                    type="number"
                    v-model.number="row[`lengthNum-${item.dictLabel}`]"
                    :disabled="flag == 1 || flag == 2"
                    @input="sunSquare(row,item)"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="段数"
              :prop="`part1Num-${item.dictLabel}`"
              width="200"
            >
              <template slot-scope="{row}">
                <div class="part-num">
                  <el-input
                    size="small"
                    type="number"
                    v-model.number="row[`part1Num-${item.dictLabel}`]"
                    :disabled="flag == 1 || flag == 2"
                    @input="sunSquare(row,item)"
                  ></el-input>
                  <span>/</span>
                  <el-input
                    size="small"
                    type="number"
                    v-model.number="row[`part2Num-${item.dictLabel}`]"
                    :disabled="flag == 1 || flag == 2"
                    @input="sunSquare(row,item)"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="平方厘米"
              :prop="`squareNum-${item.dictLabel}`"
              width="100"
            >
              <template slot-scope="{row}">
                <div>
                  <!-- v-model=" row[`squareNum-${item.dictLabel}`] " -->
                  <el-input
                    size="small"
                    type="number"
                    :value="Math.round(row[`squareNum-${item.dictLabel}`]) "
                    disabled
                  ></el-input>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="总面积"
            prop="totalArea"
          >
            <template slot-scope="{row}">
              <div>
                {{calTotalArea(row)}}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="当前成衣工艺成品规格参数编辑"
      :visible.sync="materialForm.open"
      width="650px"
      append-to-body
    >
      <el-transfer
        v-model="materialForm.value"
        :data="materialForm.data"
        :props="materialForm.props"
        :titles="['未选','已选']"
      ></el-transfer>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addMaterial"
        >确 定</el-button>
        <el-button @click="materialForm.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import bus from '@/assets/js/eventBus';
export default {
  props: {
    garmentTechParaSpecVoList: {
      type: Array,
      required: true,
    }, //规格列表
    garmentTechColorVoList: {
      type: Array,
      required: true,
    }, //配色列表
    garmentTechPositionVoList: {
      type: Array,
      required: true,
    }, //材料消耗参数
    flag: null,
  },
  watch: {
    // garmentTechParaSpecVoList: {
    //   handler: function(newVal) {
    //     if (newVal && newVal.length > 0) {
    //       this.handleDetail();
    //     }
    //   },
    //   deep: true
    // },
    garmentTechColorVoList: {
      handler: function(newVal) {
        this.handleDetail();
        // if (newVal && newVal.length > 0) {
        //   this.handleDetail();
        // }
      },
      deep: true
    },
    garmentTechPositionVoList: {
      handler: function(newVal) {
        this.handleDetail();
        // if (newVal && newVal.length > 0) {
        //   this.handleDetail();
        // }
      },
      deep: true
    },
  },
  data() {
    return {
      tableData: [],
      specObjList: [],
      materialForm: {
        open: false,
        value: [],
        data: [],
        materialList: [],
        materialObjList: [],
        props: {
          key: "dictLabel",
          label: "dictLabel"
        }
      },
      specKeys: ['sizeCodeName', 'sizeId', 'littleNum', 'machineNum', 'rollingNum', 'rollingNum2',
        'totalArea'], //料位之外的参数key值数组
      materialKeys: ['doorNum', 'lengthNum', 'part1Num', 'part2Num', 'squareNum'], //料位的参数key值数组
      activeName: '1',
      activeList: []
    }
  },
  mounted() {
    this.getSpec();
    this.getColor();
  },
  methods: {
    //计算总面积
    calTotalArea(row) {
      let num = 0;
      Object.keys(row).map(key => {
        if (key.indexOf('squareNum') > -1) {
          if (row[key]) {
            num += row[key] * 1;
          }
        }
      })
      num = Math.round(num)
      row.totalArea = num;
      return num;
    },
    //计算平方厘米
    sunSquare(row, item) {
      // console.log(row, row[`doorNum-${item.dictLabel}`])
      if (row[`doorNum-${item.dictLabel}`] && row[`lengthNum-${item.dictLabel}`] && row[
          `part1Num-${item.dictLabel}`] && row[`part2Num-${item.dictLabel}`] > 0) {
        row[`squareNum-${item.dictLabel}`] = row[`doorNum-${item.dictLabel}`] * row[
          `lengthNum-${item.dictLabel}`] * row[`part1Num-${item.dictLabel}`] / row[
          `part2Num-${item.dictLabel}`]
      }
    },
    //获取规格
    getSpec() {
      bus.$on('sendByBus', data => {
        let {
          list,
          index
        } = data;
        // console.log(index);
        if (index !== null) {
          this.specObjList.splice(index, 1);
          for (let item1 of this.activeList) {
            item1.tableData.splice(index, 1);
          }
        }
        else {
          this.specObjList = list;
          this.handleSpecAndParam();
        }
      })
    },
    //获取配色
    getColor() {
      bus.$on('sendColorByBus', data => {
        let {
          list,
          index
        } = data;
        if (this.activeList.length === 0) {
          this.activeList = list;
          this.handleSpecAndParam();
        }
        else {
          if (this.activeList.length > list.length) {
            this.activeList.splice(index, 1);
            let activeStatus = this.activeList.every(item => {
              return item.code === this.activeName;
            })
            if (!activeStatus) {
              this.activeName = '1';
            }
          }
          else if (this.activeList.length < list.length) {
            this.activeList.push(Object.assign({}, list[index], {
              tableData: JSON.parse(JSON.stringify(this.tableData))
            }))
          }
          else if (this.activeList.length === list.length) {
            this.activeList[index] = Object.assign(this.activeList[index], list[index]);
          }
        }
      })
    },
    handleClick() {
      // console.log(this.activeList);
    },
    //打开料位弹窗
    openParam() {
      this.materialForm.open = true;
      this.materialForm.value = this.materialForm.materialList;
      this.getDictsMaterial();
    },
    getDictsMaterial() {
      this.getDicts("grament_material_consume").then(response => {
        this.materialForm.data = response.data;
      });
    },
    //新建料位
    addMaterial() {
      this.materialForm.materialList = this.materialForm.value;
      this.materialForm.open = false;
      const list = this.materialForm.data.filter(item => {
        return this.materialForm.materialList.includes(item.dictLabel);
      })
      this.materialForm.materialObjList = list;
      // console.log(list)
      this.handleSpecAndParam();
    },
    //处理详情返回的信息
    handleDetail() {
      this.materialForm.materialList = [];
      this.materialForm.materialObjList = [];
      this.specObjList = [];
      this.activeList = [];
      if (this.garmentTechPositionVoList.length > 0) {
        for (let item of this.garmentTechPositionVoList) {
          this.materialForm.materialList.push(item.positionName)
          this.materialForm.materialObjList.push({
            dictLabel: item.positionName
          });
        }
      }
      if (this.garmentTechParaSpecVoList.length > 0) {
        for (let item of this.garmentTechParaSpecVoList) {
          this.specObjList.push({
            sizeId: item.sizeId,
            sizeName: item.sizeCodeName
          });
        }
      }
      if (this.garmentTechColorVoList.length > 0) {
        for (let i = 0; i < this.garmentTechColorVoList.length; i++) {
          let item = this.garmentTechColorVoList[i];
          let obj = {
            erpColorId: item.erpColorId,
            printingNo: item.printingNo,
            clothPattern: item.clothPattern,
            daColorId: item.daColorId,
            colorCodeName: item.erpColorCodeName,
            daColorCodeName: item.daColorCodeName,
            code: i + 1 + ''
          }
          this.activeList.push(obj)
        }
      }
      this.handleSpecAndParam();
      if (this.activeList.length > 0) {
        for (let i = 0; i < this.activeList.length; i++) {
          let item = this.activeList[i];
          if (item.tableData.length > 0) {
            for (let item1 of item.tableData) {
              if (this.garmentTechColorVoList.length > i && this.garmentTechColorVoList[i]
                .garmentTechPositionSpecVoList) {
                for (let item2 of this.garmentTechColorVoList[i].garmentTechPositionSpecVoList) {
                  if (item1.sizeId === item2.sizeId) {
                    for (let key1 of this.specKeys) {
                      item1[key1] = item2[key1];
                    }
                    if (item2.garmentTechPositionUseVoList.length > 0) {
                      for (let item3 of item2.garmentTechPositionUseVoList) {
                        for (let key2 of this.materialKeys) {
                          item1[`${key2}-${item3.positionName}`] = item3[key2];
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    //处理规格和料位
    handleSpecAndParam() {
      // if (this.specObjList.length === 0 || this.materialForm.materialObjList === 0 || this.activeList
      //   .length === 0) {
      //   return;
      // }
      this.activeList.map(item => {
        this.tableData = [];
        if (this.specObjList.length > 0) {
          for (let item1 of this.specObjList) {
            let arr = [];
            let obj = {};
            if (item.tableData && item.tableData.length > 0) {
              arr = item.tableData.find(tab => tab.sizeId == item1.sizeId);
              obj = {
                sizeCodeName: item1.sizeName,
                sizeId: item1.sizeId,
                littleNum: arr ? arr.littleNum : null,
                machineNum: arr ? arr.machineNum : null,
                rollingNum: arr ? arr.rollingNum : null,
                rollingNum2: arr ? arr.rollingNum2 : null,
                totalArea: arr ? arr.totalArea : null
              }
              if (this.materialForm.materialObjList.length > 0) {
                for (let item2 of this.materialForm.materialObjList) {
                  obj[`doorNum-${item2.dictLabel}`] = arr ? arr[`doorNum-${item2.dictLabel}`] : null;
                  obj[`lengthNum-${item2.dictLabel}`] = arr ? arr[`lengthNum-${item2.dictLabel}`] : null;
                  obj[`part1Num-${item2.dictLabel}`] = arr ? arr[`part1Num-${item2.dictLabel}`] : null;
                  obj[`part2Num-${item2.dictLabel}`] = arr ? arr[`part2Num-${item2.dictLabel}`] : null;
                  obj[`squareNum-${item2.dictLabel}`] = arr ? arr[`squareNum-${item2.dictLabel}`] : null
                }
              }
              this.tableData.push(obj)
            }
            else {
              obj = {
                sizeCodeName: item1.sizeName,
                sizeId: item1.sizeId,
                littleNum: null,
                machineNum: null,
                rollingNum: null,
                rollingNum2: null,
                totalArea: null
              }
              for (let item2 of this.materialForm.materialObjList) {
                obj[`doorNum-${item2.dictLabel}`] = null;
                obj[`lengthNum-${item2.dictLabel}`] = null;
                obj[`part1Num-${item2.dictLabel}`] = null;
                obj[`part2Num-${item2.dictLabel}`] = null;
                obj[`squareNum-${item2.dictLabel}`] = null;
              }
              this.tableData.push(obj)
            }
          }
        }
        this.$set(item, 'tableData', JSON.parse(JSON.stringify(this.tableData)));
      })
    },
    //处理传递的数据
    handleData() {
      // if (this.materialForm.materialObjList === 0) {
      //   this.messageErr('请选择料位再提交');
      //   return null;
      // }
      let array = [];
      if (this.activeList.length > 0) {
        for (let itemObj of this.activeList) {
          let list = [];
          if (itemObj.tableData && itemObj.tableData.length > 0) {
            for (let i = 0; i < itemObj.tableData.length; i++) {
              let data = itemObj.tableData[i];
              let obj = {
                sortNo: i + 1,
                addGarmentTechPositionUseDataList: []
              };
              let otherItemObj = {};
              let keyList = Object.keys(data);
              for (let key of keyList) {
                let item = data[key];
                // if (!item) {
                //   this.messageErr('请填写完全材料消耗再提交');
                //   return false;
                // }
                //先抽出料位之外的参数
                if (this.specKeys.indexOf(key) > -1) {
                  obj[key] = item;
                }
                else {
                  otherItemObj[key] = item;
                }
              }
              for (let j = 0; j < this.materialForm.materialObjList.length; j++) {
                let materialItem = this.materialForm.materialObjList[j];
                let _obj = {
                  sortNo: j + 1,
                  positionName: materialItem.dictLabel
                };
                Object.keys(otherItemObj).map(key => {
                  let _arry = key.split('-')
                  if (_arry[1] == materialItem.dictLabel) {
                    _obj[_arry[0]] = otherItemObj[key];
                  }
                })
                obj.addGarmentTechPositionUseDataList.push(_obj);
              }
              list.push(obj);
            }
          }
          array.push(list);
        }
      }
      return array;
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.part-num {
  @include faj(center, center);
}

</style>
