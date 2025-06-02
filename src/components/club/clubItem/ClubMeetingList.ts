interface ClubMeeting {
  meetingLeaderId: number;
  meetingId: number;
  clubMeetingTitle: string;
  clubMeetingDate: string;
  clubMeetingLocation: string;
  maxParticipants: number;
  currentParticipants: number;
  isApplied: boolean;
  dday: string;
}

const ClubMeetingList: ClubMeeting[] = [
  {
    meetingLeaderId: 12,
    meetingId: 1,
    clubMeetingTitle: '봄 산책 모임',
    clubMeetingDate: '25.02.04 (화)  오후 8:30',
    clubMeetingLocation: '서울숲',
    maxParticipants: 20,
    currentParticipants: 12,
    isApplied: true,
    dday: 'D-10',
  },
  {
    meetingLeaderId: 22,
    meetingId: 2,
    clubMeetingTitle: '여름 캠핑',
    clubMeetingDate: '25.02.04 (화)  오후 8:30',
    clubMeetingLocation: '가평 계곡',
    maxParticipants: 15,
    currentParticipants: 10,
    isApplied: false,
    dday: 'D-31',
  },
  {
    meetingLeaderId: 23,
    meetingId: 3,
    clubMeetingTitle: '독서 토론회',
    clubMeetingDate: '25.02.04 (화)  오후 8:30',
    clubMeetingLocation: '강남 도서관',
    maxParticipants: 10,
    currentParticipants: 7,
    isApplied: false,
    dday: 'D-15',
  },
  {
    meetingLeaderId: 46,
    meetingId: 4,
    clubMeetingTitle: '요리 클래스',
    clubMeetingDate: '25.02.04 (화)  오후 8:30',
    clubMeetingLocation: '홍대 쿠킹스튜디오',
    maxParticipants: 8,
    currentParticipants: 8,
    isApplied: false,
    dday: 'D-5',
  },
  {
    meetingLeaderId: 95,
    meetingId: 5,
    clubMeetingTitle: '사진 출사',
    clubMeetingDate: '25.02.04 (화)  오후 8:30',
    clubMeetingLocation: '한강 공원',
    maxParticipants: 25,
    currentParticipants: 13,
    isApplied: false,
    dday: 'D-20',
  },
];

export default ClubMeetingList;
