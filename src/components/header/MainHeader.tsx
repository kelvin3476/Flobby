import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../logo/Logo';
import RegionSelector from '../main/region_selector/RegionSelector';
import TextButton from '../button/TextButton';
import SearchBar from '../main/search_bar/SearchBar';
import Button from '../button/Button';
import DropDownModal from '../modal/DropDownModal';

import Logout from '../../api/logout/Logout';
import { MainData } from '../../api/ApiTypes';

import '../../styles/header/MainHeader.scss';

interface MainHeaderProps {
  accessToken: string | null;
  mainDataList: MainData;
  setMainDataList: React.Dispatch<React.SetStateAction<MainData>>;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  accessToken,
  mainDataList,
  setMainDataList,
}: MainHeaderProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const nav = useNavigate();
  const hasAccessToken = !!accessToken;

  useEffect(() => {
    setMainDataList(mainDataList);
  }, []);

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <div className="main-wrapper">
          <div className="up-wrapper">
            <div className="left-wrapper">
              <Logo className="header-logo" onClick={() => nav('/')} />
              <RegionSelector
                mainDataList={mainDataList}
                setMainDataList={setMainDataList}
              />
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
              items={['마이페이지', '로그아웃']}
              onItemClick={async (item, idx) => {
                if (item === '로그아웃') {
                  // 로그아웃 로직
                  await Logout.webLogout();
                  window.location.reload();
                  localStorage.removeItem('token-storage');
                  localStorage.removeItem('preferRegionsList');
                } else if (item === '마이페이지') {
                  // 마이페이지 라우팅
                }
              }}
            />
          )}
          <div className="down-wrapper">
            <TextButton
              className="club-btn"
              buttonName="모임"
              onClick={() => nav('/club/list')}
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
