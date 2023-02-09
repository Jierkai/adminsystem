import request from '@/utils/request'

export function reqEmployeeList(page = 1, size = 10) {
  return request({
    url: '/sys/user',
    method: 'get',
    params: { page, size }
  })
}

export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

export function removeEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

export function batchAdd(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

export function reqEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

/**
 * @function 获取员工岗位信息
 * @param id
 * @returns {*}
 */
export function reqEmployeeJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'get'
  })
}

export function reqEmployeePersonInfo(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'get'
  })
}

export function updateEmployeeDetail(id, data) {
  return request({
    url: `/sys/user/${id}`,
    method: 'put',
    data
  })
}

export function updateEmployeePersonInfo(id, data) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'put',
    data
  })
}

export function updateEmployeeJobDetail(id, data) {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'put',
    data
  })
}

export function reqSimpleStaffList() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}
