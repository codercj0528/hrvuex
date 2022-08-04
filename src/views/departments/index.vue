<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <Treetools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <Treetools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <Adddepart ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import Treetools from './components/tree-tools.vue'
import Adddepart from './components/add-depat.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    Treetools,
    Adddepart
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      console.log(result)
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '')
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
      console.log(node)
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetails(node.id)
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
