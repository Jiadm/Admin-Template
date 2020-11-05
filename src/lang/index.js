import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {getServerConfig} from '@/utils/get-server-config'

Vue.use(VueI18n)

export function getstorageLanguage() {
    const chooseLanguage = localStorage.getItem('yizit_language')
    if (chooseLanguage) return chooseLanguage
    else return 'en'

}

const i18n = new VueI18n({
    // set locale
    // options: en | zh | es
    locale: getstorageLanguage(),//getLanguage(),
    // set locale messages
    //messages
    silentTranslationWarn: true,//去除console未翻译警告
})

//动态获取语言json文件
export async function setLangs() {
    const en = await getServerConfig('./Lang/en.json').then(res => { return res }).catch(err => { return {} })
    const zh = await getServerConfig('./Lang/zh.json').then(res => { return res }).catch(err => { return {} })
    i18n.setLocaleMessage('en', en)
    i18n.setLocaleMessage('zh', zh)
    // messages.en=en
    // messages.zh=zh
}
setLangs()

export default i18n
