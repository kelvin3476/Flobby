import { ClubListItem, ClubItemDetail } from '../../../api/ApiTypes';
import { ClubModel } from '../models/ClubModel';

export class ClubController {
  private static instance: ClubController;
  model: ClubModel;

  private constructor() {
    this.model = new ClubModel();
  }

  static getInstance(): ClubController {
    if (!ClubController.instance) {
      ClubController.instance = new ClubController();
    }
    return ClubController.instance;
  }

  getClubList(category?: string): Promise<ClubListItem[]> {
    return this.model.getClubList(category);
  }

  selectClubDetail(clubId: number): Promise<ClubItemDetail> {
    return this.model.selectClubDetail(clubId);
  }
}
