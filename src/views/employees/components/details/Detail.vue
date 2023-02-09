<template>
  <div class="employees-detail-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账号设置">
            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:">
                <el-input v-model="form.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="form.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="update">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :lazy="true" label="个人详情">
            <el-tooltip class="tooltip-box" content="打印基本个人信息">
              <router-link :to="`/employees/print/${userId}?type=personal`">
                <i class="el-icon-printer" />
              </router-link>
            </el-tooltip>
            <!-- 内容 -->
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane :lazy="true" label="岗位信息">
            <el-tooltip class="tooltip-box" content="打印基本岗位信息">
              <router-link :to="`/employees/print/${userId}?type=job`">
                <i class="el-icon-printer" />
              </router-link>
            </el-tooltip>
            <!-- 内容 -->
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { reqEmployeeDetail, updateEmployeeDetail } from '@/api/employee'
import UserInfo from '@/views/employees/components/details/UserInfo.vue'
import JobInfo from '@/views/employees/components/details/JobInfo.vue'

export default {
  name: 'EmployeesDetail',
  components: { JobInfo, UserInfo },
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newVal) {
        if (newVal.name !== 'detail') return
        this.reqEmployInfo(newVal.params.id)
      }
    }
  },
  methods: {
    async update() {
      await updateEmployeeDetail(this.form.id, this.form)
      this.$message.success('更新成功')
      this.reqEmployInfo(this.form.id)
    },
    async reqEmployInfo(id) {
      const res = await reqEmployeeDetail(id)
      this.form = { ...res.data }
    }
  }

}
</script>
