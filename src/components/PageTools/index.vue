<template>
  <div class="page-tools">
    <!-- 左侧 -->
    <div class="left">
      <div class="tips">
        <i class="el-icon-info" />
        <span>当前共有XXXX条记录</span>
      </div>
    </div>
    <div class="right">
      <!-- 右侧 -->
      <el-button size="small" type="primary">普通Excel导出</el-button>
      <el-button size="small" type="primary">Excel导出</el-button>
      <el-button size="small" type="primary">Excel导入</el-button>
      <el-button size="small" type="primary">新增员工</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTools'
}
</script>

<style lang="scss" scoped>
.page-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tips {
    line-height: 34px;
    padding: 0px 15px;
    border-radius: 5px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);

    i {
      margin-right: 10px;
      color: #409eff;
    }
  }
}
</style>
