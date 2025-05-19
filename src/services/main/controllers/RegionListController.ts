import { RegionListModel } from '../models/RegionListModel';
import { RegionItem } from '../../../api/ApiTypes';

export class RegionListController {
  private static instance: RegionListController;
  model: RegionListModel;

  private constructor() {
    this.model = new RegionListModel();
    // @ts-ignore
    window.$rlc = this;
  }

  static getInstance(): RegionListController {
    if (
      !RegionListController.instance ||
      RegionListController.instance === null ||
      RegionListController.instance === undefined
    ) {
      RegionListController.instance = new RegionListController();
    }
    return RegionListController.instance;
  }

  async getRegionList(): Promise<Record<string, RegionItem[]>> {
    return await this.model.getRegionList();
  }
}
