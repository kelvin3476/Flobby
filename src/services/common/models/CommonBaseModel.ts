import { GetHeaderInfoResponse } from '@/api/ApiTypes';
import Common from '@/api/common/Common';
import Logger from '@/utils/Logger';

export class CommonBaseModel {
  headerInfo: GetHeaderInfoResponse

  async getHeaderInfo(): Promise<GetHeaderInfoResponse> {
    try {
      const response = await Common.getHeaderInfo();
      const { code, message, data } = response.data

      if (code === 1000) {
        // API 호출 성공
        Logger.log('헤더 정보 데이터 불러오기 성공', data)
        this.headerInfo = data
        return this.headerInfo;
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '데이터를 가져오지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (error: any) {
      console.error(error.message || '데이터 로드 실패');
      throw error;
    }
  }
}