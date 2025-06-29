import {
  clubItem,
  ClubItemDetail,
  ClubSearchItem,
  CreateClubMeetingData,
} from '../../../api/ApiTypes';
import { ClubModel } from '../models/ClubModel';

export class ClubController {
  private static instance: ClubController;
  model: ClubModel;

  private constructor() {
    this.model = new ClubModel();
  }

  static getInstance(): ClubController {
    if (!ClubController.instance) {
      ClubController.instance = new ClubController();
    }
    return ClubController.instance;
  }

  getClubList(category?: string): Promise<clubItem[]> {
    return this.model.getClubList(category);
  }

  createClub(createClubData: FormData): Promise<void> {
    return this.model.createClub(createClubData);
  }

  editClub(clubId: number, editClubData: FormData): Promise<void> {
    return this.model.editClub(clubId, editClubData);
  }

  selectClubDetail(clubId: number): Promise<ClubItemDetail> {
    return this.model.selectClubDetail(clubId);
  }

  searchClubList(searchKeyword?: string): Promise<ClubSearchItem> {
    return this.model.searchClubList(searchKeyword);
  }

  createClubMeeting(
    createClubMeetingData: CreateClubMeetingData,
    clubId: number,
  ): Promise<void> {
    return this.model.createClubMeeting(createClubMeetingData, clubId);
  }

  editClubMeeting(
    editClubMeetingData: CreateClubMeetingData,
    clubmeetingId: number,
  ): Promise<void> {
    return this.model.editClubMeeting(editClubMeetingData, clubmeetingId);
  }

  deleteClubMeeting(clubmeetingId: number): Promise<void> {
    return this.model.deleteClubMeeting(clubmeetingId);
  }
}
