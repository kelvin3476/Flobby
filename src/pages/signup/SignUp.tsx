import React from 'react';
import { useNavigate } from 'react-router';

import Header from '../../components/login/Header';
import Button from '../../components/button/Button';

import '../../styles/signup/SignUp.scss';

const SignUp = () => {
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
            <label htmlFor="nickname" className="nickname">
              닉네임<span>*</span>
            </label>
            <div>
              <input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해 주세요."
              />
              <Button
                className="check-duplicated"
                title="중복 확인"
                onClick={() => navigate('/')}
              />
            </div>
          </li>
          <li>
            <label htmlFor="mobile-num" className="mobile-num">
              휴대폰 번호<span>*</span>
            </label>
            <div>
              <input
                id="mobile-num"
                type="text"
                placeholder="휴대폰 번호를 입력해 주세요."
              />
              <Button
                className="check-duplicated"
                title="본인 인증"
                onClick={() => navigate('/')}
              />
            </div>
          </li>
          <li>
            <label htmlFor="mobile-num" className="mobile-num">
              인증 번호<span>*</span>
            </label>
            <div>
              <input
                className="long"
                id="mobile-num"
                type="text"
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
                id="email"
                className="long"
                type="email"
                placeholder="이메일을 입력해 주세요."
              />
            </div>
          </li>
          <li>
            <label htmlFor="password" className="password">
              비밀번호<span>*</span>
            </label>
            <div>
              <input
                className="long"
                id="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요."
              />
              <span className="show-password"></span>
            </div>
            {/*<p>문자+숫자+특수문자 조합 8~20자리</p>*/}
          </li>
          <li>
            <label htmlFor="re-password" className="re-password">
              비밀번호 확인<span>*</span>
            </label>
            <div>
              <input
                className="long"
                id="re-password"
                type="password"
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
      </main>
      <Button className="next" title="다음" onClick={() => navigate('/')} />
    </div>
  );
};

export default SignUp;
