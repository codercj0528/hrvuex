import request from '@/utils/request'
// 获取组织架构信息列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
// 删除组织架构
export function delDepartments(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}
// 新增组织架构
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 编辑组织架构回写获取对应ID的数据
// 新增组织架构
export function getDepartDetails(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
// 编辑组织架构接口
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
