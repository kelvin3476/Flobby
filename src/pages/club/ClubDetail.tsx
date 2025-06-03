import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ClubController } from '../../services/club/controllers/ClubController';

import logger from '../../utils/Logger';
import ClubMeetingList from '../../components/club/detail/ClubMeetingList';
import { ClubMeetingListItem } from '../../api/ApiTypes';

const ClubDetail = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const [clubMeetingList, setClubMeetingList] = useState<ClubMeetingListItem[]>(
    [],
  );

  React.useEffect(() => {
    if (!clubId) {
      logger.error('모임 ID가 제공되지 않았습니다.');
      return;
    }

    // 모임 상세 정보를 가져오는 API 호출
    const fetchClubDetail = async () => {
      try {
        // 여기에 API 호출 로직을 추가하세요.
        logger.log(`모임 ID: ${clubId}`);
        const response = await ClubController.getInstance().selectClubDetail(
          Number(clubId),
        );
        setClubMeetingList(response.clubMeetingList);
        logger.log('모임 상세 정보:', response);
      } catch (error) {
        logger.error('모임 상세 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchClubDetail();
  }, [clubId]);

  return (
    <div>
      <ClubMeetingList
        clubMeetingList={clubMeetingList}
        loginMemberId={12} //TODO: 데이터 연동 필요
        role="leader" //TODO: 데이터 연동 필요
        isMember={true} //TODO: 데이터 연동 필요
      />
    </div>
  );
};

export default ClubDetail;
