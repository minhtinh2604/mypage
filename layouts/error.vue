<template>
  <div class="container lp-container">
    <div class="mypage-wrapper">
      <div v-if="error.statusCode === 404" class="text-center page-not-found mt-1">
        {{ $t('not_found') }} 
      </div>
      <div v-else-if="error.statusCode === 500" class="text-center page-not-found mt-1">
        {{ $t('internal_server_error') }} 
      </div>
      <div v-else class="text-center page-not-found mt-1">
        {{ $t('an_error_occur') }} 
      </div>
    </div>
    <!-- Footer -->
    <div class="copyright">
      © {{ (new Date()).getFullYear() }} - Rentracks
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'error',
  props: ['error'],
  head() {
    return {
      htmlAttrs: {
        lang: this.html_language,
      },
      title: this.$t('error') + ' - ' + this.error.statusCode,
      meta: [
        { name: 'robots', content: 'noindex, nofollow' },
        { rel: 'icon', type: 'image/x-icon', href: this.base_url + '/favicon.ico' }
      ],
    }
  },
  computed: {
    html_language () {
      return this.$store.getters['basic/getHTMLLang']
    },
    base_url (){
      return this.$store.getters['basic/getBaseURL']
    }
  },
  mounted () {
    this.$i18n.locale = this.$cookies.get('locale')
  }
}
</script>