<template>
  <div>
    <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCanel">
      <el-checkbox-group v-model="roleIDs">
        <!-- 选项 -->
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOK">确认</el-button>
          <el-button size="small" @click="btnCanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    //   required: true
    }
  },
  data() {
    return {
      list: [],
      roleIDs: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIDs = roleIds
    },
    async btnOK() {
      await assignRoles({ id: this.userId, roleIds: this.roleIDs })
      this.$emit('update:showRoleDialog', false)
    },
    btnCanel() {
      this.roleIDs = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>

</style>
