import React from 'react';
import { useParams } from 'react-router-dom';

import { ClubController } from '../../services/club/controllers/ClubController';

import logger from '../../utils/Logger';
import ClubMeetingList from '../../components/club/club_meeting/ClubMeetingList';
import { ClubMeetingListData } from '../../components/club/club_meeting/ClubMeetingListData'; // TODO: 정기 모임 연동 테스트 하면서 삭제 예정

const ClubDetail = () => {
  const { clubId } = useParams<{ clubId: string }>();

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
        logger.log('모임 상세 정보:', response);
      } catch (error) {
        logger.error('모임 상세 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchClubDetail();
  }, [clubId]);

  // TODO: 추후 연동 테스트하면서 삭제 예정
  // 정기모임용 테스트 데이터
  const clubMeetingList = ClubMeetingListData;

  return (
    <div>
      <ClubMeetingList
        clubMeetingList={clubMeetingList}
        loginMemberId={12}
        role="leader"
        isMember={true}
      />
    </div>
  );
};

export default ClubDetail;
