
/**
 * save select langguage into localStorage
 */
const languageKey = 'yizit_language'

export function getlanguage() {
  const chooseLanguage = localStorage.getItem(languageKey)
  if (chooseLanguage) return chooseLanguage
  return 'en'
}

export function setlanguage(language) {
 
 return localStorage.setItem(languageKey, language)
  
}


