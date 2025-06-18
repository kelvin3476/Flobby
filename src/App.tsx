import React from "react";
import Router from "./routes/Router";
import useMainPage from "./hooks/main/useMainPage";
import './App.css';

function App() {
  const { accessToken, isAuthenticated, reGenerateAccessToken, calculateRemainingTime, handleRefresh } = useMainPage();

  /* accessToken 만료 1분전 자동 재발급 처리 */
  React.useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    const remainingTime = calculateRemainingTime();
    if (remainingTime === null) return; // 만료 시간 계산 실패 시 아무 작업도 하지 않음

    /* 1분 (60000ms) 남았을 때 재발급 */
    if (remainingTime * 1000 <= 60000) {
      reGenerateAccessToken();
    }
  }, [accessToken, isAuthenticated]);

  /* 새로고침 시 호출되는 함수 */
  React.useEffect(() => {
    /* 새로고침 시 실행 */
    if ((performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type === "reload") handleRefresh();
  }, []);

  return <Router />;
}

export default App;
