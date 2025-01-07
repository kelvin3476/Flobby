import React from 'react';
import Header from '../components/login/Header';
import Input from '../components/input/Input';
import Button from '../components/button/Button';

import useLoginForm from '../hooks/login/useLoginForm';

import '../styles/login/PasswordReset.scss';
import Footer from '../components/login/Footer';



const PasswordReset = () => {
  const {
    inputType,
    password,
    isPasswordValid,
    passwordError,
    handlePasswordBlur,
    handlePasswordChange,
    handlePasswordVisibility,
} = useLoginForm();
  return (
    <div className='passreset-container'>
      <div className='passreset-title'>
        <Header headerTitle='비밀번호 재설정'/>
        <span>비밀번호는 문자+숫자+특수문자 조합 8~20자리를 입력해 주세요</span>
      </div>
      <main>
        <div className='input-container'>
          <label>
            <Input type={inputType}
                value={password}
                onClick={handlePasswordVisibility}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                isValid={isPasswordValid}
                errorMessage={passwordError}
                  placeholder='비밀번호를 입력해 주세요.' />
          </label>
          <label>
            <Input type={inputType}
                value={password}
                onClick={handlePasswordVisibility}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                isValid={isPasswordValid}
                errorMessage={passwordError}
                  placeholder='비밀번호를 한 번 더 입력해 주세요.'/>
          </label>
        </div>
        <Button className="passChange-button" title="비밀번호 변경" onClick={() => console.log('로그인 버튼 클릭!!')}/>
      </main>
    </div>
  );
}

export default PasswordReset;