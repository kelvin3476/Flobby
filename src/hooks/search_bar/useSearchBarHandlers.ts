import { useState } from 'react';
import useSearchKeyword from '../../store/main/useSearchKeyword';

export default function useSearchBarHandlers() {
  const { searchKeyword, setSearchKeyword } = useSearchKeyword();

  const [isTyping, setIsTyping] = useState(false);

  const handleSubmitSearchForm = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (searchKeyword.length > 0) {
      console.log(searchKeyword, '검색어 제출!'); // test

      // TODO: 검색 api 연결

      setIsTyping(false);
    }
  };

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    e.target.value.length > 0 ? setIsTyping(true) : setIsTyping(false);
  };

  const handleFocusSearchInput = () => {
    if (searchKeyword.length > 0) setIsTyping(true);
  };

  const handleBlurSearchInput = () => {
    setTimeout(() => {
      setIsTyping(false);
    }, 100);
  };

  const handleResetSearchKeyword = () => {
    setSearchKeyword('');
    setIsTyping(false);
  };

  return {
    searchKeyword,
    isTyping,
    handleSubmitSearchForm,
    handleChangeSearchInput,
    handleResetSearchKeyword,
    handleFocusSearchInput,
    handleBlurSearchInput,
  };
}
