import { http } from '@/utils/Http';

export default class Challenge {
  /* 챌린지 모집글 (상세) */
  static async getChallengeDetail(challengeId: number) {
    return await http.get(`/challenge/recruit/${challengeId}`);
  }

  /* 챌린지 리뷰 (후기) */
  static async getChallengeReview(challengeId: number) {
    return await http.get(`/${challengeId}/reviews`)
  }
}