import { ClubListItem, ClubItemDetail } from '../../../api/ApiTypes';
import Main from '../../../api/main/Main';

export class ClubModel {
  clubListData: ClubListItem[] = [];
  ClubItemDetailData: ClubItemDetail;

  async getClubList(mainCategory?: string): Promise<ClubListItem[]> {
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
      console.log(err.message || '데이터 로드 실패');
    }
  }

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
      console.error(error.message || '데이터 로드 실패');
    }
  }
}
