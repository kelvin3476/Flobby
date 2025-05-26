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

        this.categoryList = data;
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