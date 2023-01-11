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
              @click="showDialog=true"
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
                  <el-button size="small" type="primary">编辑</el-button>
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
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <!-- 警告信息 -->
            <el-alert
              :closable="false"
              show-icon
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
            />
            <!-- 表单 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input :value="companyData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input :value="companyData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input :value="companyData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input :rows="3" :value="companyData.remarks" disabled style="width:400px" type="textarea" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <SettingDialog :show-dialog.sync="showDialog" @updateList="getRolesList(page, pageSize)" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { getComponyInfo, getRole } from '@/api/setting'
import SettingDialog from '@/components/SettingDialog/index.vue'

/**
 * @param roles 暂存角色的数组
 * @param page 当前页数
 * @param pageSize 当前页显示多少数据
 */

export default {
  name: 'Setting',
  components: { SettingDialog },
  data() {
    return {
      roles: [],
      companyData: {},
      page: 1,
      pageSize: 5,
      total: 0,
      showDialog: false,
      loading: false
    }
  },
  created() {
    const page = this.$route.query.page || this.page
    this.getRolesList(page, this.pageSize)
    const companyID = this.$store.state.user?.userInfo?.companyId
    getComponyInfo(companyID).then(res => {
      this.companyData = { ...res.data }
    })
  },
  methods: {
    async getRolesList(page, pageSize) {
      const res = await getRole(page, pageSize)
      const { data } = res
      this.roles = [...data.rows]
      this.total = data.total
    },
    async changePage(val) {
      this.$router.push({
        query: {
          page: val
        }
      })
      if (this.loading) return
      this.loading = true
      this.page = val
      await this.getRolesList(val, this.pageSize)
      this.loading = false
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
      }).then(() => {
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
    }

  }
}
</script>

<style scoped>
.block {
  text-align: center;
}
</style>
