import { PopularKeywordData, SearchChallengeData } from '../../../api/ApiTypes';
import { SearchChallengeModel } from '../models/SearchChallengeModel';

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

  getSearchChallengeData(keyword: string): Promise<SearchChallengeData[]> {
    return this.model.getSearchChallengeData(keyword);
  }

  getPopularKeywords(): Promise<PopularKeywordData[]> {
    return this.model.getPopularKeywords();
  }
}
