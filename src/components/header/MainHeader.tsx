import React from "react";

import Logo from "../logo/Logo";
import RegionSelector from "../main/region_selector/RegionSelector";
import HeaderButton from "./HeaderButton";
import SearchBar from "../main/search_bar/SearchBar";
import Button from "../button/Button";

import "../../styles/header/MainHeader.scss";

const MainHeader = () => {
  return (
    <header className="header-container">
      <div className="header-wrapper">
        <div className="left-wrapper">
          <Logo />  
          <RegionSelector /> 
        </div>
        <div className="goto-btn-wrapper">
          <HeaderButton className="club-btn" buttonName="동호회"/>
          <HeaderButton className="oneday-btn" buttonName="원데이"/>
          <HeaderButton className="popular-btn" buttonName="정보공유"/>
        </div>
        <div className="right-wrapper">
          <SearchBar />
          <div className="btns-wrapper">
            <Button type="button" className="login-btn" title="로그인" onClick={() => {console.log("click!")}}/>
            <Button type="button" className="signup-btn" title="회원가입" onClick={() => {console.log("click!")}}/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;