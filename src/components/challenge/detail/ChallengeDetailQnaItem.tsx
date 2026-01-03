import { ChallengeQnaResponse } from '@/api/ApiTypes';
import React, { useEffect, useRef, useState } from 'react';

import '@/styles/challenge/detail/ChallengeDetailQnaItem.scss';

interface ChallengeDetailQnaItemProps {
  challengeDetailQuestion: ChallengeQnaResponse;
}
const ChallengeDetailQnaItem = ({
  challengeDetailQuestion,
}: ChallengeDetailQnaItemProps) => {
  const [isQuestionEdit, setIsQuestionEdit] = useState<boolean>(false);
  const [isAnswerEdit, setIsAnswerEdit] = useState<boolean>(false);
  const [isAnswerOpen, setAnswerOpen] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isChallengeMaster, setIsChallengeMaster] = useState<boolean>(false);
  const questionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const editAnswerTextareaRef = useRef<HTMLTextAreaElement>(null);
  const answerTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setQuestion(challengeDetailQuestion.question);

    if (challengeDetailQuestion.answer) {
      setAnswer(challengeDetailQuestion.answer.answer);
    }

    // TODO: 챌린지장인지 아닌지 여부 연동 필요
    setIsChallengeMaster(true);
  }, []);

  return (
    <div className="challenge-detail-qna-item-wrapper">
      {/* Q&A 컨테이너 */}
      <div className="challenge-detail-qna-item-content-container">
        {/* 질문 영역 */}
        <div className="challenge-detail-qna-item-question-container">
          {/* 질문 아이콘 */}
          <div className="challenge-detail-qna-item-question-mark-icon"></div>

          {!isQuestionEdit ? (
            <div className="challenge-detail-qna-item-question-content-container">
              {/* 질문 내용 */}
              <div className="challenge-detail-qna-item-question-content">
                {challengeDetailQuestion.question}
              </div>

              {/* 질문 수정 & 삭제 버튼 박스 */}
              {/* TODO: Q&A 수정 & 삭제 api 작업 후 연동 필요 */}
              {/* 내가 쓴 질문 */}
              {challengeDetailQuestion.isMyQuestion && (
                <div className="challenge-detail-qna-item-question-button-container">
                  {!challengeDetailQuestion.answer && (
                    <>
                      <div
                        className="challenge-detail-qna-item-question-edit-button"
                        onClick={() => setIsQuestionEdit(true)}
                      >
                        수정
                      </div>
                      <div className="divider"></div>
                    </>
                  )}
                  <div className="challenge-detail-qna-item-question-delete-button">
                    삭제
                  </div>
                </div>
              )}

              {/* 다른 사용자가 쓴 질문 */}
              {!challengeDetailQuestion.isMyQuestion && (
                <div className="challenge-detail-qna-item-question-button-container">
                  <div className="challenge-detail-qna-item-question-report-button">
                    신고
                  </div>
                  {isChallengeMaster && !challengeDetailQuestion.answer && (
                    <>
                      <div className="divider"></div>
                      <div
                        className="challenge-detail-qna-item-question-answer-button"
                        onClick={() => setAnswerOpen(true)}
                      >
                        답변
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* 질문 수정 모드 */
            <div className="challenge-detail-qna-item-question-content-edit-textarea-container">
              <textarea
                ref={questionTextareaRef}
                rows={1}
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
              <div
                className="challenge-detail-qna-item-question-edit-complete-button"
                onClick={() => setIsQuestionEdit(false)}
              >
                수정 완료
              </div>
            </div>
          )}
        </div>

        {/* 답변 영역 */}
        {/* TODO: 챌린지장 role 추가되면 연동 필요 */}
        {challengeDetailQuestion.answer && (
          <div className="challenge-detail-qna-item-answer-container">
            {/* 답변 아이콘 */}
            <div className="challenge-detail-qna-item-answer-mark-icon"></div>

            {!isAnswerEdit ? (
              <div className="challenge-detail-qna-item-answer-content-container">
                {/* 답변 내용 */}
                <div className="challenge-detail-qna-item-answer-content">
                  {challengeDetailQuestion.answer.answer}
                </div>

                {/* 답변 수정 & 삭제 버튼 박스 */}
                {isChallengeMaster && (
                  <div className="challenge-detail-qna-item-answer-button-container">
                    <div className="challenge-detail-qna-item-answer-button-container">
                      <div
                        className="challenge-detail-qna-item-answer-edit-button"
                        onClick={() => setIsAnswerEdit(true)}
                      >
                        수정
                      </div>
                      <div className="divider"></div>
                      <div className="challenge-detail-qna-item-answer-delete-button">
                        삭제
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* 답변 수정 모드 */
              <div className="challenge-detail-qna-item-answer-content-edit-textarea-container">
                <textarea
                  ref={editAnswerTextareaRef}
                  rows={1}
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                />
                <div
                  className="challenge-detail-qna-item-answer-edit-complete-button"
                  onClick={() => setIsAnswerEdit(false)}
                >
                  수정 완료
                </div>
              </div>
            )}
          </div>
        )}

        {!challengeDetailQuestion.answer &&
          isChallengeMaster &&
          isAnswerOpen && (
            <div className="challenge-detail-qna-item-answer-container">
              {/* 답변 아이콘 */}
              <div className="challenge-detail-qna-item-answer-mark-icon"></div>

              <div className="challenge-detail-qna-item-answer-textarea-container">
                <textarea
                  ref={answerTextareaRef}
                  rows={1}
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                />
                <div
                  className="challenge-detail-qna-item-answer-complete-button"
                  onClick={() => setAnswerOpen(false)}
                >
                  답변 완료
                </div>
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
