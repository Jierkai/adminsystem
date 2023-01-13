<template>
  <div class="employees-container">
    <div class="app-container">
      <PageTools>
        <template #text>
          <span>总记录数: {{ total }}</span>
        </template>
        <template #button>
          <el-button size="small" type="warning">excel导入</el-button>
          <el-button size="small" type="danger">excel导出</el-button>
          <el-button size="small" type="primary" @click="isShow = true">新增员工</el-button>
        </template>
      </PageTools>
      <AddEmployee :show-dialog.sync="isShow" />
      <el-card style="margin-top: 10px;">
        <el-table :data="employeeList" border>
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="手机号" prop="mobile" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column :formatter="formatterEmpolyee" label="聘用形式" prop="formOfEmployment" sortable="" />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
            <template #default="{ row }">
              {{ row.timeOfEntry | timeFilter }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" sortable="" width="280">
            <template #default="{row}">
              <el-button size="small" type="text">查看</el-button>
              <el-button size="small" type="text">转正</el-button>
              <el-button size="small" type="text">调岗</el-button>
              <el-button size="small" type="text">离职</el-button>
              <el-button size="small" type="text">角色</el-button>
              <el-button size="small" type="text" @click="remove(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            :page-size="pageSize"
            :page-sizes="[10, 15, 20, 25]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="changePage"
            @prev-click="changePage"
            @next-click="changePage"
            @size-change="changePageSize"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

import { removeEmployee, reqEmployeeList } from '@/api/employee'
import employees from '@/constant/employees'
import AddEmployee from '@/views/employees/components/AddEmployee.vue'

/**
 * @param employeeList 所有员工数据
 * @param total 总数据条数
 */
export default {
  name: 'Employees',
  components: { AddEmployee },
  data() {
    return {
      employeeList: [],
      total: 0,
      pageSize: 10,
      page: 1,
      isShow: false
    }
  },
  created() {
    this.getEmployeeList(1)
  },
  methods: {
    async getEmployeeList(page) {
      const res = await reqEmployeeList(page, this.pageSize)
      this.employeeList = [...res.data.rows]
      this.total = res.data.total
    },
    async changePage(val) {
      if (this.loading) return
      this.loading = true
      this.page = val
      await this.getEmployeeList(val, this.pageSize)
      this.loading = false
    },
    changePageSize(val) {
      this.pageSize = val
      this.getEmployeeList(1, this.pageSize)
    },
    formatterEmpolyee(row, column, cellValue, index) {
      const { hireType } = employees
      const type = hireType.find(i => i.id === cellValue)
      if (!type) {
        return '未知'
      } else {
        return type.value
      }
    },
    remove(row) {
      this.$confirm('确认关闭？')
        .then(async _ => {
          await removeEmployee(row.id)
          this.getEmployeeList(this.page, this.pageSize)
          console.log(row)
        })
    }
  }
}
</script>

<style scoped>

</style>
