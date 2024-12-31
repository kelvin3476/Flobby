import React from 'react';

import Header from "../components/login/Header.js";
import Footer from "../components/login/Footer";
import Button from "../components/button/Button";

import '../styles/login/Login.scss';

const Login = () => {
    return (
        <div className="login-container">
            {/* 로그인 헤더 */}
            <Header headerTitle='Flobby' />

            {/* 로그인 메인 컨텐츠 */}
            <main>
              {/* 입력 컨테이너 */}
              <div className="input-container">
                <input type="text" placeholder="이메일을 입력해 주세요." />
                <input type="password" placeholder="비밀번호를 입력해 주세요." />

                <div className='support-container'>
                    <div className="checkbox-container">
                        <input type="checkbox" id="remember" />
                        <label>로그인 상태 유지</label>
                    </div>

                    <span onClick={() => console.log('비밀번호 찾기 클릭!!')}>비밀번호 찾기</span>
                </div>
              </div>

              {/* 로그인 버튼 */}
              <Button className="login-button" title="로그인" onClick={() => console.log('로그인 버튼 클릭!!')}/>

              {/* 소셜 로그인 */}
              <div className='social-login-container'>
                  <div className='social-login-title'>간편하게 SNS 로그인</div>

                  <div className="social-login-button-container">
                    <Button className='kakao-login-button' onClick={() => console.log('카카오 소셜 로그인 버튼 클릭!!')} />
                    <Button className='naver-login-button' onClick={() => console.log('네이버 소셜 로그인 버튼 클릭!!')} />
                    <Button className='apple-login-button' onClick={() => console.log('애플 소셜 로그인 버튼 클릭!!')} />
                    <Button className='google-login-button' onClick={() => console.log('구글 소셜 로그인 버튼 클릭!!')} />
                    <Button className='facebook-login-button' onClick={() => console.log('페이스북 소셜 로그인 버튼 클릭!!')} />
                  </div>
                </div>
            </main>

            {/* 로그인 풋터 */}
            <Footer footerTitle='아직 Flobby 회원이 아니신가요?' />
        </div>
    );
};

export default Login;
