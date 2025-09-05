import { http } from '@/utils/Http';
import { WebLoginData, GenerateTokenData, PasswordData} from "../ApiTypes";

export default class Login {
    /* 자체 로그인 요청 */
    static async webLogin(webLoginData: WebLoginData) {
        return await http.post(`/flobby/login`, webLoginData);
    }

    /* JWT 토큰 발급 요청 */
    static async generateJwtToken(generateTokenData: GenerateTokenData) {
        return await http.post(`/generate/token`, generateTokenData);
    }

    /* TODO: Refresh Token 으로 Access Token 재발급 */
    static async reGenerateJwtToken() {
        return await http.post(`/token`);
    }

    /* TODO: 비밀번호 변경 api 연동 작업 필요 */
    static async resetPassword(passwordData: PasswordData) {
      return await http.post(`/password/reset`, passwordData); /* TODO: api 주소는 실제 엔드포인트 맞게 추후 수정 예정 */
    }
}

/*
    TODO: 로그인 관련 api 요청 메소드 추가 작업 필요 (ex. 로그인, 비밀번호 찾기 등)
          백엔드 api 작업 완료시 추가 작업 진행
*/