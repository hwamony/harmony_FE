// 카카오 API에 접근하기 위한 클라이언트 ID, 인가코드를 받은 후 리다이렉트될 URL 주소
const CLIENT_ID = '34b10724e3757bf211c06db0b9186f27'
// FIXME: localhost 수정
const REDIRECT_URL = "http://localhost:3000/login/oauth2/kakao"

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;