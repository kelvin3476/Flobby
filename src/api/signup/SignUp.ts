import { http } from "../../utils/Http";
import { SocialSignupData, WebTempSignupData, WebSignupData } from "../ApiTypes";

export default class SignUp {
    /*WEB 소셜회원가입*/
    static async WebSocialSignup(signupData: SocialSignupData) {
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

    /* TODO: MVP 이후 추후 적용 예정 (나중에 사용부분에 대해 다시 논의 필요) */
    /*이메일 중복체크*/
    static async checkEmail(email: string) {
        return await http.get(`/user-email/${email}/exists`);
    }

    /* 취미 리스트 불러오기 */
    static async getHobbyList() {
        return await http.get(`/profile/category-list`);
    }
}

/*
    TODO: 회원가입 관련 api 요청 메소드 추가 작업 필요 (ex. 회원가입, 회원탈퇴 등)
          백엔드 api 작업 완료시 추가 작업 진행
*/