import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { mentorshipService } from "../mentorship.service";

export const mentorshipKeys = {
  all: ["student", "mentorship"],

  overview: () => [...mentorshipKeys.all, "overview"],

  mentors: (params = {}) => [...mentorshipKeys.all, "mentors", params],

  requests: (params = {}) => [...mentorshipKeys.all, "requests", params],

  sessions: (params = {}) => [...mentorshipKeys.all, "sessions", params],

  mentor: (mentorId) => [...mentorshipKeys.all, "mentor", mentorId],
};

export function useMentorshipOverview() {
  return useQuery({
    queryKey: mentorshipKeys.overview(),
    queryFn: mentorshipService.getOverview,
    staleTime: 60 * 1000,
  });
}

export function useMentorshipRequests(params = {}) {
  return useQuery({
    queryKey: mentorshipKeys.requests(params),
    queryFn: () => mentorshipService.getRequests(params),
    staleTime: 30 * 1000,
  });
}

export function useMentorshipSessions(params = {}) {
  return useQuery({
    queryKey: mentorshipKeys.sessions(params),
    queryFn: () => mentorshipService.getSessions(params),
    staleTime: 30 * 1000,
  });
}

export function useRequestMentorship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => mentorshipService.requestMentorship(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mentorshipKeys.requests(),
      });

      queryClient.invalidateQueries({
        queryKey: mentorshipKeys.overview(),
      });
    },
  });
}

export function useUpdateMentorshipSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, payload }) =>
      mentorshipService.updateSession(sessionId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mentorshipKeys.all,
      });
    },
  });
}

export function useMentors(params = {}) {
  return useQuery({
    queryKey: mentorshipKeys.mentors(params),
    queryFn: () => mentorshipService.getMentors(params),
    staleTime: 60 * 1000,
  });
}

export function useMentor(mentorId) {
  return useQuery({
    queryKey: mentorshipKeys.mentor(mentorId),
    queryFn: () => mentorshipService.getMentor(mentorId),
    enabled: Boolean(mentorId),
    staleTime: 2 * 60 * 1000,
  });
}
