import request from '@/utils/request'

export function getRole(page = 1, pagesize = 5) {
  return request({
    url: '/sys/role',
    method: 'get',
    params: {
      page, pagesize
    }
  })
}

export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

export function setRole(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}

export function removeRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

export function getComponyInfo(id) {
  return request({
    url: `/company/${id}`,
    method: 'get'
  })
}
