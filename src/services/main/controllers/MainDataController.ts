import { MainDataModel } from '@/services/main/models/MainDataModel';
import { MainData } from '@/api/ApiTypes';

export class MainDataController {
  private static instance: MainDataController;
  model: MainDataModel;

  private constructor() {
    this.model = new MainDataModel();
  }

  static getInstance(): MainDataController {
    if (
      !MainDataController.instance ||
        MainDataController.instance === null ||
        MainDataController.instance === undefined
    ) {
      MainDataController.instance = new MainDataController();
    }
    return MainDataController.instance;
  }

  /* 메인 데이터 가져오기 */
  async getMainData(): Promise<MainData> {
    return await this.model.getMainData();
  }
}
