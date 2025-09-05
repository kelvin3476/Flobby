import { MainData } from '@/api/ApiTypes';
import Main from '@/api/main/Main';
import logger from '@/utils/Logger';

export class MainDataModel {
  /* 메인 데이터 초기값 */
  mainData: MainData = {
    clubItems: [],
    onedayItems: [],
    boardItems: [],
  };

  /* 메인 데이터 api 호출 */
  async getMainData(): Promise<MainData> {
    try {
      const response = await Main.getMainData();

      const { code, message, data } = response.data;

      if (code === 1000) {
        // API 호출 성공
        logger.log('메인 데이터 가져오기 성공', data);
        this.mainData = data;
        logger.log('메인 데이터', this.mainData);

        return this.mainData;
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '메인 데이터를 가져오지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.log(err.message || '데이터 로드 실패');
    }
  }
}
