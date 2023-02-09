<template>
  <!-- 分配权限的弹层 -->
  <el-dialog :visible="showAssignDialog" title="分配权限" @close="closeAssignDialog">
    <el-tree
      ref="permission"
      :check-strictly="true"
      :data="permissionList"
      :default-checked-keys="[5]"
      :default-expanded-keys="[2, 3]"
      :props="defaultProps"
      node-key="id"
      show-checkbox
    />
    <template #footer>
      <div style="text-align: right;">
        <el-button @click="closeAssignDialog">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { reqGetPermissionList, reqSetPermission } from '@/api/permisson'
import { getRoleDetail } from '@/api/setting'
import { tranListToTreeData } from '@/utils/tranListToTreeData'

export default {
  name: 'SettingPermissionDialog',
  props: {
    showAssignDialog: {
      type: Boolean,
      default: false
    },
    permissionId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      permissionList: [],
      userId: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    async permissionId(newVal) {
      if (!newVal) return
      const res = await getRoleDetail(newVal)
      await this.getRoleList()
      this.$refs.permission.setCheckedKeys(res.data.permIds)
      this.userId = res.data.id
    }
  },
  methods: {
    closeAssignDialog() {
      this.permissionList = []
      this.$emit('update:showAssignDialog', false)
    },
    async submit() {
      const checkList = this.$refs.permission.getCheckedKeys()
      const id = this.userId
      await reqSetPermission({ id, permIds: checkList })
      this.$message.success('修改成功')
      this.closeAssignDialog()
    },
    async getRoleList() {
      const res = await reqGetPermissionList()
      this.permissionList = Object.freeze(tranListToTreeData(res.data, '0'))
    }
  }
}
</script>

<style scoped>

</style>
