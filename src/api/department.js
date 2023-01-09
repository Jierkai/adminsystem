import request from '@/utils/request'

export function getDepartment() {
  return request({
    url: '/company/department'
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
