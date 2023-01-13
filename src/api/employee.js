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

