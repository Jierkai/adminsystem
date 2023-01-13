import request from '@/utils/request'

/**
 * @method { getDepartment } 获取所有部门
 * @returns {AxiosPromise}
 */

export function getDepartment() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

export function getSimple() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}

export function getDeptDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'get'
  })
}

export function updateDept(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
