import React, { useState } from 'react';

import Button from '@/components/button/Button';

import { ChallengeQnaResponse } from '@/api/ApiTypes';

import '@/styles/challenge/detail/ChallengeDetailQna.scss';
import ChallengeDetailQnaItem from './ChallengeDetailQnaItem';

interface ChallengeDetailQnaTypeProps {
  challengeDetailQuestions: ChallengeQnaResponse[];
}

const MAX_LENGTH = 200;

const ChallengeDetailQna = ({
  challengeDetailQuestions,
}: ChallengeDetailQnaTypeProps) => {
  const [isMyQuestion, setIsMyQuestion] = useState<string>('N');
  const [question, setQuestion] = useState<string>('');

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="challenge-detail-qna-wrapper">
      {/* Q&A 컨테이너 */}
      <div className="challenge-detail-qna-container">
        {/* Q&A 헤더 컨테이너 */}
        <div className="challenge-detail-qna-header-container">
          {/* Q&A 타이틀 컨테이너 */}
          <div className="challenge-detail-qna-title-container">
            <div className="challenge-detail-qna-main-title">
              이 챌린지에 궁금한게 있나요?
            </div>
            <div className="challenge-detail-qna-sub-title">
              챌린지장에게 직접 물어보세요!
            </div>
          </div>

          {/* 내 Q&A만 보기 버튼 */}
          <Button
            type="button"
            className={`challenge-detail-qna-my-question-btn ${isMyQuestion === 'Y' ? 'isMyQuestion' : ''}`}
            title="내 Q&A만 보기"
            onClick={() => {
              setIsMyQuestion(isMyQuestion === 'N' ? 'Y' : 'N');
            }}
          />
        </div>

        {/* Q&A 컨텐츠 컨테이너 */}
        <div className="challenge-detail-qna-content-container">
          {/* Q&A 컨텐츠 */}
          <div className="challenge-detail-qna-content-header">
            <div className="challenge-detail-qna-content-header-title-column">
              제목
            </div>
            <div className="challenge-detail-qna-content-header-title-answer-status-column">
              답변 상태
            </div>
          </div>

          {challengeDetailQuestions &&
            challengeDetailQuestions.map(question => (
              <ChallengeDetailQnaItem
                key={question.questionId}
                challengeDetailQuestion={question}
              />
            ))}
        </div>
      </div>

      {/* Q&A 인풋 컨테이너 */}
      <div className="challenge-detail-qna-input-container">
        {/* Q&A 인풋 입력창 */}
        <div className="input-wrap">
          <textarea
            id="challenge-detail-qna-textarea"
            value={question}
            maxLength={MAX_LENGTH}
            placeholder="질문을 입력해 주세요"
            onChange={handleChangeQuestion}
          />

          <span className="counter">
            {question.length} / {MAX_LENGTH}
          </span>
        </div>

        {/* Q&A 등록 버튼 */}
        <Button
          type="button"
          className="challenge-detail-qna-register-btn"
          title="등록"
          onClick={() => console.log('qna 등록 버튼 클릭 !!')}
        />
      </div>
    </div>
  );
};

export default ChallengeDetailQna;
