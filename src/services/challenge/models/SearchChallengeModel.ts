import {
  challengeSortType,
  PopularKeywordData,
  getSearchChallengeResponse,
} from '@/api/ApiTypes';
import SearchChallenge from '@/api/challenge/SearchChallenge';
import logger from '@/utils/Logger';
import { BaseSearchModel } from '@/services/challenge/models/BaseSearchModel';

export class SearchChallengeModel extends BaseSearchModel {
  searchChallengeData: getSearchChallengeResponse;

  /* 챌린지 검색 결과 불러오는 api */
  async getSearchChallengeData(
    keyword: string,
    sort: challengeSortType = 'popular',
  ): Promise<getSearchChallengeResponse> {
    try {
      const response = await SearchChallenge.getSearchChallengeData(
        keyword,
        sort,
      );
      const { code, message, data } = response.data;
      if (code === 1000) {
        this.searchChallengeData = data;

        return this.searchChallengeData;
      } else if (code === 1001) {
        throw new Error(message || '검색 결과를 가져오지 못했습니다.');
      } else if (code === 1002) {
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (err: any) {
      logger.error(err.message || '챌린지 검색 결과 api 요청 실패');
    }
  }

  async getPopularKeywords(): Promise<PopularKeywordData[]> {
    await super.getPopularKeywords();
    return this.popularKeywordList;
  }
}
