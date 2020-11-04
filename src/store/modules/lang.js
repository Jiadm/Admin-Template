import { getlanguage, setlanguage } from '@/utils/lang'


const getDefault = () => {
  return {
    language: getlanguage(),
    locals:['en','zh']
  }
}

const state = getDefault()

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
  },
  GET_LANGUAGE:(state)=>{
    return state.language
  }
}

const actions = {
 
  setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language) //save language to vuex state
      setlanguage(language) //save language to localstorage
  } 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

