import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../logo/Logo';
import RegionSelector from '../main/region_selector/RegionSelector';
import TextButton from '../button/TextButton';
import SearchBar from '../main/search_bar/SearchBar';
import Button from '../button/Button';
import DropDownModal from '../modal/DropDownModal';

import '../../styles/header/MainHeader.scss';

const MainHeader = ({ accessToken }: { accessToken: string | null }) => {
  const [isClicked, setIsClicked] = useState(false);
  const nav = useNavigate();
  const hasAccessToken = !!accessToken;

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <div className="main-wrapper">
          <div className="up-wrapper">
            <div className="left-wrapper">
              <Logo className="header-logo" onClick={() => nav('/')} />
              <RegionSelector />
            </div>
            <div className="right-wrapper">
              <SearchBar />
              <div className={`btns-wrapper ${hasAccessToken ? 'icons' : ''}`}>
                {!hasAccessToken ? (
                  <>
                    <Button
                      type="button"
                      className="login-btn"
                      title="로그인"
                      onClick={() => nav('/login')}
                    />
                    <Button
                      type="button"
                      className="signup-btn"
                      title="회원가입"
                      onClick={() => nav('/signup/agreement')}
                    />
                  </>
                ) : (
                  <>
                    <button className="notice-btn"></button>
                    <button className="saved-btn"></button>
                    <div
                      className={`profile-wrapper ${isClicked ? 'clicked' : ''}`}
                      onClick={() => setIsClicked(prev => !prev)}
                    >
                      <img
                        className="profile-btn"
                        src="../../img/header/profile-ex.jpg"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {isClicked && (
            <DropDownModal
              className="profile-modal"
              firstTitle="마이페이지"
              secondTitle="로그아웃"
            />
          )}
          <div className="down-wrapper">
            <TextButton
              className="club-btn"
              buttonName="모임"
              onClick={() => nav('/club/list', { state: accessToken })}
            />
            <TextButton
              className="oneday-btn"
              buttonName="원데이"
              onClick={() => nav('/oneday/all')}
            />
            <TextButton
              className="community-btn"
              buttonName="정보공유"
              onClick={() => nav('/community/all')}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
