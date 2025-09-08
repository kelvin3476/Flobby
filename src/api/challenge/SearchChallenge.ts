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

  /* 인기 검색어 리스트(기본적으로 10개 정렬해서 넘어옴, 웹은 상위 5개만 노출) */
  static async getPopularKeywords() {
    return await http.get('/popular-keywords');
  }
}
