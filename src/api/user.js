import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Sso/Passport/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/Sso/Passport/userProfile/6',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/Passport/logout',
    method: 'post'
  })
}
