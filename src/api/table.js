import request from '@/utils/config-request'

export function getList(params) {
  return request({
    url: '/api/v1/Customer/Paging/Customer?currPage=1&pageSize=20&sortContent=&no=&name=',
    method: 'get',
    params
  })
}
