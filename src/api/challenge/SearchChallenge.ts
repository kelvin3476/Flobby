import { http } from '../../utils/Http';

export default class SearchChallenge {
  /* 챌린지 검색 */
  static async getSearchChallengeData(keyword: string) {
    return await http.get(`/challenge/search?keyword=${keyword}`);
  }
}
