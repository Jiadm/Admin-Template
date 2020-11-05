import {getServerConfig} from '@/utils/get-server-config'


const rootApis=  async function getApis() {
    const apis=await getServerConfig('./Setting/config.json').then(res => { console.log(res); return res }).catch(err => { return {} })
    return apis
  
}

export {rootApis}
