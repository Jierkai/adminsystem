<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 左侧 -->
          <el-tab-pane label="角色管理">
            <ManageRole />
          </el-tab-pane>

          <!-- 右侧-->
          <el-tab-pane label="公司信息">
            <ComponyInfo />
          </el-tab-pane>

        </el-tabs>
        <SettingDialog
          ref="dialog"
          :show-dialog.sync="isShow"
          :tree-node="treeNode"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import SettingDialog from '@/components/SettingDialog/index.vue'
import ComponyInfo from '@/views/setting/components/ComponyInfo.vue'
import ManageRole from '@/views/setting/components/ManageRole.vue'

/**
 * @param roles 暂存角色的数组
 * @param page 当前页数
 * @param pageSize 当前页显示多少数据
 * @param companyData 公司信息
 * @param isShow 是否展示模态框
 * @param loading 是否是加载状态
 */

export default {
  name: 'Setting',
  components: {
    ManageRole,
    ComponyInfo,
    SettingDialog
  },
  data() {
    return {
      isShow: false,
      treeNode: {}

    }
  },
  created() {
  }

}
</script>

<style scoped>
.block {
  text-align: center;
}
</style>
