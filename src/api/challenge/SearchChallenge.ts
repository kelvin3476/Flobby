import { http } from '../../utils/Http';
import { challengeSortType } from '../ApiTypes';

export default class SearchChallenge {
  /* 챌린지 검색 */
  static async getSearchChallengeData(
    keyword: string,
    sort: challengeSortType = 'popular',
  ) {
    return await http.get(`/challenge/search?keyword=${keyword}&sort=${sort}`);
  }

  /* 인기 검색어 리스트 */
  static async getPopularKeywords() {
    return await http.get('/popular-keywords');
  }
}
