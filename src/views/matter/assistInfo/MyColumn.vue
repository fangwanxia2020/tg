<template>
  <div>
    <div>
      <div v-if="col.prop == 'operation'">
        <el-table-column
          :prop="col.prop"
          :label="col.label"
          align="left"
          width="120"
          :key="col.label"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.colorType==1">
              <el-button
                type="text"
                size="mini"
                @click="modify(scope.row)"
                v-hasPermi="['matter:assistInfo:edit']"
              >修改</el-button>
              <el-button
                type="text"
                size="mini"
                @click="deactivate(scope.row)"
                v-if="scope.row.stopNo == 0"
                v-hasPermi="['matter:assistInfo:deactive']"
              >停用</el-button>
              <el-button
                v-else
                type="text"
                size="mini"
                @click="deactivate(scope.row)"
                v-hasPermi="['matter:assistInfo:isdeactive']"
              >启用</el-button>
            </span>
          </template>
        </el-table-column>
      </div>
      <div v-else-if="col.prop == 'colorType'">
        <el-table-column
          :prop="col.prop"
          :label="col.label"
          align="left"
          width="120"
          :key="col.label"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.colorType==2">大丰</span>
            <span v-if="scope.row.colorType==1">外采</span>
          </template>
        </el-table-column>
      </div>
      <div v-else>
        <el-table-column
          :prop="col.prop"
          :label="col.label"
          align="left"
          width="120"
          :key="col.label"
        >
          <template v-if="col.children">
            <my-column
              v-on="$listeners"
              v-for="item in col.children"
              :key="item.label"
              :col="item"
            ></my-column>
          </template>
        </el-table-column>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyColumn",
  props: {
    col: {
      type: Object
    }
  },
  methods: {
    //修改
    modify(row) {
      // console.log(row, 111)
      this.$emit("modify", row)
    },
    deactivate(row) {
      this.$emit("deactivate", row)
    }
  }
}

</script>
