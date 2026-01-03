import { ChallengeQnaResponse } from '@/api/ApiTypes';
import React from 'react';

import '@/styles/challenge/detail/ChallengeDetailQnaItem.scss';

interface ChallengeDetailQnaItemProps {
  challengeDetailQuestion: ChallengeQnaResponse;
}
const ChallengeDetailQnaItem = ({
  challengeDetailQuestion,
}: ChallengeDetailQnaItemProps) => {
  return (
    <div className="challenge-detail-qna-item-wrapper">
      {/* Q&A 컨테이너 */}
      <div className="challenge-detail-qna-item-content-container">
        {/* 질문 영역 */}
        <div className="challenge-detail-qna-item-question-container">
          <div className="challenge-detail-qna-item-question-mark-icon"></div>
          <div className="challenge-detail-qna-item-question-content">
            {challengeDetailQuestion.question}
          </div>
        </div>

        {/* 답변 영역 */}
        {challengeDetailQuestion.answer && (
          <div className="challenge-detail-qna-item-answer-container">
            <div className="challenge-detail-qna-item-answer-mark-icon"></div>
            <div className="challenge-detail-qna-item-answer-content">
              {challengeDetailQuestion.answer.answer}
            </div>
          </div>
        )}
      </div>

      {/* 답변 상태 컨테이너 */}
      <div className="challenge-detail-qna-item-answer-status-container">
        {challengeDetailQuestion.answer ? '답변 완료' : '답변 대기'}
      </div>
    </div>
  );
};

export default ChallengeDetailQnaItem;
