<template>
  <el-dialog :before-close="handleClose" :visible="isShow" class="assign-role" title="分配角色">
    <!-- 这里准备复选框 -->
    <el-checkbox-group v-model="checkList" v-loading="loading">
      <el-checkbox v-for="i in RoleList" :key="i.id" :label="i.id">
        {{ i.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-button size="small" type="primary" @click="changeRole">确定</el-button>
      <el-button size="small" @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { getRole, setRole } from '@/api/setting'
import { getUserDetail } from '@/api/user'

export default {
  name: 'AssignRole',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    UserID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      checkList: [],
      RoleList: []

    }
  },
  watch: {
    isShow: {
      async handler(newVal) {
        if (!newVal || !this.UserID) return
        this.loading = true
        const role = await getRole(1, 1000)
        const roleCheck = await getUserDetail(this.UserID)
        this.RoleList = Object.freeze([...role.data.rows])
        this.checkList = Object.freeze(roleCheck.data.roleIds || [])
        this.loading = false
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:isShow', false)
      this.checkList = this.RoleList = []
    },
    async changeRole() {
      await setRole({ id: this.UserID, roleIds: this.checkList })
      this.$message.success('修改角色权限成功')
      this.handleClose()
    }
  }
}
</script>

<style scoped>

</style>
