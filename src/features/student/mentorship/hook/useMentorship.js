import {
  mentorshipStats,
  upcomingSession,
  mentors,
  recentSessions,
} from "../mentorship.data";

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