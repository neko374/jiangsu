<template>
  <div>
    <el-table
      :data="tabledata"
      border
      show-overflow-tooltip
      style="width: 100%"
      :stripe="isStripe"
      :show-header="isShowHeader"
      class="commonTable"
      @selection-change="selectionLineChangeHandle"
      @cell-click = "cellClick"
    >
      <el-table-column
        type="selection"
        width="50"
        v-if="selection == true"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="序号"
        type="index"
        align="center"
        v-if="showindex"
        width="70"
      ></el-table-column>
      <el-table-column
        label="标题"
       
        align="center"
       show-overflow-tooltip
        width="1300"
      >
       <template slot-scope="scope">
              <div v-html="scope.row.title"></div>
          </template>
      </el-table-column>
      <el-table-column
        v-for="(item, i) in labels"
        :key="i"
        show-overflow-tooltip
        :label="isShowHeader ? item.label : ''"
        :prop="item.prop"
        :min-width="item.width ? item.width : '50'"
        align="center"
      >
      </el-table-column>
      <slot name="label"></slot>

      <el-table-column
        label="操作"
        min-width="180"
        align="center"
        v-if="showoperation"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, i) in operatetypes"
            :key="i"
            size="medium"
            :style="item.background"
            style="font-size: 14px"
            @click.native.prevent="doOpeartion(scope.$index, tabledata, item)"
            >{{ item.operation }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: [
    "selection",
    "isShowHeader",
    "labels",
    "tabledata",
    "pagesize",
    "showindex",
    "showoperation",
    "operatetypes",
    "isStripe",

  ],
  data() {
    return {};
  },

  methods: {
    doOpeartion(index, rows, item) {
      // console.log(index)
      // console.log(rows[index].userId)
      this.$emit("operation", index, rows, item);
    },
    selectionLineChangeHandle(val) {
      this.$emit("remove", val);
    },
    cellClick(row, column, cell, event){
        // console.log(row)
        // console.log(column)
        // console.log(cell)
        // console.log(event)
        this.$emit("cellClick", row, column, cell, event);
    }
  },
};
</script>

<style>
.commonTable .el-button {
  color: #fff;
  font-size: 16px;
  padding: 3px 10px;
}
.commonTable .el-button:hover {
  text-decoration: none;
  color: #fff;
}
.commonTable td,
.commonTable th {
  padding: 8px 0px;
}
.el-table_1_column_2 .el-tooltip{
  cursor: pointer!important;
  width: 1300px!important;
}
</style>
