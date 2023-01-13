<template>
  <el-dialog :visible="showDialog" title="弹层标题" @close="closeDialog">
    <el-form ref="roleForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.description" placeholder="请输入角色描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="commit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { addRole } from '@/api/setting'

export default {
  name: 'SettingDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:showDialog', false)
      this.$refs.roleForm.resetFields()
    },
    commit() {
      this.$refs.roleForm.validate(async vaild => {
        if (!vaild) return
        await addRole(this.form)
        this.$message.success('添加成功')
        this.$emit('updateList')
        this.closeDialog()
      })
    }
  }
}
</script>

<style scoped>

</style>
