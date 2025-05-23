import { ClubListItem } from '../../api/ApiTypes';
import Main from '../../api/main/Main';
import logger from '../../utils/Logger';

export class ClubItemsListModel {
  clubListData: ClubListItem[] = [];

  async getClubList(category?: string): Promise<ClubListItem[]> {
    try {
      const response = await Main.getClubList(category);
      const { code, message, data } = response.data;
      if (code === 1000) {
        // API 호출 성공
        logger.log(data);
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
}
