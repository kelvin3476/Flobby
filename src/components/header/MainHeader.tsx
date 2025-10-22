import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '@/components/logo/Logo';
import RegionSelector from '@/components/main/region_selector/RegionSelector';
import SearchBar from '@/components/main/search_bar/SearchBar';
import Button from '@/components/button/Button';
import DropDownModal from '@/components/modal/DropDownModal';

import { CommonBaseController } from '@/services/common/controllers/CommonBaseController';

import Logout from '@/api/logout/Logout';

import defaultProfileIcon from '/img/header/icon_profile_header.png'
import '@/styles/header/MainHeader.scss';

interface MainHeaderProps {
  accessToken: string | null;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  accessToken,
}: MainHeaderProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const nav = useNavigate();
  const hasAccessToken = !!accessToken;

  const commonBaseController = CommonBaseController.getInstance();

  const fetchHeaderInfo = async () => {
    try {
      await commonBaseController.getHeaderInfo();
    } catch (error) {
      console.error('header api load failed', error)
    }
  }

  React.useEffect(() => {
    if (accessToken) fetchHeaderInfo()
  }, [accessToken])

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <div className="main-wrapper">
          <div className="up-wrapper">
            <div className="left-wrapper">
              <Logo className="header-logo" onClick={() => nav('/')} />
              <RegionSelector accessToken={accessToken} />
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
                        src={commonBaseController.model.headerInfo?.profilePhotoUrl ?? defaultProfileIcon}
                        alt=""
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
                } else if (item === '마이페이지') {
                  // 마이페이지 라우팅
                  nav('/mypage')
                }
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
