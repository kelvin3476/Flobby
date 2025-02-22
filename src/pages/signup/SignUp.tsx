import React from 'react';
import { useNavigate } from 'react-router';

import Header from '../../components/login/Header';
import Button from '../../components/button/Button';

import '../../styles/signup/SignUp.scss';
import useSignUpStore from '../../store/signup/useSignUpStore';
import SignUpInput from '../../components/input/SignUpInput';
import useNicknameForm from '../../hooks/signup/nickname/useNicknameForm';
import usePhoneForm from "../../hooks/signup/phone/usePhoneForm";
import useVerificationCodeForm from "../../hooks/verificationcode/useVerificationCodeForm";
import useEmailForm from "../../hooks/email/useEmailForm";
import usePasswordForm from "../../hooks/signup/password/usePasswordForm";

const SignUp = () => {
  const { signUpData, setSignUpData } = useSignUpStore();
  const {
    nickname,
    isNicknameValid,
    nicknameError,
    handleNicknameBlur,
    handleNicknameChange,
    checkDuplicatedNickname
  } = useNicknameForm();
    const {
        phone,
        isPhoneValid,
        handlePhoneBlur,
        handlePhoneChange,
    } = usePhoneForm();

    const {
        code,
        handleCodeBlur,
        handleCodeChange,
    } = useVerificationCodeForm();

const {
    email,
    isEmailValid,
    emailError,
    handleEmailBlur,
    handleEmailChange,
} =useEmailForm();

    const {
        password,
        isPasswordValid,
        passwordError,
        handlePasswordBlur,
        handlePasswordChange,
    } =usePasswordForm();

  const navigate = useNavigate();
  const citizenship = [
    {
      value: 'N',
      display: '내국인',
    },
    {
      value: 'Y',
      display: '외국인',
    },
  ];

  return (
    <div className="signup-container">
      <div className="signup-title">
        <Header className="Header" headerTitle="회원가입" />
      </div>
      <main>
        <p className={'require'}>
          <span>*</span>필수 입력 사항
        </p>
        <ul className="user-form">
          <li>
            <label htmlFor="nickname" className="nickname">
              닉네임<span>*</span>
            </label>
            <div className={'input-box'}>
              <SignUpInput
                type="text"
                name="nickname"
                value={nickname}
                onChange={handleNicknameChange}
                onBlur={handleNicknameBlur}
                placeholder="닉네임을 입력해 주세요."
                maxLength={12}
                errorMessage={nicknameError}
                isValid={isNicknameValid}
              />
              <Button
                className={isNicknameValid ? 'check-btn active' : 'check-btn'}
                title="중복 확인"
                onClick={() =>
                  isNicknameValid ? checkDuplicatedNickname(nickname) : ''
                }
              />
            </div>
          </li>
          <li>
            <label htmlFor="phone" className="phone">
              휴대폰 번호<span>*</span>
            </label>
            <div className={'input-box'}>
              <SignUpInput
                type="text"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                isValid={isPhoneValid}
                maxLength={11}
                placeholder="숫자만 입력해 주세요."
              />
              <Button
                className={isPhoneValid ? 'check-btn active' : 'check-btn'}
                title="본인 인증"
                onClick={() => navigate('/')}
              />
            </div>
          </li>
          <li>
            <label htmlFor="verification-code" className="verification-code">
              인증 번호<span>*</span>
            </label>
            <div className="input-box">
              <SignUpInput
                type="number"
                name="verification-code"
                className="long"
                value={code}
                onChange={handleCodeChange}
                onBlur={handleCodeBlur}
                isValid={isPhoneValid}
                maxLength={11}
                placeholder="인증 번호를 입력해 주세요."
              />
            </div>
          </li>
          <li>
            <label htmlFor="email" className="email">
              이메일<span>*</span>
            </label>
            <div className="input-box">
              <SignUpInput
                type="email"
                name="email"
                className="long"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                isValid={isEmailValid}
                // errorMessage={emailError}
                maxLength={121}
                placeholder="이메일을 입력해 주세요."
              />
            </div>
          </li>
          <li>
            <label htmlFor="password" className="password">
              비밀번호<span>*</span>
            </label>
            <div className="input-box">
              <SignUpInput
                type="password"
                name="password"
                className="long"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                isValid={isPasswordValid}
                // errorMessage={passwordError}
                maxLength={20}
                placeholder="비밀번호를 입력해 주세요."
              />
              <span className="show-password"></span>
            </div>
            <p className="default">문자+숫자+특수문자 조합 8~20자리</p>
          </li>
          <li>
            <label htmlFor="check_password" className="check_password">
              비밀번호 확인<span>*</span>
            </label>
            <div className="input-box">
              <input
                className="long"
                type="password"
                name="check_password"
                onChange={setSignUpData}
                placeholder="비밀번호를 한 번 더 입력해 주세요."
                maxLength={20}
              />
              <span className="show-password"></span>
            </div>
          </li>
          <li>
            <label>내국인 / 외국인<span>*</span>
            </label>
            <ul className="radio-ul">
              {citizenship &&
                citizenship.map(item => (
                  <li>
                    <input
                      type={'radio'}
                      id={item.display}
                      className={
                        signUpData.foreignerYn == item.value ? 'checked' : ''
                      }
                      // onChange={""}
                    />
                    <label htmlFor={item.display}> {item.display}</label>
                  </li>
                ))}
            </ul>
          </li>
        </ul>
        <Button className="next" title="다음" onClick={() => navigate('/')} />
      </main>
    </div>
  );
};

export default SignUp;
