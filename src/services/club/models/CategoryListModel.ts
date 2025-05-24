import { HobbyCategory } from "../../../api/ApiTypes";
import SignUp from "../../../api/signup/SignUp";
import logger from "../../../utils/Logger";

export class CategoryListModel {
  categoryList: HobbyCategory[] = [];

  async getCategoryList(): Promise<HobbyCategory[]> {

    try {
      const response = await SignUp.getHobbyList();
      const { code, message, data } = response.data;

      if (code === 1000) {
        // API 호출 성공
        logger.log(data);
        const formattedData: HobbyCategory[] = [];

        data.forEach((item: any) => {
          const subItems: string[] = [];

          if (Array.isArray(item.subCategories)) {
            item.subCategories.forEach((subItem: any) => {
              if (typeof subItem === 'string') {
                subItems.push(subItem);
              } else if (typeof subItem === 'object' && subItem.subCategories) {
                subItems.push(...subItem.subCategories);
              }
            });
          }

          formattedData.push({
            mainCategory: item.mainCategory,
            subCategories: subItems,
          });
        });

        this.categoryList = formattedData;
        return this.categoryList;

      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || "데이터를 가져오지 못했습니다.");
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || "서버 오류가 발생했습니다.");
      }
    } catch (err: any) {
      console.log(err.message || "데이터 로드 실패");
    }
  }
}