import React from 'react';
import { useNavigate } from 'react-router-dom';

import ClubItem from '../../main/club/ClubItem';
import { clubItem } from '../../../api/ApiTypes';

import LoadingSpinnerController from '../../controllers/LoadingSpinnerController';
import '../../../styles/club/list/ClubList.scss';

interface ClubListProps {
  clubList: clubItem[] | null;
  accessToken: string | null;
  isLoading?: boolean;
}
const ClubList = ({ clubList, accessToken, isLoading }: ClubListProps) => {
  const navigate = useNavigate();

  return (
    <div className="club-list-container">
      <div className="club-list-box">
        {clubList && clubList.length > 0 ? (
          /* 모임 있을 경우 */
          clubList
            .reduce((rows, clubItem, index) => {
              if (index % 4 === 0) rows.push([]);
              rows[rows.length - 1].push(clubItem);
              return rows;
            }, [])
            .map((clubItemsInRow, rowIndex) => (
              <div className="club-row" key={rowIndex}>
                {clubItemsInRow.map(clubItemInRow => (
                  <ClubItem
                    className={'club-list-item'}
                    key={clubItemInRow.clubId}
                    clubId={clubItemInRow.clubId}
                    photo={clubItemInRow.photo}
                    hostId={clubItemInRow.hostId}
                    hostNickname={clubItemInRow.hostNickname}
                    category={clubItemInRow.category}
                    maxMember={clubItemInRow.maxMember}
                    clubName={clubItemInRow.clubName}
                    locationName={clubItemInRow.locationName}
                    currentMembers={clubItemInRow.currentMembers}
                    subCategory={clubItemInRow.subCategory}
                    postCategory={clubItemInRow.postCategory}
                  />
                ))}
              </div>
            ))
        ) : isLoading ? (
          /* 로딩 중일 경우 */
          <LoadingSpinnerController />
        ) : (
          /* 모임 없을 경우 예외 처리 */
          <div className="club-list-exception-box">
            <div className="club-list-exception-text-box">
                <span>근처에 개설된 모임이 없어요.</span>
                <span>지역을 바꾸거나 다른 카테고리의 모임을 살펴보세요.</span>
            </div>
            <button
                type="button"
                /* 로그인 유저 : 정기 모임 등록 페이지로 이동, 비로그인 유저 : 로그인 페이지로 이동 */
                onClick={() =>
                    accessToken ? navigate('/club/register') : navigate('/login')
                }
            >
                <div className="club-list-exception-icon"></div>
                <span>직접 모임을 만들어 보세요!</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubList;
