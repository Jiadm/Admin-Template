import { getServerConfig } from '@/utils/get-server-config'

let rootApis = {}

// export function getRootApis() {
//   return  new Promise((resolve)=>{
//         getServerConfig('./Setting/config.json').then(res =>{
//             rootApis.sso=res.ssoAPI
//             rootApis.config=res.configAPI
//             resolve(res)
//         }  ).catch(err => { return {} })
//     }) 
// }

export function getRootApis() {
    getServerConfig('./Setting/config.json').then(res => {
        rootApis.sso = res.ssoAPI
        rootApis.config = res.configAPI
    })
}
export { rootApis }
