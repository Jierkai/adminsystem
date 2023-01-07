<template>
  <el-card class="tree-card">
    <!-- 用了一个行列布局 -->
    <TreeTools :is-root="true" :tree-node="company" />
    <el-tree :data="departs" :default-expand-all="true" :props="defaultProps">
      <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
      <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
      <template v-slot="{ data }">
        <TreeTools :tree-node="data" @addDepts="addDepts" @ddd="false" @delDepart="getDepartment" />

      </template>

    </el-tree>
    <AddDept :show-dialog="showDialog" />
  </el-card>
</template>

<script>
import TreeTools from '@/components/TreeTools/index.vue'
import { getDepartment } from '@/api/department'
import { tranListToTreeData } from '@/utils/tranListToTreeData'
import AddDept from '@/components/AddDept/index.vue'

export default {
  name: 'Department',
  components: { AddDept, TreeTools },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [],
      company: { name: 'XXX股份有限公司', manager: '负责人' },
      showDialog: false
    }
  },
  computed: {},
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const res = await getDepartment()
      this.departs = tranListToTreeData(res.data.depts, '')
    },
    addDepts(dept) {
      this.showDialog = true
      console.log(dept)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
