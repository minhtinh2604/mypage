const actions =  {
  nuxtServerInit ({ commit }, { req }) {
    if (req.headers.host) {
      commit('my_page/SET_MYPAGE_DOMAIN', req.headers.host.split('.')[0])
      commit('basic/SET_BASE_URL', '//' + req.headers.host)
    }
  }
}

export default { actions }