<template>
  <div class="employees-container">
    <div class="app-container">
      <PageTools>
        <template #text>
          <span>总记录数: {{ total }}</span>
        </template>
        <template #button>
          <el-button size="small" type="warning" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">excel导出</el-button>
          <el-button size="small" type="primary" @click="isShow = true">新增员工</el-button>
        </template>
      </PageTools>
      <AddEmployee :show-dialog.sync="isShow" />
      <el-card style="margin-top: 10px;">
        <el-table :data="employeeList" border>
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="头像">
            <template v-slot="scope">
              <el-image
                :src="scope.row.staffPhoto"
                fit="cover"
                style="width: 80px; height: 80px"
                @click="showCode(scope.row.staffPhoto)"
              />
            </template>
          </el-table-column>
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
              <el-button size="small" type="text" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button size="small" type="text">转正</el-button>
              <el-button size="small" type="text">调岗</el-button>
              <el-button size="small" type="text">离职</el-button>
              <el-button size="small" type="text" @click="showRoleDialogFn(row)">角色</el-button>
              <el-button :disabled="isTrue('1')" size="small" type="text" @click="remove(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <qrcode-dialog :show-code-dialog.sync="showCodeDialog" :url-data="urlData" />
        <AssignRole :is-show.sync="showRoleDialog" :user-i-d="UserId" />
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
import moment from 'moment'
import QrcodeDialog from '@/components/qrcodeDialog/index.vue'
import AssignRole from '@/views/employees/components/AssignRole.vue'

/**
 * @param employeeList 所有员工数据
 * @param total 总数据条数
 */
export default {
  name: 'Employees',
  components: { AssignRole, QrcodeDialog, AddEmployee },
  data() {
    return {
      employeeList: [],
      total: 0,
      pageSize: 10,
      page: 1,
      isShow: false,
      showCodeDialog: false,
      showRoleDialog: false,
      urlData: '',
      UserId: ''
    }
  },
  created() {
    this.getEmployeeList(1)
  },
  activated() {
    this.getEmployeeList(this.page)
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
    async exportExcel() {
      const excel = await import('@/vendor/Export2Excel')
      const { data: { rows }} = await reqEmployeeList(1, this.total)
      const headersArr = ['姓名', '手机号', '入职日期', '聘用形式', '转正日期', '工号', '部门']
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
      const headersRelations = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const dataArr = this.formatJson(rows, headersRelations, headersArr)
      excel.export_json_to_excel({
        header: headersArr, // 表格的头部
        // 二维数组 [ [], [], [] ]
        data: dataArr,
        filename: '学生信息表', // 导出的excel文件名
        autoWidth: true, // 是否开启单元格宽度自适应
        bookType: 'xlsx', // 类型
        multiHeader,
        merges
      })
    },
    formatJson(rows, userRelations, headersArr) {
      const { hireType } = employees
      return rows.map(i => {
        const arr = []
        headersArr.forEach(key => {
          const property = userRelations[key]
          if (property === 'formOfEmployment') {
            const value = hireType.find(val => val.id === i[property])
            const type = value?.value || ''
            arr.push(type)
            return
          } else if (property === 'correctionTime' || property === 'timeOfEntry') {
            const timeValue = this.formData(i[property]) ? this.formData(i[property]) : '暂无信息'
            arr.push(timeValue)
            return
          }
          arr.push(i[property])
        })
        return arr
      })
    },
    formData(data) {
      return moment(data).format('YYYY年MM月DD日')
    },
    changePageSize(val) {
      this.pageSize = val
      this.getEmployeeList(1, this.pageSize)
    },
    formatterEmpolyee(row, column, cellValue) {
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
        })
    },
    showCode(data) {
      this.urlData = data
      this.showCodeDialog = true
    },
    showRoleDialogFn(row) {
      console.log(row)
      this.UserId = row.id
      this.showRoleDialog = true
    },
    isTrue(type = '') {
      return !this.$store.getters.btnDisabled.includes(type)
    }
  }
}
</script>

<style scoped>

</style>
