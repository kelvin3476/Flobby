import '../styles/login/ForgotPassword.scss';
import React from 'react';

import Header from '../components/login/Header.js';
import Input from '../components/input/Input';
import Button from '../components/button/Button';

import useLoginForm from '../hooks/login/useLoginForm';

const ForgotPassword = () => {
  const {
    email,
    isEmailValid,
    emailError,
    handleEmailBlur,
    handleEmailChange,
  } = useLoginForm();

  return (
    <div className="passfind-container">
      <div className="passfind-title">
        <Header headerTitle="비밀번호 찾기" />
        <span>
          기존에 가입하신 이메일을 입력하시면, 비밀번호 변경 메일을 발송해
          드립니다.
        </span>
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
          </label>
          <Button
            className="GetEmail-button"
            title="비밀번호 변경 이메일 받기"
            onClick={() => console.log('이메일 받기 버튼 클릭 !!')}
          />
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
