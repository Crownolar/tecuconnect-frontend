import {
  mentorshipStats,
  upcomingSession,
  mentors,
  recentSessions,
} from "../../../mocks/mentorship";

export const useMentorship = () => {
  return {
    mentorshipStats,
    upcomingSession,
    mentors,
    recentSessions,
    isLoading: false,
    error: null,
  };
};
