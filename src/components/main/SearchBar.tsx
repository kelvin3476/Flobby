import React, { useState } from 'react';
import useSearchKeyword from '../../store/main/useSearchKeyword';

import '../../styles/main/search_bar/SearchBar.scss';
import useSearchBarHandlers from '../../hooks/search_bar/useSearchBarHandlers';

const SearchBar: React.FC = () => {
  const {
    searchKeyword,
    isTyping,
    handleSubmitSearchForm,
    handleChangeSearchInput,
    handleResetSearchKeyword,
    handleFocusSearchInput,
    handleBlurSearchInput,
  } = useSearchBarHandlers();

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
