export default ($axios) => ({
  get(subdomain) {
    // return $axios.get('/v1/000a71d1-e7e2-44a7-88ce-73ec884a64ee?subdomain=' + subdomain, { 'baseURL': 'https://mocki.io' })
    return $axios.get('/v1/a6b37462-207a-4a85-b93e-0fd0d52feb1b?subdomain=' + subdomain, { 'baseURL': 'https://mocki.io' })
    // return $axios.get('/v1/1fd1919b-833b-4e83-b294-c99959c3b0fd?subdomain=' + subdomain, { 'baseURL': 'https://mocki.io' })
    // return $axios.get('/v1/0a87678a-20fc-480d-8b44-9a67e8e9a518?subdomain=' + subdomain, { 'baseURL': 'https://mocki.io' })
    // return $axios.get('/mypage/get?subdomain=' + subdomain)
  }
})
