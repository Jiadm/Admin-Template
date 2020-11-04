import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'

Vue.use(VueI18n)
Vue.prototype.axios = axios

function getServerConfig(jsonName) {
    return new Promise((resolve) => {
        axios.get('./Lang/' + jsonName).then(result => {
            const config = result.data;
            resolve(config);
        });
    });
}

// const messages = {
//     'en': en,
//     'zh': zh
// }


// export function getLanguage() {
//     const chooseLanguage = Cookies.get('language')
//     if (chooseLanguage) return chooseLanguage

//     // if has not choose language
//     const language = (navigator.language || navigator.browserLanguage).toLowerCase()
//     const locales = Object.keys(messages)
//     for (const locale of locales) {
//         if (language.indexOf(locale) > -1) {
//             return locale
//         }
//     }
//     return 'en'
// }


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
    const en = await getServerConfig('en.json').then(res => { return res }).catch(err => { return {} })
    const zh = await getServerConfig('zh.json').then(res => { return res }).catch(err => { return {} })
    i18n.setLocaleMessage('en', en)
    i18n.setLocaleMessage('zh', zh)
    // messages.en=en
    // messages.zh=zh
}
setLangs()

export default i18n
