<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :before-close="closeDialog" :title="dialogTitle" :visible="showDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="1-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="1-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          :loading="loading"
          loading-text="加载中..."
          no-data-text="无数据"
          placeholder="请选择"
          style="width:80%"
          @focus="getSimpleList"
        >
          <el-option
            v-for="item in simpleList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" :rows="3" placeholder="1-300个字符" style="width:80%" type="textarea" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <template #footer>
      <el-row justify="center" type="flex">
        <!-- 列被分为24 -->
        <el-col :span="6">
          <el-button size="small" type="primary" @click="commit">确定</el-button>
          <el-button size="small" @click="closeDialog">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { addDepartment, getDeptDetail, getSimple, updateDept } from '@/api/department'
import FormRules from '@/mixins/FormRules.js'

export default {
  name: 'AddDept',
  mixins: [FormRules],
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      require: true
    },
    departs: {
      type: Array,
      require: true
    },
    dialogType: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      simpleList: [],
      formData: {
        code: '',
        manager: '',
        introduce: '',
        name: ''
      },
      loading: false
    }
  },
  computed: {
    dialogTitle() {
      return this.dialogType + '部门'
    }
  },
  watch: {
    treeNode: {
      async handler(newVal) {
        if (this.dialogType === '编辑') {
          const res = await getDeptDetail(this.treeNode.id)
          this.formData = { ...res.data }
          return
        }
        this.formData.pid = newVal.id ? newVal.id : ''
      }
    }
  },
  methods: {
    async getSimpleList() {
      this.loading = true
      const res = await getSimple()
      this.simpleList = [...res.data]
      this.loading = false
    },
    closeDialog() {
      this.formData = { code: '', manager: '', introduce: '', name: '' }
      this.$refs.deptForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 公共表单提交方法
    async commitForm(fn, title) {
      await fn(this.formData)
      this.$message.success(`${title}部门成功`)
      this.closeDialog()
      this.$emit('updateDepts')
    },
    // 确定提交方法
    async commit() {
      this.$refs.deptForm.validate(valid => {
        if (!valid) return false
        switch (this.dialogType) {
          case '新增':
            this.treeNode?.id ? this.formData.pid = this.treeNode.id : this.formData.pid = ''
            this.commitForm(addDepartment, '添加')
            break
          case '编辑':
            this.commitForm(updateDept, '更新')
            break
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
