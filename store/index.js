const actions =  {
  nuxtServerInit ({ commit }, { req }) {
    if (req.headers.host) {
      commit('my_page/SET_MYPAGE_DOMAIN', req.headers.host.split('.')[0])
      commit('basic/SET_BASE_URL', '//' + req.headers.host)
    }
    const locale = this.app.$cookies.get('locale')
    if (locale){
      commit('i18n/SET_LANG', locale, { root: true })
      commit('basic/SET_HTML_LANG', locale, { root: true })
    }
    
  }
}

export default { actions }