<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :visible="showDialog" title="新增部门">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input placeholder="1-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input placeholder="1-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select placeholder="请选择" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input :rows="3" placeholder="1-300个字符" style="width:80%" type="textarea" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" justify="center" type="flex">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log(false)
  }
}
</script>

<style scoped>

</style>
