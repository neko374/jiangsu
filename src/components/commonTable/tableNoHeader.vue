<template>
  <div>
      <el-table
    :data="tabledata"
    border
    show-overflow-tooltip
    style="width:100%"
    :stripe="isStripe"
    :show-header="isShowHeader"
    >
    <el-table-column
      type="selection"
      width="55" v-if="selection" align="center">
    </el-table-column>
    <el-table-column 
      label="序号" type="index"  align="center" v-if="showindex" width="60"
      >
    </el-table-column>
    <el-table-column v-for="(item,i) in labels" :key="i" show-overflow-tooltip
      :label="item.label"
       :prop="item.prop"
       align="center"
       :min-width="item.width?item.width:'100'"
      >
    </el-table-column>
    <el-table-column label="操作" min-width="180" align="center"  v-if="showoperation">
      <template>
        <el-button v-for="(item,i) in operatetypes"  :key="i"
          size="medium"  :style="item.background"
          @click="handleEdit(item)">{{item.operation}}</el-button>
        
      </template>
    </el-table-column>
  </el-table>
  </div>
  
</template>

<script>
export default {
     props:["isShowHeader","labels","tabledata","pagesize","showindex","showoperation","operatetypes","isStripe","selection"],
      data(){
        return {
           
        }
    },
    
    methods:{
         handleEdit(item){
            this.$emit("operation",item)
        },
    }
       
    }
    

</script>

<style>
  .el-button{
    color: #fff;
    font-size: 16px;
  }
  .el-button:hover{
    text-decoration: none;
    color: #fff;
  }
</style>