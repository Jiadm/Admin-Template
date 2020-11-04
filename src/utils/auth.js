//import Cookies from 'js-cookie'

/**
 * 存取token在localStorage中
 */
const tokenKey = 'yizit_admin_template_token'

export function getToken() {
  //return Cookies.get(tokenKey)
  return localStorage.getItem(tokenKey)
}

export function setToken(token) {
 // return Cookies.set(tokenKey, token)
 return localStorage.setItem(tokenKey, token)
  
}

export function removeToken() {
 // return Cookies.remove(tokenKey)
 return localStorage.removeItem(tokenKey)
}
