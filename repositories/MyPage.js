export default ($axios) => ({
  get(subdomain, mock_api) {
    const timestamp = Date.now()
    if (mock_api) {
      // /v1/000a71d1-e7e2-44a7-88ce-73ec884a64ee
      // /v1/a6b37462-207a-4a85-b93e-0fd0d52feb1b
      // /v1/f814b3da-79fe-44f0-9bd1-3ec08292cc09
      // /v1/d0b43452-f10d-4161-b4a7-7d182a21cdd7
      // /v1/2ed6f74e-c6b3-4542-b407-4936d76e7ef2
      // /v1/1fd1919b-833b-4e83-b294-c99959c3b0fd
      // /v1/ddb4767f-e3a0-4651-8002-2bbf0583a02e
      // /v1/0a87678a-20fc-480d-8b44-9a67e8e9a518
      // /v1/d47cb5eb-0126-420a-9eee-285dd0dc841b
      return $axios.get(mock_api + '?subdomain=' + subdomain, { 'baseURL': 'https://mocki.io' })
    }
    if (process.env.MOCK_API) {
      return $axios.get(process.env.MOCK_API + '?subdomain=' + subdomain, { 'baseURL': 'https://mocki.io' })
    }
    return $axios.get('/mypage/get?subdomain=' + subdomain  + '&t=' + timestamp)
  }
})
