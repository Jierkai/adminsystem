import request from '@/utils/request'

export function reqGetPermissionList() {
  return request({
    method: 'get',
    url: '/sys/permission'
  })
}

// 新增权限
export function reqAddPermission(data) {
  data.enVisible = data.enVisible ? 1 : 0
  return request({
    method: 'post',
    url: '/sys/permission',
    data
  })
}

// 更新权限
export function reqUpdatePermission(data) {
  return request({
    method: 'put',
    url: `/sys/permission/${data.id}`,
    data
  })
}

// 删除权限
export function reqDelPermission(id) {
  return request({
    method: 'delete',
    url: `/sys/permission/${id}`
  })
}

// 获取权限详情
export function reqGetPermissionDetail(id) {
  return request({
    method: 'get',
    url: `/sys/permission/${id}`
  })
}

export function reqSetPermission(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
