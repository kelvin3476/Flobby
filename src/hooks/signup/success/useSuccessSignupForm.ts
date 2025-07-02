import React from "react";

import { useNavigate } from "react-router-dom";

import SignUp from "../../../api/signup/SignUp";
import { BaseSignupData, SocialSignupData, WebSignupData } from "../../../api/ApiTypes";

const useSuccessSignupForm = () => {
    const navigate = useNavigate();

    /* 소셜 타입에 따라 각 소셜 유저 정보의 이메일을 반환 */
    const changeEmailBySocialType = (socialType: string) => {
        switch (socialType) {
            case 'kakao':
                return `${JSON.parse(localStorage.getItem('kakao_account')).email}`;
            case 'naver':
                return `${JSON.parse(localStorage.getItem('naver_account')).email}`;
            case 'apple':
                return `${JSON.parse(localStorage.getItem('apple_account')).email}`;
            case 'google':
                return `${JSON.parse(localStorage.getItem('google_account')).email}`;
            case 'facebook':
                return `${JSON.parse(localStorage.getItem('facebook_account')).email}`;
        }
    }

    /* 소셜 타입에 따라 각 소셜 유저 정보의 니이대를 반환 */
    const changeAgeBySocialType = (socialType: string) => {
        switch (socialType) {
            case 'kakao':
                return `${JSON.parse(localStorage.getItem('kakao_account')).age_range}`;
            case 'naver':
                return `${JSON.parse(localStorage.getItem('naver_account')).age}`;
            case 'apple':
                return `${JSON.parse(localStorage.getItem('apple_account')).email}`;
            case 'google':
                return `${JSON.parse(localStorage.getItem('google_account')).email}`;
            case 'facebook':
                return `${JSON.parse(localStorage.getItem('facebook_account')).email}`;
        }
    }

    /* 회원가입 공통 데이터 */
    const baseSignupData: BaseSignupData = {
        term1: JSON.parse(localStorage.getItem('agreement-storage')).state.serviceAgree ? 'Y' : 'N',
        term2: JSON.parse(localStorage.getItem('agreement-storage')).state.privacyAgree ? 'Y' : 'N',
        term3: JSON.parse(localStorage.getItem('agreement-storage')).state.marketingAgree ? 'Y' : 'N',
        profilePhoto: '',
        region1: `${JSON.parse(localStorage.getItem('region-storage')).state.selectedRegionIds[0] ?? ''}`,
        region2: `${JSON.parse(localStorage.getItem('region-storage')).state.selectedRegionIds[1] ?? ''}`,
        region3: `${JSON.parse(localStorage.getItem('region-storage')).state.selectedRegionIds[2] ?? ''}`,
        interest1: `${JSON.parse(localStorage.getItem('hobby-storage') ?? '{}')?.state?.selectedHobbies?.[0] ?? ''}`,
        interest2: `${JSON.parse(localStorage.getItem('hobby-storage') ?? '{}')?.state?.selectedHobbies?.[1] ?? ''}`,
        interest3: `${JSON.parse(localStorage.getItem('hobby-storage') ?? '{}')?.state?.selectedHobbies?.[2] ?? ''}`,
    }

    const finalSocialSignUpHandler = () => {
        /* 소셜 회원가입 데이터 */
        const socialSignupData: SocialSignupData = {
            ...baseSignupData,
            email: changeEmailBySocialType(localStorage.getItem('socialType')),
            ageRange: changeAgeBySocialType(localStorage.getItem('socialType')),
            socialType: `${localStorage.getItem('socialType')}`,
            nickname: `${localStorage.getItem('nickname')}`,
            foreignerYn: localStorage.getItem('foreigner') === 'true' ? 'Y' : 'N',
        }

        try {
            SignUp.WebSocialSignup(socialSignupData).then((response) => {
                if (response.data.code === 1000) {
                    localStorage.clear();
                    navigate('/login');
                } else {
                    console.error('소셜 회원가입 실패');
                }
            })
        } catch (error) {
            console.error('소셜 회원가입 api 요청 실패', error);
        }
    }

    const finalSignUpHandler = () => {
        /* 자체 회원가입 데이터 */
        const webSignupData: WebSignupData = {
            ...baseSignupData,
            signupTempInfoId: Number(localStorage.getItem('signupTempInfoId')),
            foreigner: localStorage.getItem('foreigner') === 'true' ? 'Y' : 'N',
        }

        try {
            SignUp.WebSignup(webSignupData).then((response) => {
                if (response.data.code === 1000) {
                    localStorage.clear();
                    navigate('/login');
                } else {
                    console.error('자체 회원가입 실패');
                }
            })
        } catch (error) {
            console.error('자체 회원가입 api 요청 실패', error);
        }
    }

    return {
        finalSocialSignUpHandler,
        finalSignUpHandler,
    };
}

export default useSuccessSignupForm;