<template>
  <el-dialog :visible="showDialog" title="弹层标题" @close="closeDialog">
    <!-- 表单内容 -->
    <el-form label-width="100px">
      <el-form-item label="权限名称">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="权限标识">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" />
      </el-form-item>
      <el-form-item label="权限启用">
        <el-switch
          v-model="formData.enVisible"
          active-text="启用权限点"
          inactive-text="关闭权限点"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="text-align: right;">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { reqAddPermission, reqGetPermissionDetail, reqUpdatePermission } from '@/api/permisson'

export default {
  name: 'PermissionDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    permissionID: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        name: '',
        code: '',
        type: '',
        pid: '',
        description: '',
        enVisible: false
      }
    }
  },
  watch: {
    permissionID: {
      immediate: true,
      async handler(newVal) {
        if (!newVal) return
        const res = await reqGetPermissionDetail(this.permissionID)
        this.formData = { ...res.data }
        this.formData.enVisible = !!this.formData.enVisible
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:showDialog', false)
      this.formData = {
        name: '',
        code: '',
        type: '',
        pid: '',
        description: '',
        enVisible: false
      }
    },
    async submit() {
      if (this.permissionID) {
        await reqUpdatePermission(this.formData)
        this.$message.success('修改成功')
        this.closeDialog()
        this.$emit('refleshData')
        return
      }
      await reqAddPermission(this.formData)
      this.$message.success('添加成功')
      this.closeDialog()
    }
  }
}
</script>
