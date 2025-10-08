import { http } from '@/utils/Http';
import { ClubMeetingData } from '../ApiTypes';

export default class Main {
  /* 메인 페이지 (동호회, 원데이, 실시간 인기 게시글 데이터) 불러오기 */
  static async getMainData() {
    return await http.get(`/flobby/main`);
  }

  /* 모임 게시글 생성 */
  static async createClub(createClubData: FormData) {
    return await http.post(`/club/register`, createClubData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /* 모임 게시글 수정 */
  static async editClub(clubId: number, editClubData: FormData) {
    return await http.put(`/club/edit/${clubId}`, editClubData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /* 모임 게시글 삭제 */
  static async deleteClub(clubId: number) {
    return await http.post(`/club/delete`, clubId);
  }

  /* 모임 상세 조회 */
  static async getClubDetail(clubId: number) {
    return await http.get(`/club/${clubId}`);
  }

  /* 모임 목록 조회 */
  static async getChallengeList(mainCategory?: string) {
    return mainCategory
      ? await http.get(`/club/list?mainCategory=${mainCategory}`)
      : await http.get(`/club/list`);
  }

  /* 모임 검색 조회 */
  static async searchClubList(searchKeyword?: string) {
    return await http.get(`/club/search?keyword=${searchKeyword}`);
  }

  /* 모임 가입 신청 */
  static async applyClub(clubId: number) {
    return await http.post(`/club/apply`, clubId);
  }

  /* 모임 신고 */
  static async reportClub(clubId: number, reportReason: string) {
    return await http.post(`/club/report`, { clubId, reportReason });
  }

  /* 모임 탈퇴 사유 리스트 */
  static async getLeaveClubReasonList() {
    return await http.get(`/club/leave/start`);
  }

  /* 모임 탈퇴 신청 */
  static async leaveClub(clubId: number, reason: string) {
    return await http.post(`/club/leave`, { clubId, reason });
  }

  /* 모임 멤버 강퇴 */
  static async banClubMember(clubId: number, memberId: number) {
    return await http.post(`/club/ban`, { clubId, memberId });
  }

  /* 정기 모임 생성 */
  static async createClubMeeting(
    createClubMeetingData: ClubMeetingData,
    clubId: number,
  ) {
    return await http.post(
      `/club/${clubId}/clubmeeting/register`,
      createClubMeetingData,
    );
  }

  /* 정기 모임 수정 */
  static async editClubMeeting(
    editClubMeetingData: ClubMeetingData,
    clubmeetingId: number,
  ) {
    return await http.put(
      `/clubmeeting/edit/${clubmeetingId}`,
      editClubMeetingData,
    );
  }

  /* 정기 모임 삭제 */
  static async deleteClubMeeting(clubmeetingId: number) {
    return await http.patch(`/clubmeeting/delete/${clubmeetingId}`);
  }

  /* 정기 모임 참여 */
  static async participationClubMeeting(clubmeetingId: number) {
    return await http.post(`/clubmeeting/${clubmeetingId}/participation`);
  }

  /* 정기 모임 취소 */
  static async cancelClubMeeting(clubmeetingId: number) {
    return await http.patch(`/clubmeeting/${clubmeetingId}/cancel`);
  }

  /* 모임장 양도 */
  static async leaderChange(clubId: number, memberId: number) {
    return await http.post(`/club/leader/change`, { clubId, memberId });
  }

  /* 운영진 등록 */
  static async assignManager(clubId: number, memberId: number) {
    return await http.post(`/club/manager/assign`, { clubId, memberId });
  }

  /* 운영진 해제 */
  static async revokeManager(clubId: number, memberId: number) {
    return await http.post(`/club/manager/revoke`, { clubId, memberId });
  }
}
