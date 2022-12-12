const actions =  {
  nuxtServerInit ({ commit }, { req }) {
    // console.log(req.headers)
    if (req.headers.host) {
      commit('my_page/SET_MYPAGE_DOMAIN', req.headers.host.split('.')[0])
    }
  }
}

export default { actions }