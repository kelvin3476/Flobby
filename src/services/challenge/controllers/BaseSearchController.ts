import { PopularKeywordData } from '@/api/ApiTypes';
import { BaseSearchModel } from '@/services/challenge/models/BaseSearchModel';

export class BaseSearchController {
  private static instance: BaseSearchController;
  model: BaseSearchModel;

  private constructor() {
    this.model = new BaseSearchModel();
  }

  static getInstance(): BaseSearchController {
    if (!BaseSearchController.instance) {
      BaseSearchController.instance = new BaseSearchController();
    }
    return BaseSearchController.instance;
  }

  async getPopularKeywords(): Promise<PopularKeywordData[]> {
    const keywords = await this.model.getPopularKeywords();

    return keywords ? keywords.slice(0, 5) : [];
  }
}
