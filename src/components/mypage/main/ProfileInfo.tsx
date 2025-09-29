import React, { useEffect, useState } from 'react';
import { GetMyInfoResponse } from '@/api/ApiTypes';
import { MyInfoController } from '@/services/mypage/controllers/MyInfoControllers';
import Tag from '@/components/tag/Tag';
import '@/styles/mypage/ProfileInfo.scss';
import Button from '@/components/button/Button';

const ProfileInfo = () => {
  const [infoData, setInfoData] = useState<GetMyInfoResponse | null>(null);
  const myInfoController = MyInfoController.getInstance();

  const fetchMyInfoData = async () => {
    const infoData = await myInfoController.getMyInfo();
    setInfoData(infoData);
  };

  useEffect(() => {
    fetchMyInfoData();
  }, []);

  return (
    <div className="profile-info-wrapper">
      <div className="profile-info-main-box">
        <div className="profile-img-container">
          <img
            src={
              infoData?.profilePhotoUrl
                ? infoData.profilePhotoUrl
                : '/img/mypage/icon_profile.png'
            }
          />
        </div>

        <div className="profile-info-container">
          <div className="profile-info-top-container">
            <span className="profile-info-nickname">{infoData?.nickname}</span>
            <span className="profile-info-email">{infoData?.email}</span>
          </div>
          <div className="profile-info-bottom-container">
            <div className="interest-region-container">
              <div className="icon-region"></div>
              <div className="interest-regions">
                {infoData?.interestRegions?.map(region => {
                  return (
                    <Tag
                      key={region.regionId}
                      label={region.regionName}
                      type="profile"
                      color="gray"
                      size="default"
                    />
                  );
                })}
              </div>
            </div>
            <div className="interest-category-container">
              <div className="icon-category"></div>
              <div className="interest-categories">
                {infoData?.interestCategory?.map(category => {
                  return (
                    <Tag
                      key={category}
                      label={category}
                      type="profile"
                      color="gray"
                      size="default"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-info-btn-container">
        <Button
          title="프로필 관리"
          onClick={() => {
            // TODO: 프로필 관리 페이지로 이동
            console.log('프로필 관리 버튼 클릭!');
          }}
          className="profile-info-btn"
        />
        <Button
          title="내 피드"
          onClick={() => {
            // TODO: 내 피드 페이지로 이동
            console.log('내 피드 버튼 클릭!');
          }}
          className="profile-info-btn"
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
