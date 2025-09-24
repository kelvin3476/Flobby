import React, { useEffect, useState } from 'react';
import { GetMyInfoResponse } from '@/api/ApiTypes';
import { MyInfoController } from '@/services/mypage/controllers/MyInfoControllers';
import Tag from '@/components/tag/Tag';
import '@/styles/mypage/ProfileInfo.scss';

const profileTestData = {
  profilePhotoUrl: '/img/header/profile-ex2.jpg',
  nickname: '예시 닉네임',
  email: 'email@naver.com',
  interestRegions: [
    { regionId: 218, regionName: '강남구' },
    { regionId: 197, regionName: '관악구' },
    { regionId: 199, regionName: '동작구' },
  ],
  interestCategory: ['자전거', '캠핑', '힙합·락'],
};

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
      <div className="profile-img-container">
        <img
          src={
            profileTestData?.profilePhotoUrl
              ? profileTestData.profilePhotoUrl
              : '/img/header/profile-ex2.jpg'
          }
        />
      </div>
      <div className="profile-info-container">
        <div className="profile-info-top-container">
          <span className="profile-info-nickname">
            {profileTestData?.nickname}
          </span>
          <span className="profile-info-email">{profileTestData?.email}</span>
        </div>
        <div className="profile-info-bottom-container">
          <div className="interest-region-container">
            <div className="icon-region"></div>
            <div className="interest-regions">
              {profileTestData?.interestRegions?.map(region => {
                return (
                  <Tag
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
              {profileTestData?.interestCategory?.map(category => {
                return (
                  <Tag
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
  );
};

export default ProfileInfo;
