import React from "react";
import { useNavigate } from "react-router";

import Logo from "../logo/Logo";
import RegionSelector from "../main/region_selector/RegionSelector";
import TextButton from "../button/TextButton";
import SearchBar from "../main/search_bar/SearchBar";
import Button from "../button/Button";

import "../../styles/header/MainHeader.scss";

const MainHeader = () => {
  const nav = useNavigate();

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <div className="left-wrapper">
          <Logo />  
          <RegionSelector /> 
        </div>
        <div className="goto-btn-wrapper">
          <TextButton className="club-btn" buttonName="동호회" onClick={() => nav("/club")}/>
          <TextButton className="oneday-btn" buttonName="원데이" onClick={() => nav("/oneday")}/>
          <TextButton className="community-btn" buttonName="정보공유" onClick={() => nav("/community")}/>
        </div>
        <div className="right-wrapper">
          <SearchBar />
          <div className="btns-wrapper">
            <Button type="button" className="login-btn" title="로그인" onClick={() => nav("/")}/>
            <Button type="button" className="signup-btn" title="회원가입" onClick={() => nav("/signup/agreement")}/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;