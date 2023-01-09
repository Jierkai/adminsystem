<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 左侧 -->
          <el-tab-pane label="角色管理">
            <!-- 按钮 -->
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
            >新增角色
            </el-button>
            <!-- 表格 -->
            <el-table>
              <el-table-column label="序号" width="100" />
              <el-table-column label="角色名称" width="240" />
              <el-table-column label="描述" />
              <el-table-column label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <!-- 公司信息 -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting'
}
</script>

<style scoped>

</style>
