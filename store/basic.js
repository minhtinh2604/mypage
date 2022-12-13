const state = () => ({
  'baseURL': '',
  'htmlLang': 'en'
})
const mutations = {
  SET_BASE_URL (state, value) {
    state.baseURL = value
  },
  SET_HTML_LANG (state, value) {
    state.htmlLang = value
  }
}
const actions = {
  setBaseURL({ commit }, value){
    commit('SET_BASE_URL', value)
  },
  setHTMLLang({ commit }, value){
    commit('SET_HTML_LANG', value)
  }
}
const getters = {
  getBaseURL(state){
    return state.baseURL
  },
  getHTMLLang(state){
    return state.htmlLang
  }
}
export default { state, getters, actions, mutations }