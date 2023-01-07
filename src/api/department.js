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
