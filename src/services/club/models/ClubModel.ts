import {
  clubItem,
  ClubItemDetail,
  ClubSearchItem,
  ClubMeetingData,
} from '@/api/ApiTypes';
import Main from '@/api/main/Main';

import logger from '@/utils/Logger';

export class ClubModel {
  clubListData: clubItem[] = [];
  ClubItemDetailData: ClubItemDetail;

  /* 모임 리스트 불러 오는 api */
  async getClubList(mainCategory?: string): Promise<clubItem[]> {
    try {
      // mainCategory값을 api에 request param으로 넣어주기(인코딩 x)
      const response = await Main.getClubList(mainCategory);
      const { code, message, data } = response.data;
      if (code === 1000) {
        // API 호출 성공
        this.clubListData = data;
        return this.clubListData;
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '모임 목록 데이터를 가져오지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (err: any) {
      logger.error(err.message || '모임 목록 api 요청 실패');
    }
  }

  /* 모임 등록 api */
  async createClub(createClubData: FormData): Promise<void> {
    try {
      const response = await Main.createClub(createClubData);
      const { code, message } = response.data;
      if (code === 1000) {
        // API 호출 성공
        logger.log('모임 게시글이 성공적으로 생성되었습니다.');
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '모임 게시글을 생성하지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (error: any) {
      logger.error(error.message || '모임 등록 api 요청 실패');
    }
  }

  /* 모임 수정 api */
  async editClub(clubId: number, editClubData: FormData): Promise<void> {
    try {
      const response = await Main.editClub(clubId, editClubData);
      const { code, message } = response.data;
      if (code === 1000) {
        // API 호출 성공
        logger.log('모임 게시글이 성공적으로 수정되었습니다.');
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '모임 게시글을 수정하지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (error: any) {
      logger.error(error.message || '모임 수정 api 요청 실패');
    }
  }

  /* 모임 삭제 api */
  async deleteClub(clubId: number): Promise<void> {
    try {
      const response = await Main.deleteClub(clubId);
      const { code, message } = response.data;
      if (code === 1000) {
        // API 호출 성공
        logger.log('모임 게시글이 성공적으로 삭제되었습니다.');
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '모임 게시글을 삭제하지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (error: any) {
      logger.error(error.message || '모임 삭제 api 요청 실패');
    }
  }

  /* 모임 아이템 선택시 상세 정보 불러 오는 api */
  async selectClubDetail(clubId: number): Promise<ClubItemDetail> {
    try {
      const response = await Main.getClubDetail(clubId);
      const { code, message, data } = response.data;
      if (code === 1000) {
        // API 호출 성공
        this.ClubItemDetailData = data;
        return this.ClubItemDetailData;
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '모임 상세 데이터를 가져오지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (error: any) {
      logger.error(error.message || '모임 상세 api 요청 실패');
    }
  }

  /* 모임 검색 api */
  async searchClubList(searchKeyword?: string): Promise<ClubSearchItem> {
    try {
      const response = await Main.searchClubList(searchKeyword);
      const { code, message, data } = response.data;
      if (code === 1000) {
        // API 호출 성공
        return data;
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '모임 검색 데이터를 가져오지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (error: any) {
      logger.error(error.message || '모임 검색 api 요청 실패');
    }
  }

  /* 정기 모임 등록 api */
  async createClubMeeting(
    createClubMeetingData: ClubMeetingData,
    clubId: number,
  ): Promise<void> {
    try {
      const response = await Main.createClubMeeting(
        createClubMeetingData,
        clubId,
      );
      const { code, message } = response.data;
      if (code === 1000) {
        // API 호출 성공
        logger.log('정기 모임 게시글이 성공적으로 생성되었습니다.');
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '정기 모임 게시글을 생성하지 못했습니다.');
      } else if (code === 1002) {
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (error: any) {
      logger.error(error.message || '정기 모임 등록 api 요청 실패');
    }
  }

  /* 정기 모임 수정 api */
  async editClubMeeting(
    editClubMeetingData: ClubMeetingData,
    clubmeetingId: number,
  ): Promise<void> {
    try {
      const response = await Main.editClubMeeting(
        editClubMeetingData,
        clubmeetingId,
      );
      const { code, message } = response.data;
      if (code === 1000) {
        // API 호출 성공
        logger.log('정기 모임 게시글이 성공적으로 수정되었습니다.');
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '정기 모임 게시글을 수정하지 못했습니다.');
      } else if (code === 1002) {
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (error: any) {
      logger.error(error.message || '정기 모임 수정 api 요청 실패');
    }
  }

  /* 정기 모임 삭제 api */
  async deleteClubMeeting(clubmeetingId: number): Promise<void> {
    try {
      const response = await Main.deleteClubMeeting(clubmeetingId);
      const { code, message } = response.data;
      if (code === 1000) {
        // API 호출 성공
        logger.log('정기 모임이 성공적으로 삭제되었습니다.');
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '정기 모임을 삭제하지 못했습니다.');
      } else if (code === 1002) {
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (error: any) {
      logger.error(error.message || '정기 모임 삭제 api 요청 실패');
    }
  }
}
