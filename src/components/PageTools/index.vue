<template>
  <el-card class="page-tools">
    <!-- 左侧 -->
    <div class="left">
      <div v-if="$slots.text" class="tips">
        <i class="el-icon-info" />
        <slot name="text" />
      </div>
    </div>
    <div class="right">
      <!-- 右侧 -->
      <slot name="button" />
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools'
}
</script>

<style lang="scss" scoped>
.page-tools {
  ::v-deep {
    .el-card__body {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

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
