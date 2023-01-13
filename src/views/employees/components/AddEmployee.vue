<template>
  <el-dialog :visible="showDialog" title="新增员工" @close="closeDialog">
    <!-- 表单 -->
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入姓名" style="width:50%" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" style="width:50%" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" placeholder="请选择入职时间" style="width:50%" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" placeholder="请选择" style="width:50%">
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" placeholder="请输入工号" style="width:50%" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          ref="select"
          v-model="formData.departmentName"
          class="select-department"
          placeholder="请选择"
          @focus="getDepartment"
        >
          <div class="option-group">
            <el-option v-for="item in treeData" :key="item.id" value="">
              <div class="tree-node">
                <el-tree :data="[item]" :props="{label:'name'}" @node-click="chooseDepartment" />
              </div>
            </el-option>
          </div>

        </el-select>
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker v-model="formData.correctionTime" placeholder="请选择转正时间" style="width:50%" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="commit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
/**
 * @param {Array} 表单匹配规则
 */
import employees from '@/constant/employees'
import { getDepartment } from '@/api/department'
import { tranListToTreeData } from '@/utils/tranListToTreeData'
import { addEmployee } from '@/api/employee'

const { hireType } = employees
export default {
  name: 'AddEmployee',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      },
      treeData: [],
      hireType
    }
  },
  methods: {
    async getDepartment() {
      const res = await getDepartment()
      this.treeData = tranListToTreeData(res.data.depts, '')
    },
    commit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return valid
        await addEmployee(this.formData)
        this.$message.success('添加成功')
        this.closeDialog()
      })
    },
    chooseDepartment(row) {
      if (row.children || row.pid === '') return
      this.formData.departmentName = row.name
      this.$refs.select.blur()
    },
    closeDialog() {
      this.$refs.form.resetFields()
      this.$emit('update:showDialog', false)
    }

  }
}
</script>

<style lang="scss" scoped>

.el-tree-node__children {
  overflow: hidden;
}

.el-select-dropdown__item {
  padding: 0;
  height: auto;
}

.el-select-dropdown__item:hover {
  background-color: #fff;
}

.option-group {
  height: 200px;
}
</style>
