import {
  PopularKeywordData,
  challengeSortType,
  getSearchChallengeResponse,
} from '@/api/ApiTypes';
import { SearchChallengeModel } from '@/services/challenge/models/SearchChallengeModel';

export class SearchChallengeController {
  private static instance: SearchChallengeController;
  model: SearchChallengeModel;

  private constructor() {
    this.model = new SearchChallengeModel();
  }

  static getInstance(): SearchChallengeController {
    if (!SearchChallengeController.instance) {
      SearchChallengeController.instance = new SearchChallengeController();
    }
    return SearchChallengeController.instance;
  }

  getSearchChallengeData(
    keyword: string,
    sort: challengeSortType = 'popular',
  ): Promise<getSearchChallengeResponse> {
    return this.model.getSearchChallengeData(keyword, sort);
  }

  getPopularKeywords(): Promise<PopularKeywordData[]> {
    return this.model.getPopularKeywords();
  }
}
