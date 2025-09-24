import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Tag from '@/components/tag/Tag';
import Button from '@/components/button/Button';
import DropDownModal from '@/components/modal/DropDownModal';
import ClubModal from '@/components/modal/ClubModal';
import ClubTextModal from '@/components/modal/ClubTextModal';
import ClubSelectModal from '@/components/modal/ClubSelectModal';

import Main from '@/api/main/Main';

import '@/styles/club/detail/DetailInfo.scss';

interface DetailInfoProps {
  accessToken: string | null;
  clubId: string;
  loginUserRole: string | null;
  isMember: boolean;
  clubName: string;
  location: string;
  currentMembers: number;
  maxMembers: number;
  clubImage: string;
  subCategory: string;
  fetchClubDetail: () => Promise<void>;
}

const DetailInfo = ({
  accessToken,
  clubId,
  loginUserRole,
  isMember,
  clubName,
  location,
  currentMembers,
  maxMembers,
  clubImage,
  subCategory,
  fetchClubDetail,
}: DetailInfoProps) => {
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const [modalStep, setModalStep] = useState<
    null | 'text' | 'confirm' | 'complete' | 'select'
  >(null);
  const [modalMode, setModalMode] = useState<
    null | 'greeting' | 'report' | 'leave' | 'full'
  >(null);
  const [reason, setReason] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const nav = useNavigate();
  const { clubIds } = useParams<{ clubIds: string }>();

  let optionItems: string[] = [];
  if (loginUserRole === 'LEADER') {
    // 모임장일 경우
    optionItems = ['모임 수정', '정기 모임 등록', '멤버 관리'];
  } else if (isMember && loginUserRole !== null) {
    // 운영진 포함 모임 가입자의 경우
    optionItems = ['정기 모임 등록', '모임 신고', '모임 탈퇴'];
  } else {
    // 모임 미가입자의 경우
    optionItems = ['모임 신고'];
  }

  const handleItemClick = (item: string) => {
    switch (item) {
      case '모임 수정':
        nav('/club/edit', { state: clubId });
        break;
      case '정기 모임 등록':
        nav(`/club/${clubIds}/clubmeeting/register`);
        break;
      case '멤버 관리':
        nav('/club/member/manage');
        break;
      case '모임 신고':
        if (!accessToken) {
          nav('/login');
          return;
        }
        setModalMode('report');
        setModalStep('text');
        break;
      case '모임 탈퇴':
        setModalMode('leave');
        setModalStep('select');
        break;
    }
  };

  const handleModalSubmit = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (modalMode === 'greeting') {
        const response = await Main.applyClub(Number(clubId));
        const { code, message } = response.data;
        if (code === 1000) {
          /* 모임 가입 신청 후 성공 케이스 */
          setModalStep('complete');
        } else if (code === 1001) {
          if (message === '정원이 모두 찼어요.') {
            /* 동시성 이슈로 인해 모임 가입 신청 후 정원이 가득 찬 경우 */
            setModalMode('full');
          } else {
            /* TODO: 실패 케이스 모달 문구 및 연동 필요 (추후 작업이 필요함) */
          }
        }
      } else if (modalMode === 'report') {
        const response = await Main.reportClub(Number(clubId), reason);
        const { code } = response.data;
        if (code === 1000) {
          /* 모임 신고 후 성공 케이스 */
          setModalStep('complete');
        } else {
          /* TODO: 실패 케이스 모달 문구 및 연동 필요 (추후 작업이 필요함) */
        }
      } else if (modalMode === 'leave') {
        const response = await Main.leaveClub(Number(clubId), reason);
        const { code } = response.data;
        if (code === 1000) {
          /* 모임 탈퇴 신청 후 성공 케이스 */
          setModalStep('complete');
        } else {
          /* TODO: 실패 케이스 모달 문구 및 연동 필요 (추후 작업이 필요함) */
        }
      }
    } catch (error) {
      console.error('모임 처리 중 오류 발생:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="detail-info-container">
      <img src={clubImage} alt="club-detail-info-image" />
      <div className="detail-info-content">
        <div className="info-content-form">
          <div className="info-content-items">
            <Tag label={subCategory} type="challenge" color="purple" />
            <div className="info-items-btns">
              <button className="items-btns-heart"></button>
              <button
                className="items-btns-option"
                onClick={() => setIsOptionClicked(prev => !prev)}
              ></button>
            </div>
          </div>
          <div className="info-content-titles">
            <div className="info-content-club-name">{clubName}</div>
            <div className="info-content-inner">
              <div className="titles-inner-location-container">
                <span className="titles-inner-location-icon"></span>
                <span className="titles-inner-location">{location}</span>
              </div>

              <span className="info-content-divider-icon"></span>

              <div className="titles-inner-current-members-container">
                <span className="titles-inner-member-icon"></span>
                <div className="titles-inner-member-container">
                  <span className="titles-inner-member-count">
                    <span className="titles-inner-member-number">
                      {currentMembers}
                    </span>
                    /{maxMembers}
                  </span>
                  <span className="titles-inner-member-postfix">명</span>
                </div>
              </div>
            </div>
          </div>
          {isOptionClicked && (
            <DropDownModal
              className="club-detail-option-modal"
              items={optionItems}
              onItemClick={handleItemClick}
            />
          )}
        </div>
        {loginUserRole === null ? (
          <Button
            type="button"
            className="info-content-btn-yes"
            onClick={() => {
              if (!accessToken) {
                nav('/login');
                return;
              }
              if (currentMembers >= maxMembers) {
                setModalMode('full');
                setModalStep('confirm');
                return;
              }
              setModalMode('greeting');
              setModalStep('text');
            }}
            title="가입 신청하기"
          />
        ) : (
          <Button
            type="button"
            className="info-content-btn-no"
            onClick={() => {}}
            title="가입된 모임이에요!"
          />
        )}
      </div>

      {modalStep === 'text' &&
        (modalMode === 'greeting' || modalMode === 'report') && (
          <ClubTextModal
            type={modalMode}
            title={
              modalMode === 'greeting'
                ? '가입 인사를 작성해 주세요!'
                : '신고하려는 이유가 무엇인가요?'
            }
            onClose={() => {
              setModalStep(null);
              setModalMode(null);
            }}
            onSubmit={(value: string) => {
              setReason(value);
              setModalStep('confirm');
            }}
          />
        )}

      {modalStep === 'select' && modalMode === 'leave' && (
        <ClubSelectModal
          title="모임을 탈퇴하려는 이유를 알려주세요!"
          onClose={() => {
            setModalStep(null);
            setModalMode(null);
          }}
          onSubmit={value => {
            setModalStep('confirm');
            setReason(value);
          }}
        />
      )}

      {modalStep === 'confirm' && modalMode === 'full' && (
        <ClubModal
          mainMessage="정원이 모두 찼어요."
          subMessage="자리가 생기면 알림을 보내드릴까요?"
          showIcon={true}
          iconType="warn"
          showCancelButton={true}
          confirmText="알림 받기"
          cancelText="닫기"
          onConfirm={() => {
            /* TODO: 알림 기능 MVP 이후 구현 예정 */
            setModalStep(null);
            setModalMode(null);
          }}
          onCancel={() => {
            setModalStep(null);
            setModalMode(null);
          }}
          isLoading={isProcessing}
        />
      )}

      {(modalStep === 'confirm' || modalStep === 'complete') &&
        modalMode &&
        modalMode !== 'full' && (
          <ClubModal
            mainMessage={
              modalStep === 'confirm'
                ? modalMode === 'greeting'
                  ? '모임에 가입할까요?'
                  : modalMode === 'report'
                    ? '모임을 신고할까요?'
                    : '모임을 탈퇴할까요?'
                : modalMode === 'greeting'
                  ? '모임 가입이 완료되었어요!'
                  : modalMode === 'report'
                    ? '모임 신고가 완료되었어요!'
                    : '모임 탈퇴가 완료되었어요!'
            }
            subMessage={
              modalStep === 'confirm'
                ? modalMode === 'greeting'
                  ? '작성하신 가입 인사는 모임 게시판에 업로드됩니다.'
                  : modalMode === 'leave'
                    ? '모임을 탈퇴해도 내가 등록한 게시글은 삭제되지 않아요.'
                    : undefined
                : undefined
            }
            showIcon={modalStep === 'confirm'}
            iconType={modalMode === 'greeting' ? 'check' : 'warn'}
            showCancelButton={modalStep === 'confirm'}
            onConfirm={async () => {
              if (modalStep === 'confirm') {
                await handleModalSubmit();
              } else if (modalStep === 'complete') {
                await fetchClubDetail();
                setModalStep(null);
                setModalMode(null);
              }
            }}
            onCancel={() => setModalStep(null)}
            isLoading={isProcessing}
          />
        )}
    </div>
  );
};

export default DetailInfo;
