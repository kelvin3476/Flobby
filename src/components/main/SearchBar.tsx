import React, { useState } from 'react';
import useSearchKeyword from '../../store/main/useSearchKeyword';

import '../../styles/main/search_bar/SearchBar.scss';

const SearchBar: React.FC = () => {
  const { searchKeyword, setSearchKeyword } = useSearchKeyword();

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSubmitSearchForm = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (searchKeyword.length > 0) {
      console.log(searchKeyword, '검색어 제출!'); // test용
      // TODO: 검색 api 연결

      setIsTyping(false);
    }
  };

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);

    e.target.value.length > 0 ? setIsTyping(true) : setIsTyping(false);
  };

  const handleResetSearchKeyword = () => {
    setSearchKeyword('');
    setIsTyping(false);
  };

  const handleFocusSearchInput = () => {
    searchKeyword.length > 0 && setIsTyping(true);
  };

  const handleBlurSearchInput = () => {
    setTimeout(() => {
      setIsTyping(false);
    }, 100);
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmitSearchForm}>
      <input
        className="search-bar-input"
        type="text"
        placeholder="검색어를 입력해 주세요."
        value={searchKeyword}
        onChange={handleChangeSearchInput}
        onFocus={handleFocusSearchInput}
        onBlur={handleBlurSearchInput}
        maxLength={50}
      />
      <div
        className={isTyping ? 'icon-reset' : ''}
        onClick={handleResetSearchKeyword}
      ></div>
      <div className="icon-search" onClick={handleSubmitSearchForm}></div>
    </form>
  );
};

export default SearchBar;
