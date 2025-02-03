import React from "react";

import Header from "../../components/login/Header";
import Button from "../../components/button/Button";

import "../../styles/join/Agreement.scss";

const Agreement = () => {

  return (
    <div className="agreement-container">
      <div className="agreement-title">
        <Header className="Header" headerTitle="Flobby 회원가입을 시작합니다."/>
        <span>Flobby 회원이 되면 취미 모임과 커뮤니티를 통해 <br/> 새로운 관심사를 발견하고 다양한 사람들과 교류할 수 있어요.</span>
      </div>

      <main>
        <div className="input-container">
          <label>
            <input 
              type="checkbox" 
            />
            <span>약관 모두 동의</span>
          </label>
          <hr />

          <label>
            <input 
              type="checkbox" 
            />
            <span>[필수] 서비스 이용약관 동의</span>
            <button>약관보기</button>
          </label>

          <label>
            <input 
              type="checkbox"
            />
            <span>[필수] 개인정보 수집 및 이용 동의</span>
            <button>약관보기</button>
          </label>

          <label>
            <input 
              type="checkbox" 
            />
            <span>[선택] 광고성 정보 수신 동의</span>
            <button>약관보기</button>
          </label>
        </div>

        <Button 
          className="join-next-btn"
          title="다음"
          onClick={() => {"next"}}
          />
      </main>
    </div>
  );
};

export default Agreement;