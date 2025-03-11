import React from 'react';
import { useNavigate } from 'react-router';

import Header from '../../components/login/Header';
import Button from '../../components/button/Button';
import SignUpInput from '../../components/input/SignUpInput';
import ProgressBar from '../../components/signup/ProgressBar';

import '../../styles/signup/Registration.scss';

import useNicknameForm from '../../hooks/signup/nickname/useNicknameForm';
// import usePhoneForm from '../../hooks/signup/phone/usePhoneForm';
// import useVerificationCodeForm from '../../hooks/verificationcode/useVerificationCodeForm';
import useEmailForm from '../../hooks/email/useEmailForm';
import usePasswordForm from '../../hooks/signup/password/usePasswordForm';
import useCitizenStore from '../../store/citizenship/useCitizenStore';

import SignUp from "../../api/signup/SignUp";
import { WebTempSignupData } from "../../api/ApiTypes";

const Registration = () => {
  const navigate = useNavigate();
  const {
    nickname,
    isNicknameValid,
    nicknameError,
    handleNicknameBlur,
    handleNicknameChange,
    checkDuplicatedNickname,
  } = useNicknameForm();

  // const {
  //   phone,
  //   isPhoneValid,
  //   handlePhoneBlur,
  //   handlePhoneChange,
  //   sendVerificationCode,
  // } = usePhoneForm();
  //
  // const { code, display, handleCodeBlur, handleCodeChange } = useVerificationCodeForm();

  const {
    email,
    isEmailValid,
    emailError,
    handleEmailBlur,
    handleEmailChange,
  } = useEmailForm();

  const {
    password,
    isPasswordValid,
    checkPassword,
    passwordError,
    handlePasswordBlur,
    handlePasswordChange,
    toggleShowPassword,
  } = usePasswordForm();

  const { foreigner, setForeigner } = useCitizenStore();

  const citizenship = [
    { value: false, display: '내국인' },
    { value: true, display: '외국인' },
  ];

  const tempSignupHandler = (webTempSignupData: WebTempSignupData = { email: email, nickname: nickname, localPassword: password }) => {
    /* TODO: 닉네임, 이메일, 비밀번호 유효성 검증 로직 따로 분리 필요 + 추후 휴대폰 번호 유효성 검증 로직 추가 필요 */
    if (webTempSignupData.nickname === '' || webTempSignupData.email === '' && webTempSignupData.localPassword === '') return;
    if (!isNicknameValid || !isEmailValid || !isPasswordValid) return;
    if (nicknameError[1] !== '사용 가능한 닉네임입니다.') return;

    try {
      SignUp.WebSignupUserInfoInsert(webTempSignupData).then((response) => {
        if (response.data.code === 1000) {
          localStorage.setItem('signupTempInfoId', response.data.data.signupTempInfoId); /* 임시 회원가입 테이블 pk 값 */
          localStorage.setItem('nickname', nickname); /* 닉네임 */
          localStorage.setItem('foreigner', `${foreigner}`); /* 내국인/외국인 여부 */
          navigate('/signup/region');
        } else {
          /* TODO: 유저 정보 임시테이블에 저장 성공이 아닌 다른 경우의 수 모두 예외처리 필요 (백엔드 응답 코드 참고) */
        }
      })
    } catch (error) {
      console.error('임시 회원가입 에러', error);
    }
  }

  const tempSocialSignupHandler = (nickname: string, foreigner: boolean) => {
    /* TODO: 닉네임 유효성 검증 로직 따로 분리 필요 + 추후 휴대폰 번호 유효성 검증 로직 추가 필요 */
    if (!isNicknameValid) return;
    if (nicknameError[1] !== '사용 가능한 닉네임입니다.') return;

    localStorage.setItem('nickname', nickname); /* 닉네임 */
    localStorage.setItem('foreigner', `${foreigner}`); /* 내국인/외국인 여부 */

    if (localStorage.getItem('nickname') && localStorage.getItem('foreigner')) {
      navigate('/signup/region');
    }
  }

  const changeNextButtonStyle = (socialType: string) => {
    if (!socialType) {
      if (isNicknameValid && isEmailValid && isPasswordValid && nicknameError[1] === '사용 가능한 닉네임입니다.' && (password === checkPassword)) {
        return 'active';
      } else {
        return '';
      }
    } else {
      if (isNicknameValid && nicknameError[1] === '사용 가능한 닉네임입니다.') {
        return 'active';
      } else {
        return '';
      }
    }
  }

  return (
    <div className="registration-container">
      <ProgressBar />
      {/* 회원가입 헤더 */}
      <div className="registration-title">
        <Header className="Header" headerTitle="회원가입" />
      </div>

      {/* 회원가입 메인 컨텐츠 */}
      <main>
        <p className={'require'}>
          <span>*</span>필수 입력 사항
        </p>

        <ul className="user-form">
          {/* 닉네임 입력 부분 */}
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
                  isNicknameValid && checkDuplicatedNickname(nickname)
                }
              />
            </div>
          </li>

          {/*TODO: 1차 MVP 개발에서 휴대폰 번호 입력 및 인증 절차 제외 */}
          {/* 휴대폰 번호 입력 부분 */}
          {/*<li>*/}
          {/*  <label htmlFor="phone" className="phone">*/}
          {/*    휴대폰 번호<span>*</span>*/}
          {/*  </label>*/}
          {/*  <div className={'input-box'}>*/}
          {/*    <SignUpInput*/}
          {/*      type="text"*/}
          {/*      name="phone"*/}
          {/*      value={phone}*/}
          {/*      onChange={handlePhoneChange}*/}
          {/*      onBlur={handlePhoneBlur}*/}
          {/*      isValid={isPhoneValid}*/}
          {/*      maxLength={11}*/}
          {/*      placeholder="숫자만 입력해 주세요."*/}
          {/*    />*/}
          {/*    <Button*/}
          {/*      className={isPhoneValid ? 'check-btn active' : 'check-btn'}*/}
          {/*      title="본인 인증"*/}
          {/*      onClick={() => isPhoneValid && sendVerificationCode(phone)}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</li>*/}
          {/*<li>*/}
          {/*  <label htmlFor="verification-code" className="verification-code">*/}
          {/*    인증 번호<span>*</span>*/}
          {/*  </label>*/}
          {/*  <div className="input-box">*/}
          {/*    <SignUpInput*/}
          {/*      type="text"*/}
          {/*      name="verification-code"*/}
          {/*      className="long"*/}
          {/*      value={code}*/}
          {/*      timer={display}*/}
          {/*      onChange={handleCodeChange}*/}
          {/*      onBlur={handleCodeBlur}*/}
          {/*      isValid={isPhoneValid}*/}
          {/*      maxLength={6}*/}
          {/*      placeholder="인증 번호를 입력해 주세요."*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</li>*/}

          {/* 이메일 입력 (socialType이 없을 경우 렌더링 안함) */}
          {!localStorage.getItem('socialType') && (
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
                  errorMessage={emailError}
                  maxLength={121}
                  placeholder="이메일을 입력해 주세요."
                />
              </div>
            </li>
          )}

          {/* 비밀번호 입력 (socialType이 없을 경우 렌더링 안함) */}
          {!localStorage.getItem('socialType') && (
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
                  onClick={e => toggleShowPassword(e)}
                  // errorMessage={passwordError}
                  maxLength={20}
                  placeholder="비밀번호를 입력해 주세요."
                />
              </div>
              <p className="default">문자+숫자+특수문자 조합 8~20자리</p>
            </li>
          )}

          {/* 비밀번호 확인 (socialType이 없을 경우 렌더링 안함) */}
          {!localStorage.getItem('socialType') && (
            <li>
              <label htmlFor="checkPassword" className="checkPassword">
                비밀번호 확인<span>*</span>
              </label>
              <div className="input-box">
                <SignUpInput
                  type="password"
                  name="checkPassword"
                  className="long"
                  value={checkPassword}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  isValid={isPasswordValid}
                  onClick={e => toggleShowPassword(e)}
                  // errorMessage={passwordError}
                  maxLength={20}
                  placeholder="비밀번호를 한 번 더 입력해 주세요."
                />
              </div>
            </li>
          )}

          {/* 내/외국인 입력 부분 */}
          <li>
            <label>
              내국인 / 외국인<span>*</span>
            </label>
            <ul className="radio-ul">
              {citizenship.map(item => (
                <li key={item.display}>
                  <input
                    type={'radio'}
                    id={item.display}
                    className={foreigner == item.value ? 'checked' : ''}
                    onClick={() => setForeigner(foreigner)}
                  />
                  <label htmlFor={item.display}> {item.display}</label>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* 다음 스텝 버튼 */}
        <Button
          className={`next ${changeNextButtonStyle(localStorage.getItem('socialType'))}`}
          title="다음"
          onClick={() => !localStorage.getItem('socialType') ? tempSignupHandler({ email: email, nickname: nickname, localPassword: password }) : tempSocialSignupHandler(nickname, foreigner)}
        />
      </main>
    </div>
  );
};

export default Registration;
