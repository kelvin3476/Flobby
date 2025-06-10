import { useRef, useState } from 'react';
import useSearchKeywordStore from '../../store/main/useSearchKeywordStore';

export default function useSearchBarHandlers() {
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();

  const [isTyping, setIsTyping] = useState(false);

  const isResetButtonClicked = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitSearchForm = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (searchKeyword.length > 0) {
      console.log(searchKeyword, '검색어 제출!'); // test

      /* 검색시 CustomEvent를 사용하여 검색어 전달 */
      window.dispatchEvent(new CustomEvent('clubSearch', { detail: { searchKeyword: searchKeyword } }));

      inputRef.current?.blur();
      setIsTyping(false);
    }
  };

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleFocusSearchInput = () => {
    setIsTyping(searchKeyword.length > 0);
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
    inputRef,

    handleSubmitSearchForm,
    handleChangeSearchInput,
    handleFocusSearchInput,
    handleBlurSearchInput,
    handleClickResetBtn,
    handleMouseDownResetBtn,
  };
}
