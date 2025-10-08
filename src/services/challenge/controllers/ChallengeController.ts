import {
  ClubItemDetail,
  ClubSearchItem,
  ClubMeetingData,
  ChallengeItem,
} from '@/api/ApiTypes';
import { ChallengeModel } from '@/services/challenge/models/ChallengeModel';

export class ChallengeController {
  private static instance: ChallengeController;
  model: ChallengeModel;

  private constructor() {
    this.model = new ChallengeModel();
  }

  static getInstance(): ChallengeController {
    if (!ChallengeController.instance) {
      ChallengeController.instance = new ChallengeController();
    }
    return ChallengeController.instance;
  }

  getChallengeList(category?: string): Promise<ChallengeItem[]> {
    return this.model.getChallengeList(category);
  }

  createClub(createClubData: FormData): Promise<void> {
    return this.model.createClub(createClubData);
  }

  editClub(clubId: number, editClubData: FormData): Promise<void> {
    return this.model.editClub(clubId, editClubData);
  }

  deleteClub(clubId: number): Promise<void> {
    return this.model.deleteClub(clubId);
  }

  selectClubDetail(clubId: number): Promise<ClubItemDetail> {
    return this.model.selectClubDetail(clubId);
  }

  searchClubList(searchKeyword?: string): Promise<ClubSearchItem> {
    return this.model.searchClubList(searchKeyword);
  }

  createClubMeeting(
    createClubMeetingData: ClubMeetingData,
    clubId: number,
  ): Promise<void> {
    return this.model.createClubMeeting(createClubMeetingData, clubId);
  }

  editClubMeeting(
    editClubMeetingData: ClubMeetingData,
    clubmeetingId: number,
  ): Promise<void> {
    return this.model.editClubMeeting(editClubMeetingData, clubmeetingId);
  }

  deleteClubMeeting(clubmeetingId: number): Promise<void> {
    return this.model.deleteClubMeeting(clubmeetingId);
  }
}
