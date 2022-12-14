function getSupportedLocale(){
  const locales = require.context('@/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i).keys()
  const locale_keys = []
  for (let i = 0; i < locales.length ; i++) {
    locale_keys.push(locales[i].substring(2, locales[i].length - 5))
  }
  return locale_keys
}

const state = () => ({
  locales: [],
  locale: 'en',
})

const mutations = {
  SET_LOCALES(state) {
    state.locales = getSupportedLocale()
  },
  SET_LANG(state, value) {
    if (state.locales.includes(value)) {
      state.locale = value
      this.app.i18n.locale = value
      this.app.$cookies.set('locale', value)
    }
  },
}

const actions = {
  setLocales({ commit }){
    commit('SET_LOCALES')
  },
  setLang({ commit }, lang){
    commit('SET_LANG', lang)
  }
}

const getters = {
  getSupportedLang(state){
    return state.locales
  },
  getLang(state){
    return state.locale
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}