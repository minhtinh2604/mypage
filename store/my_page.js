const state = () => ({
  mypage_domain:'',
  page_template:'',
  page_layout:'',
  page_name: '',
  page_description: '',
  cover_image: '',
  avatar_image: '',
  facebook_url: '', 
  instagram_url: '', 
  tiktok_url: '',
  product_items: [],
  category_array: [],
  product_placeholder: '',
})

const mutations = {
  SET_MYPAGE_PROFILE(state, payload){
    state.page_template = payload.page_template
    state.page_name = payload.page_name
    state.page_description = payload.page_description
    state.cover_image = payload.cover_image
    state.avatar_image = payload.avatar_image
    state.facebook_url = payload.facebook_url
    state.instagram_url = payload.instagram_url
    state.tiktok_url = payload.tiktok_url
    state.product_placeholder = payload.product_placeholder   
  },
  SET_PRODUCT_ITEMS(state, product) {
    state.product_items = product
  },
  SET_CATEGORY_ARRAY(state, data){
    state.category_array = data
  },
  SET_MYPAGE_DOMAIN(state, data){
    state.mypage_domain = data
  },
  SET_MYPAGE_LAYOUT(state, data){
    state.page_layout = data
  }
}

const actions = {
  async getMyPageData({ commit, dispatch }, payload){
    const response = await this.$repositories.mypage.get(payload.subdomain, payload.mock_api)
    if (response.status === 200) {
        const data = response.data.mypage
        if (!data) return this.$router.push('404')
        const template = data.profile.template
        let cover = '/img/' + template + '/background.webp'
        if (data.profile.background !== null && data.profile.background !== ''){
            cover = data.profile.background
        }
        let avatar = '/img/' + template + '/avatar.webp'
        if (data.profile.avatar !== null && data.profile.avatar !== ''){
            avatar = data.profile.avatar
        }
        commit('SET_PRODUCT_ITEMS', data.product)
        commit('SET_CATEGORY_ARRAY', data.category)
        commit('SET_MYPAGE_PROFILE', {
          page_template: data.profile.template,
          page_name: data.profile.page_name,
          page_description: data.profile.page_description,
          cover_image: cover,
          avatar_image: avatar,
          facebook_url: data.profile.facebook_url,
          instagram_url: data.profile.instagram_url,
          tiktok_url: data.profile.tiktok_url,
          product_placeholder: '/img/' + template + '/product-placeholder.jpg'
        })
        if ('language' in data.profile && data.profile.language !== null && data.profile.language !== ''){
          dispatch('i18n/setLang', data.profile.language.toLowerCase(), { root: true })
        }
        let layout = 'Layout1Index'
        switch(template) {
          case 'style1':
          case 'style2':
          case 'style3':
          case 'style9':
              layout = 'Layout1Index'
              break;
          case 'style4':
          case 'style5':
          case 'style6':
          case 'style7':
          case 'style8':
              layout = 'Layout2Index'
              break;
          default:
              layout = 'Layout1Index'
              break;
        }
        commit('SET_MYPAGE_LAYOUT', layout)
    }
  },
  setMyPageDomain({ commit }, data){
    commit('SET_MYPAGE_DOMAIN', data)
  }
}

const getters = {
  getPageName(state){
    return state.page_name
  },
  getPageDescription(state){
    return state.page_description
  },
  getPageTemplate(state){
    return state.page_template
  },
  getPageLayout(state){
    return state.page_layout
  },
  getProductItems(state){
    return state.product_items
  },
  getCategories(state){
    return state.category_array
  },
  getMyPageDomain(state){
    return state.mypage_domain
  },
  getAvatar(state){
    return state.avatar_image
  },
  getCover(state){
    return state.cover_image
  },
  getFacebookUrl(state){
    return state.facebook_url
  },
  getTiktokUrl(state){
    return state.tiktok_url
  },
  getInstagramUrl(state){
    return state.instagram_url
  },
  getProductPlaceholder(state){
    return state.product_placeholder
  }
}

export default { state, getters, actions, mutations }