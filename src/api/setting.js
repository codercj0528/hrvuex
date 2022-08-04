import request from '@/utils/request'
// 获取角色数据列表
export function getRoleList(params) {
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}
// 获取对应ID的公司信息
export function getCompanyInfo(companyId) {
  return request({
    method: 'GET',
    url: `/company/${companyId}`
  })
}
// 删除对应ID的角色信息
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
/** *
 * 修改角色信息
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
/**
   * 获取角色详情
   * **/
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 新增角色
export function addRole(data) {
  return request({
    method: 'POST',
    url: '/sys/role/',
    data
  })
}
// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
