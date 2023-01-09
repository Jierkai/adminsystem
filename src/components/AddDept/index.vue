<template>
  <!-- 新增部门的弹层 -->
<<<<<<< HEAD
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
=======
  <el-dialog :visible="showDialog" title="新增部门">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input placeholder="1-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input placeholder="1-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select placeholder="请选择" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input :rows="3" placeholder="1-300个字符" style="width:80%" type="textarea" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" justify="center" type="flex">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
>>>>>>> e5de052deb053f943197ae2e1f30a027389b2ee3
  </el-dialog>
</template>

<script>
<<<<<<< HEAD
import { addDepartment, getDeptDetail, getSimple, updateDept } from '@/api/department'

=======
>>>>>>> e5de052deb053f943197ae2e1f30a027389b2ee3
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
<<<<<<< HEAD
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
    const checkSameDeptName = (rules, val, callback) => {
      const id = this.treeNode.id ? this.treeNode.id : ''
      const filterArr = this.departs.filter(i => i.pid === id)
      const isHave = filterArr.some(i => i.name === val)
      if (isHave || val === this.treeNode.name) {
        callback(new Error('部门名称不可重复'))
      } else {
        callback()
      }
    }
    const checkSameDeptCode = (rules, val, callback) => {
      const id = this.treeNode.id ? this.treeNode.id : ''
      const filterArr = this.departs.filter(i => i.pid === id)
      console.log(filterArr)
      const isHave = filterArr.some(i => i.code === val)
      if (isHave || val === this.treeNode.name) {
        callback(new Error('部门编码不可重复'))
      } else {
        callback()
      }
    }
    return {
      simpleList: [],
      formData: {
        code: '',
        manager: '',
        introduce: '',
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: checkSameDeptName, message: '部门名称不可重复', trigger: ['blur'] }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: checkSameDeptCode, message: '部门名称不可重复', trigger: ['blur'] }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur', 'change'] }
        ]
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
          console.log(this.formData)
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
      this.$emit('update:showDialog', false)
      this.formData = {
        code: '',
        manager: '',
        introduce: '',
        name: ''
      }
    },
    async commitForm(fn, title) {
      const res = await fn(this.formData)
      console.log(res)
      this.$refs.deptForm.resetFields()
      this.$message.success(`${title}部门成功`)
      this.$emit('update:showDialog', false)
      this.$emit('updateDepts')
    },
    async commit() {
      switch (this.dialogType) {
        case '新增':
          this.treeNode?.id ? this.formData.pid = this.treeNode.id : this.formData.pid = ''
          this.commitForm(addDepartment, '添加')
          break
        case '编辑':
          this.commitForm(updateDept, '更新')
          break
      }
    }
=======
    }
  },
  created() {
    console.log(false)
>>>>>>> e5de052deb053f943197ae2e1f30a027389b2ee3
  }
}
</script>

<style scoped>

</style>
