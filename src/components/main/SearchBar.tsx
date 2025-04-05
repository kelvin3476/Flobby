import React, { useRef, useState } from 'react';

import useSearchBarHandlers from '../../hooks/search_bar/useSearchBarHandlers';

import '../../styles/main/search_bar/SearchBar.scss';

const SearchBar: React.FC = () => {
  const {
    searchKeyword,
    isTyping,
    inputRef,

    handleSubmitSearchForm,
    handleChangeSearchInput,
    handleFocusSearchInput,
    handleBlurSearchInput,
    handleClickResetBtn,
    handleMouseDownResetBtn,
  } = useSearchBarHandlers();

  return (
    <form className="search-bar-form" onSubmit={handleSubmitSearchForm}>
      <input
        ref={inputRef}
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
        onClick={handleClickResetBtn}
        onMouseDown={handleMouseDownResetBtn}
      ></div>
      <div className="icon-search" onClick={handleSubmitSearchForm}></div>
    </form>
  );
};

export default SearchBar;
