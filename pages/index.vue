<template>
  <div :class="'page_layout page_' + page_layout">
      <component :is="page_layout"></component>
      <div v-if="show_spinner == true" class="text-center mt-3">
        <div class="spinner-border mypage-spinner-border" role="status">
            <span class="visually-hidden"></span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {
      'Layout1Index': () => import('@/components/Layout1/Index.vue'),
      'Layout2Index': () => import('@/components/Layout2/Index.vue')
  },

  async asyncData({ store, req, route, error }){
    const res = await store.dispatch('my_page/getMyPageData', { 'subdomain': store.getters['my_page/getMyPageDomain'], 'mock_api': route.query.mock_api }) 
    if (res === false){  error({ statusCode: 404, message: 'Page not found' }) }
  },

  data: () => ({
    show_spinner: false
  }),

  head() {
    return {
      htmlAttrs: {
        lang: this.html_language,
      },
      title: this.title,
      meta: [
        { name: 'robots', content: 'index, follow' },
        { rel: 'icon', type: 'image/x-icon', href: this.base_url + '/favicon.ico' },
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'og:description', property: 'og:description', content: this.description },
        { hid: 'og:site_name', property: 'og:site_name', content: this.title },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image', property: 'og:image', content: this.base_url + this.cover_image },
        { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: this.base_url + this.cover_image }
      ],
    }
  },

  computed: {
    title (){
      return this.$store.getters['my_page/getPageName']
    },
    description () {
      return this.$store.getters['my_page/getPageDescription']
    },
    page_template () {
      return this.$store.getters['my_page/getPageTemplate']
    },
    page_layout () {
      return this.$store.getters['my_page/getPageLayout']
    },
    language () {
      return this.$store.getters['i18n/getLang']
    },
    html_language () {
      return this.$store.getters['basic/getHTMLLang']
    },
    avatar_image (){
      return this.$store.getters['my_page/getAvatar']
    },
    cover_image (){
      return this.$store.getters['my_page/getCover']
    },
    base_url (){
      return this.$store.getters['basic/getBaseURL']
    }
  },

  mounted(){
    this.show_spinner = true
    this.$i18n.locale = this.language
    if (this.page_template){
      const css_link  = document.createElement('link');
      css_link.href = '/css/'+ this.page_template + '/mypage.css?v=' + this.$config.NUXT_APP_VERSION;
      css_link.rel  = 'stylesheet'; css_link.type = 'text/css'; css_link.media = 'all';
      document.getElementsByTagName('head')[0].appendChild(css_link);
    }
    this.show_spinner = false
  },
  methods: {

  }
}
</script>
