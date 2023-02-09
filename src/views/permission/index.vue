<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button size="small" type="primary" @click="showPermissionDialog(1,'0')">添加权限</el-button>
        </div>
        <PermissionDialog
          ref="permissionDialog"
          :permission-i-d="permissionId"
          :show-dialog.sync="isShow"
          @refleshData="getPermissionList"
        />
        <el-table
          :data="PermissionList"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          border
          row-key="id"
        >
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button
                v-if="row.type === 1"
                size="small"
                type="text"
                @click="showPermissionDialog(row.type,row.id)"
              >
                添加权限点
              </el-button>
              <el-button size="small" type="text" @click="showPermissionDialog(0,'',row.id)">查看</el-button>
              <el-button size="small" type="text" @click="removePermission(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { reqDelPermission, reqGetPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils/tranListToTreeData'
import PermissionDialog from '@/views/permission/components/PermissionDialog.vue'

export default {
  name: 'Permission',
  components: { PermissionDialog },
  data() {
    return {
      PermissionList: [],
      isShow: false,
      permissionId: ''
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await reqGetPermissionList()
      this.PermissionList = Object.freeze(tranListToTreeData(res.data, '0'))
    },
    async removePermission(id) {
      await reqDelPermission(id)
      this.$message.success('删除成功')
      await this.getPermissionList()
    },
    showPermissionDialog(type = 0, pid = '', id = '') {
      const permission = this.$refs.permissionDialog
      this.isShow = true
      permission.formData.type = type
      permission.formData.pid = pid
      this.permissionId = id
    }
  }
}
</script>

<style scoped>

</style>
