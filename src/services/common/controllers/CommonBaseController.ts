import { GetHeaderInfoResponse } from '@/api/ApiTypes';
import { CommonBaseModel } from '@/services/common/models/CommonBaseModel';


export class CommonBaseController {
  private static instance: CommonBaseController;
  model: CommonBaseModel;

  private constructor() {
    this.model = new CommonBaseModel();
  }

  public static getInstance(): CommonBaseController {
    if (
      !CommonBaseController.instance ||
      CommonBaseController.instance === null ||
      CommonBaseController.instance === undefined
    ) {
      CommonBaseController.instance = new CommonBaseController();
    }
    return CommonBaseController.instance;
  }

  public async getHeaderInfo(): Promise<GetHeaderInfoResponse> {
    return await this.model.getHeaderInfo();
  }
}