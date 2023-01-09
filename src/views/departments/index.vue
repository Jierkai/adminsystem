<template>
  <el-card class="tree-card">
    <!-- 用了一个行列布局 -->
    <TreeTools :is-root="true" :tree-node="company" @showDepts="showDepts" />
    <el-tree :data="departsList" :default-expand-all="true" :props="defaultProps">
      <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
      <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
      <template v-slot="{ data }">
        <TreeTools :tree-node="data" @delDepart="getDepartment" @showDepts="showDepts" />
      </template>

    </el-tree>
    <AddDept
      :departs="departs"
      :dialog-type="dialogType"
      :show-dialog.sync="showDialog"
      :tree-node="treeNode"
      @updateDepts="getDepartment"
    />
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
      showDialog: false,
      treeNode: {},
      dialogType: ''
    }
  },
  computed: {
    departsList() {
      return tranListToTreeData(this.departs, '')
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const res = await getDepartment()
      this.departs = res.data.depts
    },
    showDepts(dept, type) {
      this.dialogType = type
      this.treeNode = { ...dept }
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}

.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果

    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    // 有子节点 且未展开 +

    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }

    // 有子节点 且已展开 -

    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }

    // 没有子节点

    .el-tree-node__expand-icon.is-leaf::before {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>
