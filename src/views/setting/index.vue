<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
              >新增角色</el-button></el-row>
            <el-table border="" :data="list">
              <el-table-column align="center" type="index" label="序号" width="120" />
              <el-table-column align="center" prop="name" label="角色名称" width="240" />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination
                layout="prev, pager, next"
                :current-page="page.page"
                :total="page.total"
                :page-size="page.pagesize"
                @current-change="changePage"
              />
            </el-row>

          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" disabled style="width:400px" /></el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" /></el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formData.companyPhone" disabled style="width:400px" /></el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" /></el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" /></el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog title="编辑角色" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      title="分配权限"
      :visible="showPerDialog"
      @close="btnPerCancel"
    >
      <el-tree ref="perTree" node-key="id" :data="permData" :props="defaultProps" :default-expand-all="true" :show-checkbox="true" :check-strictly="true" :default-checked-keys="selectCheck" />
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnPerOk">确认</el-button>
          <el-button size="small" @click="btnPerCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, updateRole, getRoleDetail, addRole, assignPerm } from '@/api/setting'
import { getPermissionList } from '@/api/premssion'
import { mapGetters } from 'vuex'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      permData: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0 // 记录总数
      },
      formData: {},
      showDialog: false,
      showPerDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      defaultProps: {
        label: 'name'
      },
      roleId: null,
      selectCheck: []
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除该角色吗？')
        await deleteRole(id)
        this.$message.success('删除角色成功')
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    async btnOK() {
      try {
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async assignPerm(id) {
      this.permData = tranListToTreeData(await getPermissionList(), '0')
      this.roleId = id
      const { permIds } = await getRoleDetail(id)
      this.selectCheck = permIds
      this.showPerDialog = true
    },
    async btnPerOk() {
      await assignPerm({ permIds: this.$refs.perTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.showPerDialog = false
    },
    btnPerCancel() {
      this.selectCheck = []
      this.showPerDialog = false
    }
  }
}
</script>

<style>

</style>
