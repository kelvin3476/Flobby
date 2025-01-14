import React from "react";

import Header from "../../components/login/Header";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import useEmailForm from "../../hooks/email/useEmailForm";

import "../../styles/password/FindPassword.scss";

const FindPassword = () => {
    const {
      email,
      isEmailValid,
      emailError,
      handleEmailBlur,
      handleEmailChange,
    } = useEmailForm();

    return (
        <div className="find-password-container">
            <div className="find-password-title">
                <Header className="Header" headerTitle="비밀번호 찾기"/>
                <span>기존에 가입하신 이메일을 입력하시면, 비밀번호 변경 메일을 발송해 드립니다.</span>
            </div>

            <main>
                <div className="input-container">
                    <label>
                        <Input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            isValid={isEmailValid}
                            errorMessage={emailError}
                            placeholder="이메일을 입력해 주세요."
                        />
                        {/*
                          TODO: input에 입력된 이메일 정보가 db 정보랑 일치 하지 않은경우
                                => 유효성 검증 로직 추가 필요 (useEmailForm.ts, useEmailStore.tsx 참고)
                                => '일치하는 이메일 정보가 없습니다. 다시 확인해 주세요.' 문구 포함한 에러 메시지 표출 (피그마 디자인 참고 퍼블 필요)
                         */}
                    </label>
                </div>

                <Button className="get-email-button" title="비밀번호 변경 이메일 받기" onClick={() => console.log("비밀번호 변경 이메일 받기 !!")}/>
                {/*
                  TODO: 비밀번호 변경 이메일 받기 버튼 클릭시
                        => input에 입력된 이메일로 메일 전송 (백엔드 spring 메일 전송 api 추후 연동 필요)
                        => '비밀번호 변경 메일이 발송되었습니다.' 문구 포함한 토스트 띄우기 (피그마 디자인 참고 퍼블 필요)
                */}
            </main>
        </div>
    );
};

export default FindPassword;