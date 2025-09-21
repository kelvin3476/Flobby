import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchKeywordStore from '@/store/main/useSearchKeywordStore';
import { PopularKeywordData } from '@/api/ApiTypes';
import { SearchChallengeController } from '@/services/challenge/controllers/SearchChallengeController';

export default function useSearchBarHandlers() {
  const navigate = useNavigate();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();

  const [isTyping, setIsTyping] = useState(false);
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  const isResetButtonClicked = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [popularKeywordList, setPopularKeywordList] = useState<
    PopularKeywordData[]
  >([]);

  const challengeController = SearchChallengeController.getInstance();

  const getPopularKeywords = async () => {
    const popularKeywordData = await challengeController.getPopularKeywords();
    if (popularKeywordData) setPopularKeywordList(popularKeywordData);
  };

  useEffect(() => {
    getPopularKeywords();
  }, []);

  useEffect(() => {
    if (isOpenSearchModal) getPopularKeywords();
  }, [isOpenSearchModal]);

  const handleSubmitSearchForm = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (searchKeyword.length > 0) {
      console.log(searchKeyword, '검색어 제출!'); // test

      setSearchKeyword(''); /* input 필드 입력값 초기화 */
      inputRef.current?.blur();
      setIsTyping(false);
      setIsOpenSearchModal(false);

      /* 검색어가 있는 경우에만 검색 페이지로 이동 */
      navigate(`/club/search?keyword=${searchKeyword}`);
    }
  };

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleFocusSearchInput = () => {
    setIsTyping(searchKeyword.length > 0);
    setIsOpenSearchModal(true);
  };

  const handleBlurSearchInput = () => {
    if (isResetButtonClicked.current) {
      isResetButtonClicked.current = false;
      return;
    }
    setIsTyping(false);
  };

  const handleClickResetBtn = () => {
    isResetButtonClicked.current = true;

    setSearchKeyword('');
    setIsTyping(false);

    inputRef.current?.focus();
  };

  const handleMouseDownResetBtn = () => {
    isResetButtonClicked.current = true;
  };

  return {
    searchKeyword,
    isTyping,
    isOpenSearchModal,
    inputRef,
    popularKeywordList,

    handleSubmitSearchForm,
    handleChangeSearchInput,
    handleFocusSearchInput,
    handleBlurSearchInput,
    handleClickResetBtn,
    handleMouseDownResetBtn,
    setIsOpenSearchModal,
  };
}
