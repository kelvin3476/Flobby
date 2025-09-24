import { GetMyInfoResponse } from '@/api/ApiTypes';
import { MyInfoModel } from '../models/MyInfoModel';

export class MyInfoController {
  private static instance: MyInfoController;
  model: MyInfoModel;

  private constructor() {
    this.model = new MyInfoModel();
  }

  public static getInstance(): MyInfoController {
    if (
      !MyInfoController.instance ||
      MyInfoController.instance === null ||
      MyInfoController.instance === undefined
    ) {
      MyInfoController.instance = new MyInfoController();
    }
    return MyInfoController.instance;
  }

  public async getMyInfo(): Promise<GetMyInfoResponse[]> {
    return await this.model.getMyInfo();
  }
}
