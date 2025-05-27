import { HobbyCategory } from '../../../api/ApiTypes';
import SignUp from '../../../api/signup/SignUp';
import logger from '../../../utils/Logger';

export const CategorySlugMap: Record<string, string> = {
  전체: 'entire',
  스포츠: 'sports',
  언어: 'language', // TODO: 백에서 DB 수정되면 삭제
  음악: 'music',
  예술: 'art',
  여행: 'travel',
  '기타 여가': 'leisure',
  자기계발: 'self-improvement',
};

export class CategoryListModel {
  categoryList: HobbyCategory[] = [];

  async getCategoryList(): Promise<HobbyCategory[]> {
    try {
      const response = await SignUp.getHobbyList();
      const { code, message, data } = response.data;

      if (code === 1000) {
        // API 호출 성공
        logger.log('categoryList response.data', data);
        this.categoryList = data;
        return this.categoryList;
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '데이터를 가져오지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.log(err.message || '데이터 로드 실패');
    }
  }
}
