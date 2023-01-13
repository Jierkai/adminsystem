<template>
  <div class="manage-role">
    <!-- 按钮 -->
    <el-button
      icon="el-icon-plus"
      size="small"
      type="primary"
      @click="showDialog"
    >新增角色
    </el-button>
    <!-- 表格 -->
    <el-table :data="roles">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="角色名称" prop="name" width="240" />
      <el-table-column label="描述" prop="description" />
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button size="small" type="success">分配权限</el-button>
          <el-button size="small" type="primary" @click="getDetail(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="removeRole(row)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
    <!--            分页-->
    <div class="block">
      <el-pagination
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="changePage"
        @prev-click="changePage"
        @next-click="changePage"
        @size-change="changePageSize"
      />
    </div>
  </div>
</template>

<script>
import { getRole, getRoleDetail, removeRole } from '@/api/setting'

export default {
  name: 'ManageRole',
  data() {
    return {
      loading: false,
      page: 1,
      pageSize: 5,
      roles: [],
      total: 0
    }
  },
  created() {
    this.page = this.$route.query.page || 1
    this.getRolesList(this.page, this.pageSize)
  },
  methods: {
    async getRolesList(page, pageSize) {
      const res = await getRole(page, pageSize)
      const { data } = res
      this.roles = [...data.rows]
      this.total = data.total
    },
    async changePage(val) {
      if (this.loading) return
      this.$router.push({
        query: {
          page: val
        }
      })
      this.loading = true
      this.page = val
      await this.getRolesList(val, this.pageSize)
      this.loading = false
    },
    async getDetail(row) {
      const res = await getRoleDetail(row.id)
      console.log(res)
    },
    changePageSize(val) {
      this.pageSize = val
      this.getRolesList(this.page, this.pageSize)
    },
    removeRole(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        console.log(row)
        await removeRole(row.id)
        this.getRolesList(this.page, this.pageSize)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showDialog(row = {}) {
      this.isShow = true
    }

  }
}
</script>

<style scoped>

</style>
