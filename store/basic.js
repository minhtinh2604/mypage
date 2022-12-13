const state = () => ({
  'baseURL': ''
})
const mutations = {
  SET_BASE_URL (state, value) {
    state.baseURL = value
  }
}
const actions = {
  setBaseURL({ commit }, value){
    commit('SET_BASE_URL', value)
  }
}
const getters = {
  getBaseURL(state){
    return state.baseURL
  }
}
export default { state, getters, actions, mutations }