import { PopularKeywordData } from '@/api/ApiTypes';
import SearchChallenge from '@/api/challenge/SearchChallenge';
import logger from '@/utils/Logger';

export class BaseSearchModel {
  popularKeywordList: PopularKeywordData[] = [];

  /* 인기 검색어 리스트 불러오는 api 호출 */
  async getPopularKeywords(): Promise<PopularKeywordData[]> {
    try {
      const response = await SearchChallenge.getPopularKeywords();
      const { code, message, data } = response.data;
      if (code === 1000) {
        this.popularKeywordList = data;
        return this.popularKeywordList;
      } else if (code === 1001) {
        throw new Error(message || '인기 검색어 리스트를 가져오지 못했습니다.');
      } else if (code === 1002) {
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (err: any) {
      logger.error(err.message || '인기 검색어 리스트 api 요청 실패');
    }
  }
}
