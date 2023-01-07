<template>
  <el-row align="middle" justify="space-between" style="height: 40px;width: 100%" type="flex">
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="8">
      <el-row justify="end" type="flex">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from '@/api/department'

export default {
  name: 'TreeTools',
  props: {
    treeNode: {
      type: Object,
      require: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    operateDepts(type) {
      switch (type) {
        case 'add':
          this.$emit('addDepts', this.treeNode)
          break
        case 'del':
          this.$confirm('确定要删除吗')
            .then(() => {
              console.log(this.treeNode.id)
              delDepartment(this.treeNode.id).then(() => {
                this.$emit('delDepart')
                this.$message.success('删除成功')
              })
            })

          break
        case 'edit':
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
