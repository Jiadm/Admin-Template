/**
 * Created by Dongming
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor','9']
  return valid_map.indexOf(str.trim()) >= 0
}


//用于生成uuid
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
export function guid() {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}