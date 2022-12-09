import MyPage from '~/repositories/MyPage'

export default ($axios) => ({
  mypage: MyPage($axios)
})