import { http } from "../../utils/Http";
import { SignupData } from "../ApiTypes";

export default class SignUp {
    /* TODO: 회원가입 완료 버튼 클릭시 소셜 유저 정보 + 프로필 설정 정보 백엔드로 보낸후 회원 가입 완료 처리 작업 필요 */
    static async signup(signupData: SignupData) {
        return await http.post('/profile/social-insert', signupData);
    }
}

/*
    TODO: 회원가입 관련 api 요청 메소드 추가 작업 필요 (ex. 회원가입, 회원탈퇴 등)
          백엔드 api 작업 완료시 추가 작업 진행
*/