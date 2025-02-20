import React from 'react';
import { useNavigate } from 'react-router';

import Header from '../../components/login/Header';
import Button from '../../components/button/Button';

import '../../styles/signup/SignUp.scss';
import useSignUpStore from "../../store/signup/useSignUpStore";

const SignUp = () => {
  const { signUpData,setSignUpData } = useSignUpStore();
  const navigate = useNavigate();
  const citizenship = [
    {
      value: 'domestic',
      display: '내국인',
    },
    {
      value: 'foreign',
      display: '외국인',
    },
  ];
  
  return (
    <div className="signup-container">
      <div className="signup-title">
        <Header className="Header" headerTitle="회원가입" />
      </div>
      <main>
        <p>
          <span>*</span>필수 입력 사항
        </p>
        <ul className="user-form">
          <li>
            <label
                htmlFor="nickname" className="nickname">닉네임<span>*</span>
            </label>
            <div>
              <input
                type="text"
                name="nickname"
                onChange={setSignUpData}
                placeholder="닉네임을 입력해 주세요."
              />
              <Button
                className="check-duplicated"
                title="중복 확인"
                onClick={() => navigate('/')}
              />
              <span className="delete"></span>
            </div>
          </li>
          <li>
            <label htmlFor="phone" className="phone">
              휴대폰 번호<span>*</span>
            </label>
            <div>
              <input
                type="text"
                name="phone"
                onChange={setSignUpData}
                placeholder="휴대폰 번호를 입력해 주세요."
              />
              <Button
                className="check-duplicated"
                title="본인 인증"
                onClick={() => navigate('/')}
              />
              <span className="delete"></span>
            </div>
          </li>
          <li>
            <label htmlFor="number" className="number">
              인증 번호<span>*</span>
            </label>
            <div>
              <input
                className="long"
                type="number"
                name="number"
                onChange={setSignUpData}
                placeholder="인증 번호를 입력해 주세요."
              />
            </div>
          </li>
          <li>
            <label htmlFor="email" className="email">
              이메일<span>*</span>
            </label>
            <div>
              <input
                className="long"
                type="email"
                name="email"
                onChange={setSignUpData}
                placeholder="이메일을 입력해 주세요."
              />
              <span className="delete"></span>
            </div>
          </li>
          <li>
            <label htmlFor="password" className="password">
              비밀번호<span>*</span>
            </label>
            <div>
              <input
                className="long"
                type="password"
                name="password"
                onChange={setSignUpData}
                placeholder="비밀번호를 입력해 주세요."
              />
              <span className="show-password"></span>
            </div>
            <p className="desc">문자+숫자+특수문자 조합 8~20자리</p>
          </li>
          <li>
            <label htmlFor="check_password" className="check_password">
              비밀번호 확인<span>*</span>
            </label>
            <div>
              <input
                className="long"
                type="password"
                name="check_password"
                onChange={setSignUpData}
                placeholder="비밀번호를 한 번 더 입력해 주세요."
              />
              <span className="show-password"></span>
            </div>
          </li>
          <li>
            <label>
              내국인 / 외국인<span>*</span>
            </label>
            <ul className="radio-ul">
              {citizenship &&
                citizenship.map(item => (
                  <li>
                    <input type={'radio'} id={item.value} value={item.value} />
                    <label htmlFor={item.value}> {item.display}</label>
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
