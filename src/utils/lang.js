
/**
 * save select langguage into localStorage
 */
const languageKey = 'yizit_language'

//get selected language from localstore, if no, default is en
export function getlanguage() {
  const chooseLanguage = localStorage.getItem(languageKey)
  if (chooseLanguage) return chooseLanguage
  return 'en'
}

//save selected language into localstorage
export function setlanguage(language) {
 return localStorage.setItem(languageKey, language)
}


