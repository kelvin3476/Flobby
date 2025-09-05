import React from "react";
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

/*
    React.StrictMode 사용시 리렌더링이 일어나는 경우가 생김
    ex)
        ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        );
    주의 사항: StrictMode는 개발 모드에서만 활성화되며, 프로덕션 빌드에는 포함되지 않습니다.
    배포 시에는 StrictMode를 사용하지 않는 것을 권장합니다.
*/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);