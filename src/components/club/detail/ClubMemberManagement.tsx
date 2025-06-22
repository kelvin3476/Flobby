import React, { useState } from 'react';
import { ClubMemberListItem } from '../../../api/ApiTypes';
import ClubMemberItem from './ClubMemberItem';
import ClubModal from '../../modal/ClubModal';
import '../../../styles/club/detail/ClubMemberManagement.scss';

interface ClubMemberManagementProps {
  clubMemberList: ClubMemberListItem[];
  currentMembers: number;
  maxMembers: number;
  loginUserRole: string | null; // 현재 로그인 유저의 해당 모임에 대한 role
}

type ModalActionType = 
  | "TRANSFER_LEADER"
  | "REMOVE_MANAGER"
  | "KICK"
  | "REGISTER_MANAGER";

interface ModalState {
  type: ModalActionType;
  member: ClubMemberListItem;
  phase: "confirm" | "complete";
}

const getModalProps = (modal: ModalState | null) => {
  if (!modal) return;

  if (modal.phase === "confirm") {
    switch (modal.type) {
      case "TRANSFER_LEADER":
        return {
          mainMessage: "이 멤버에게 모임장 권한을 양도할까요?",
          subMessage: "양도 후, 현재 모임장은 운영진으로 자동 전환됩니다.",
          showIcon: true,
          iconType: "warn" as const,
          showCancelButton: true,
          confirmText: "양도하기",
          cancelText: "취소",
        };
      
      case "REMOVE_MANAGER": 
        return {
          mainMessage: "이 멤버의 운영진 권한을 해제할까요?",
          subMessage: "운영진 해제 시 해당 멤버는 일반 멤버로 전환되며\n운영 관련 권한이 모두 사라집니다.",
          showIcon: true,
          iconType: "warn" as const,
          showCancelButton: true,
          confirmText: "해제하기",
          cancelText: "취소",
        };

      case "KICK": 
        return {
          mainMessage: "이 멤버를 모임에서 강제 탈퇴시킬까요?",
          subMessage: "탈락된 멤버는 모임에 다시 가입할 수 없어요.",
          showIcon: true,
          iconType: "warn" as const,
          showCancelButton: true,
          confirmText: "강퇴하기",
          cancelText: "취소",
        };
      case "REGISTER_MANAGER": 
        return {
          mainMessage: "이 멤버를 운영진으로 등록할까요?",
          subMessage: "운영진은 멤버 관리, 공지 등록 권한을 갖습니다.",
          showIcon: true,
          iconType: "check" as const,
          showCancelButton: true,
          confirmText: "등록하기",
          cancelText: "취소",
        };
      default:
        return null;
    }
  }

  if (modal.phase === "complete") {
    switch (modal.type) {
      case "TRANSFER_LEADER":
        return {
          mainMessage: "모임장 권한이 양도되었어요.",
          showIcon: false,
          showCancelButton: false,
          confirmText: "확인",
        };

      case "REMOVE_MANAGER":
        return {
          mainMessage: "운영진 권한이 해제되었어요.",
          showIcon: false,
          showCancelButton: false,
          confirmText: "확인",
        };
      case "KICK":
        return {
          mainMessage: "멤버가 모임에서 탈퇴되었어요.",
          showIcon: false,
          showCancelButton: false,
          confirmText: "확인",
        };
      case "REGISTER_MANAGER":
        return {
          mainMessage: "운영진으로 등록되었어요.",
          showIcon: false,
          showCancelButton: false,
          confirmText: "확인",
        };
      default:
        return null;
    }
  }
  return null;
};

const ClubMemberManagement = ({
  clubMemberList,
  currentMembers,
  maxMembers,
  loginUserRole,
}: ClubMemberManagementProps) => {
  const [modal, setModal] = useState<ModalState | null>(null);

  /* 멤버 탭 최초 진입시 스크롤 최상단 고정 */
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleModalConfirm = async() => {
    if (modal?.phase === "confirm") {
      // 기능별 api 연동
      setModal((prev) => prev && { ...prev, phase: "complete" });
    } else if (modal?.phase === "complete") {
      setModal(null);
    }
  };

  const onClickButton = (type: ModalActionType, member: ClubMemberListItem) => {
    setModal({ type, member, phase: "confirm" });
  };

  return (
    <div className="club-member-management-container">
      {/* 타이틀 */}
      <div className="club-member-management-title">
        <span>모임 멤버</span>
        <div className="club-member-management-title-num-box">
          (<span>{currentMembers}</span>/{maxMembers})
        </div>
      </div>

      {/* 멤버 리스트 */}
      {/* 모임장 권한 */}
      {loginUserRole && loginUserRole === 'LEADER' && (
        <div className="club-member-management-list-container">
          {clubMemberList.map((memberItem, index) => {
            return (
              <div className="club-member-management-list-box">
                <div className="club-member-management-list">
                  {/* 아이템 영역 */}
                  <ClubMemberItem
                    clubMemberId={memberItem.clubMemberId}
                    nickname={memberItem.nickname}
                    role={memberItem.role}
                    profilePhoto={memberItem.profilePhoto}
                  />

                  {/* 버튼 영역 */}
                  {/* 모임장 권한: 모임장 양도, 운영진 해제, 강퇴*/}
                  {memberItem.role !== 'LEADER' && (
                    <div className="club-member-management-btn-container">
                      <button
                        type="button"
                        className="club-member-management-btn transfer-leader"
                        onClick={() => onClickButton("TRANSFER_LEADER", memberItem)}
                      >
                        모임장 양도
                      </button>

                      {/* 운영진: 운영진 해제 버튼 노출 / 일반 멤버: 등록 버튼 노출 */}
                      {memberItem.role === 'MANAGER' && (
                        <button
                          type="button"
                          className="club-member-management-btn remove-manager"
                          onClick={() => onClickButton("REMOVE_MANAGER", memberItem)}
                        >
                          운영진 해제
                        </button>
                      )}
                      {memberItem.role === 'MEMBER' && (
                        <button
                          type="button"
                          className="club-member-management-btn remove-manager"
                          onClick={() => onClickButton("REGISTER_MANAGER", memberItem)}
                        >
                          운영진 등록
                        </button>
                      )}

                      <button
                        type="button"
                        className="club-member-management-btn kick-member"
                        onClick={() => onClickButton("KICK", memberItem)}
                      >
                        강퇴
                      </button>
                    </div>
                  )}
                </div>

                {/* 구분선 */}
                <div
                  className={`divider ${clubMemberList.length - 1 === index ? 'last' : ''}`}
                ></div>
              </div>
            );
          })}
        </div>
      )}

      {/* 운영진 권한 */}
      {loginUserRole && loginUserRole === 'MANAGER' && (
        <div className="club-member-management-list-container">
          {clubMemberList.map((memberItem, index) => {
            return (
              <div className="club-member-management-list-box">
                <div className="club-member-management-list">
                  {/* 아이템 영역 */}
                  <ClubMemberItem
                    clubMemberId={memberItem.clubMemberId}
                    nickname={memberItem.nickname}
                    role={memberItem.role}
                    profilePhoto={memberItem.profilePhoto}
                  />

                  {/* 버튼 영역 */}
                  {/* 운영진 권한: 강퇴*/}
                  {memberItem.role === 'MEMBER' && (
                    <div className="club-member-management-btn-container">
                      {/* 모임장 & 운영진 공통 권한 */}
                      <button
                        type="button"
                        className="club-member-management-btn kick-member"
                        onClick={() => onClickButton("KICK", memberItem)}
                      >
                        강퇴
                      </button>
                    </div>
                  )}
                </div>

                {/* 구분선 */}
                <div
                  className={`divider ${clubMemberList.length - 1 === index ? 'last' : ''}`}
                ></div>
              </div>
            );
          })}
        </div>
      )}

      {/* 일반 사용자(비로그인 유저 & 모임 일반 멤버) 권한 */}
      {(loginUserRole === null || loginUserRole === 'MEMBER') && (
        <div className="club-member-management-list-container">
          {clubMemberList.map(memberItem => {
            return (
              <ClubMemberItem
                clubMemberId={memberItem.clubMemberId}
                nickname={memberItem.nickname}
                role={memberItem.role}
                profilePhoto={memberItem.profilePhoto}
                key={memberItem.clubMemberId}
              />
            );
          })}
        </div>
      )}
      {modal && (
        <ClubModal 
          {...getModalProps(modal)}
          onConfirm={handleModalConfirm}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default ClubMemberManagement;
