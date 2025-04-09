import { useEffect } from 'react';
import SignUp from '../../api/signup/SignUp';
import useRegionListStore from '../../store/main/useRegionListStore';

const useFetchRegions = () => {
  const { regionList, setRegionList } = useRegionListStore();

  // TODO: api 수정 예정(서울 전체 포함, 지역 코드도 넘어올 예정)
  useEffect(() => {
    const fetchRegions = async () => {
      if (Object.keys(regionList).length > 0) {
        return;
      }

      try {
        const response = await SignUp.getRegionList();
        const { code, message, data } = response.data;

        if (code === 1000) {
          // API 호출 성공
          setRegionList(data);
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
    };

    fetchRegions();
  }, []);

  return {
    regionList,
  };
};

export default useFetchRegions;
