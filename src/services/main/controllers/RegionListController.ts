import { RegionListModel } from '../models/RegionListModel';

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

  async getRegionList() {
    return await this.model.getRegionList();
  }
}
