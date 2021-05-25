import request from '@/utils/request'

export function getStudentList(params) {
  return request({
    url: '/student/list',
    method: 'get',
    params
  })
}

export function getStudentInfo(param) {
  return request({
    url: '/student/' + param,
    method: 'get'
  })
}

export function updateStudentInfo(params) {
  return request({
    url: '/student',
    method: 'put',
    data: params
  })
}
