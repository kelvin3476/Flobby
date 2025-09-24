import { GetMyInfoResponse } from '@/api/ApiTypes';
import MyPage from '@/api/mypage/MyPage';

export class MyInfoModel {
  myInfoData: GetMyInfoResponse[] = [];

  async getMyInfo(): Promise<GetMyInfoResponse[]> {
    try {
      const response = await MyPage.getMyInfo();
      const { code, message, data } = response.data;

      if (code === 1000) {
        // API 호출 성공
        this.myInfoData = data;
        return this.myInfoData;
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
