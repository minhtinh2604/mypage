export default ($axios) => ({
  get(subdomain, mock_api = '', google_app_script = '') {
    if (mock_api) {
      // /v1/000a71d1-e7e2-44a7-88ce-73ec884a64ee
      // /v1/a6b37462-207a-4a85-b93e-0fd0d52feb1b
      // /v1/f814b3da-79fe-44f0-9bd1-3ec08292cc09
      // /v1/d0b43452-f10d-4161-b4a7-7d182a21cdd7
      // /v1/2ed6f74e-c6b3-4542-b407-4936d76e7ef2
      return $axios.get(mock_api + '?subdomain=' + subdomain, { 'baseURL': 'https://mocki.io' })
    }
    return $axios.get('/mypage/get?subdomain=' + subdomain  + '&t=' + Date.now())
  },
  get_GAS(subdomain, google_app_script = '') {
    if (google_app_script) {
      // AKfycbwh1WBEdlB2A_r-KUgnI1uJMJPHX-jtNcyyJNuEeBNwWE1sSKBKamyETc_-cNV1EsjYWQ
      return $axios.get('/macros/s/' + google_app_script + '/exec', { 'baseURL': 'https://script.google.com' })
    }
    return $axios.get('/mypage/get?subdomain=' + subdomain  + '&t=' + Date.now())
  }
})
