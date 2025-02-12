import { http } from '../../utils/Http';

export default class SocialLogin {
    static async KakaoLogin(code: string) {
        return await http.post(`/kakao/login?code=${code}`);
    }

    static async NaverLogin(code: string, state: string) {
        return await http.post(`/naver/login?code=${code}&state=${state}`);
    }
}