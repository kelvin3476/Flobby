import { CategoryListModel } from "../models/CategoryListModel";
import { HobbyCategory } from "../../../api/ApiTypes";

export class CategoryListController {
  private static instance: CategoryListController;
  model: CategoryListModel;

  private constructor() {
    this.model = new CategoryListModel();
  }

  public static getInstance(): CategoryListController {
    if (!CategoryListController.instance) {
      CategoryListController.instance = new CategoryListController();
    } 
    return CategoryListController.instance;
  }

  public async getCategoryList(): Promise<HobbyCategory[]> {
    return await this.model.getCategoryList();
  }
}