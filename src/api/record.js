import request from '@/utils/request'

export function getClassList(params) {
  return request({
    url: '/course/list',
    method: 'get',
    params
  })
}

export function getClassRecordList(params) {
  return request({
    url: '/record/list',
    method: 'get',
    params
  })
}

