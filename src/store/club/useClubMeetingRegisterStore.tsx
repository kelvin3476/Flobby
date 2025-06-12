import { create } from 'zustand';

interface ClubMeetingRegisterStore {
  /* 정기모임 제목 */
  clubMeetingTitle: string;
  setClubMeetingTitle: (clubMeetingTitle: string) => void;

  isClubMeetingTitleValid: boolean;
  setIsClubMeetingTitleValid: (isClubMeetingTitleValid: boolean) => void;

  clubMeetingTitleError: string;
  setClubMeetingTitleError: (clubMeetingTitleError: string) => void;

  /* 정기모임 날짜 */
  clubMeetingDate: string;
  setClubMeetingDate: (clubMeetingDate: string) => void;

  isClubMeetingDateValid: boolean;
  setIsClubMeetingDateValid: (isClubMeetingDateValid: boolean) => void;

  clubMeetingDateError: string;
  setClubMeetingDateError: (clubMeetingDateError: string) => void;

  /* 정기모임 시간 */
  clubMeetingTime: string;
  setClubMeetingTime: (clubMeetingTime: string) => void;

  isClubMeetingTimeValid: boolean;
  setIsClubMeetingTimeValid: (isClubMeetingTimeValid: boolean) => void;

  clubMeetingTimeError: string;
  setClubMeetingTimeError: (clubMeetingTimeError: string) => void;

  /* 정기모임 장소 */
  clubMeetingLocation: string;
  setClubMeetingLocation: (clubMeetingLocation: string) => void;

  isClubMeetingLocationValid: boolean;
  setIsClubMeetingLocationValid: (isClubMeetingLocationValid: boolean) => void;

  clubMeetingLocationError: string;
  setClubMeetingLocationError: (clubMeetingLocationError: string) => void;

  /* 정기모임 인원 */
  maxParticipants: number;
  setMaxParticipants: (maxParticipants: number) => void;

  isMaxParticipantsValid: boolean;
  setIsMaxParticipantsValid: (isMaxParticipantsValid: boolean) => void;

  maxParticipantsError: string;
  setMaxParticipantsError: (maxParticipantsError: string) => void;

  /* 정기모임 참가비 */
  entryFee: string;
  setEntryFee: (entryFee: string) => void;

  isEntryFeeValid: boolean;
  setIsEntryFeeValid: (isEntryFeeValid: boolean) => void;

  entryFeeError: string;
  setEntryFeeError: (entryFeeError: string) => void;
}

const useClubMeetingRegisterStore = create<ClubMeetingRegisterStore>(set => ({
  clubMeetingTitle: '',
  setClubMeetingTitle: (clubMeetingTitle: string) => set({ clubMeetingTitle }),

  isClubMeetingTitleValid: true,
  setIsClubMeetingTitleValid: (isClubMeetingTitleValid: boolean) =>
    set({ isClubMeetingTitleValid }),

  clubMeetingTitleError: '',
  setClubMeetingTitleError: (clubMeetingTitleError: string) =>
    set({ clubMeetingTitleError }),

  clubMeetingDate: '',
  setClubMeetingDate: (clubMeetingDate: string) => set({ clubMeetingDate }),

  isClubMeetingDateValid: true,
  setIsClubMeetingDateValid: (isClubMeetingDateValid: boolean) =>
    set({ isClubMeetingDateValid }),

  clubMeetingDateError: '',
  setClubMeetingDateError: (clubMeetingDateError: string) =>
    set({ clubMeetingDateError }),

  clubMeetingTime: '',
  setClubMeetingTime: (clubMeetingTime: string) => set({ clubMeetingTime }),

  isClubMeetingTimeValid: true,
  setIsClubMeetingTimeValid: (isClubMeetingTimeValid: boolean) =>
    set({ isClubMeetingTimeValid }),

  clubMeetingTimeError: '',
  setClubMeetingTimeError: (clubMeetingTimeError: string) =>
    set({ clubMeetingTimeError }),

  clubMeetingLocation: '',
  setClubMeetingLocation: (clubMeetingLocation: string) =>
    set({ clubMeetingLocation }),

  isClubMeetingLocationValid: true,
  setIsClubMeetingLocationValid: (isClubMeetingLocationValid: boolean) =>
    set({ isClubMeetingLocationValid }),

  clubMeetingLocationError: '',
  setClubMeetingLocationError: (clubMeetingLocationError: string) =>
    set({ clubMeetingLocationError }),

  maxParticipants: 0,
  setMaxParticipants: (maxParticipants: number) => set({ maxParticipants }),

  isMaxParticipantsValid: true,
  setIsMaxParticipantsValid: (isMaxParticipantsValid: boolean) =>
    set({ isMaxParticipantsValid }),

  maxParticipantsError: '',
  setMaxParticipantsError: (maxParticipantsError: string) =>
    set({ maxParticipantsError }),

  entryFee: '',
  setEntryFee: (entryFee: string) => set({ entryFee }),

  isEntryFeeValid: true,
  setIsEntryFeeValid: (isEntryFeeValid: boolean) => set({ isEntryFeeValid }),

  entryFeeError: '',
  setEntryFeeError: (entryFeeError: string) => set({ entryFeeError }),
}));

export default useClubMeetingRegisterStore;
