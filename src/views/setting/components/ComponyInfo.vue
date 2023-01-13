<template>

  <div class="company-info">
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
  </div>
</template>

<script>
import { getComponyInfo } from '@/api/setting'

export default {
  name: 'ComponyInfo',
  data() {
    return {
      companyID: this.$store.state.user?.userInfo?.companyId || '',
      companyData: {}
    }
  },
  created() {
    getComponyInfo(this.companyID).then(res => {
      this.companyData = { ...res.data }
    })
  }
}
</script>

<style scoped>

</style>
