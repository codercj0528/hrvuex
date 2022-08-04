import request from '@/utils/request'
// 获取员工简单信息列表
export function getEmployeeSimple() {
  return request({
    method: 'GET',
    url: '/sys/user/simple'
  })
}
// 获取员工信息列表
export function getEmployeeList(params) {
  return request({
    method: 'GET',
    url: '/sys/user',
    params
  })
}
// 删除员工
export function delteEmployee(id) {
  return request({
    method: 'DELETE',
    url: `/sys/user/${id}`
  })
}
// 新增员工
export function addEmployee(data) {
  return request({
    method: 'POST',
    url: '/sys/user',
    data
  })
}
// 导入员工信息EXCEL表
export function importEmployee(data) {
  return request({
    method: 'POST',
    url: '/sys/user/batch',
    data
  })
}
/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
// 给员工分配角色
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
