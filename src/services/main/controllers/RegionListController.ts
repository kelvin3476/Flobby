import { RegionItem } from '../../../api/ApiTypes';
import { RegionListModel } from '../models/RegionListModel';

export class RegionListController {
  private static instance: RegionListController;
  private model: RegionListModel;

  private constructor() {
    this.model = new RegionListModel();
  }

  static getInstance(): RegionListController {
    if (!RegionListController.instance) {
      RegionListController.instance = new RegionListController();
    }
    return RegionListController.instance;
  }

  async initialize(): Promise<void> {
    await this.model.init();
  }

  getRegionList(): Record<string, RegionItem[]> {
    return this.model.getRegionList();
  }
}
