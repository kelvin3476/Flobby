import { http } from "../../utils/Http";
import { SignupData, WebTempSignupData, WebSignupData } from "../ApiTypes";

export default class SignUp {
    /* TODO: 회원가입 완료 버튼 클릭시 소셜 유저 정보 + 프로필 설정 정보 백엔드로 보낸후 회원 가입 완료 처리 작업 필요 */
    /*WEB 소셜회원가입*/
    static async WebSocialSignup(signupData: SignupData) {
        return await http.post('/profile/social-insert', signupData);
    }

    /*WEB 자체회원가입 유저정보 임시테이블 저장*/
    static async WebSignupUserInfoInsert(webTempSignupData: WebTempSignupData) {
        return await http.post(`/regist/web/temp`, webTempSignupData);
    }

    /*WEB 자체회원가입*/
    static async WebSignup(webSignupData: WebSignupData) {
        return await http.post(`/regist/web`, webSignupData);
    }

    /*닉네임 중복체크*/
    static async checkNickname(nickname: string) {
        return await http.post(`/check-nickname`, { nickname: nickname });
    }

    /*이메일 중복체크*/
    static async checkEmail(email: string) {
        return await http.get(`/user-email/${email}/exists`);
    }
}

/*
    TODO: 회원가입 관련 api 요청 메소드 추가 작업 필요 (ex. 회원가입, 회원탈퇴 등)
          백엔드 api 작업 완료시 추가 작업 진행
*/