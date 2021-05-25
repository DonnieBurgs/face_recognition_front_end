import request from '@/utils/request'

export function getTeacherList(params) {
  return request({
    url: '/teacher/list',
    method: 'get',
    params
  })
}

export function getTeacherInfo(param) {
  return request({
    url: '/teacher/' + param,
    method: 'get'
  })
}

export function updateTeacherInfo(params) {
  return request({
    url: '/teacher',
    method: 'put',
    data: params
  })
}
