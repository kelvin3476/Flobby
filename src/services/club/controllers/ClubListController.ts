import { ClubListItem } from '../../../api/ApiTypes';
import { ClubItemsListModel } from '../models/ClubListModel';

export class ClubItemsListController {
  private static instance: ClubItemsListController;
  model: ClubItemsListModel;

  private constructor() {
    this.model = new ClubItemsListModel();
  }

  static getInstance(): ClubItemsListController {
    if (!ClubItemsListController.instance) {
      ClubItemsListController.instance = new ClubItemsListController();
    }
    return ClubItemsListController.instance;
  }

  getClubList(category?: string): Promise<ClubListItem[]> {
    return this.model.getClubList(category);
  }
}
