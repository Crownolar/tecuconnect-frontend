import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { mentorshipService } from "./mentorship.service";

export const mentorshipKeys = {
  all: ["mentor", "mentorship"],
  overview: () => [...mentorshipKeys.all, "overview"],
  requests: (params = {}) => [...mentorshipKeys.all, "requests", params],
  sessions: (params = {}) => [...mentorshipKeys.all, "sessions", params],
};


export function useMentorshipRequests(params = {}) {
  return useQuery({
    queryKey: mentorshipKeys.requests(params),
    queryFn: () => mentorshipService.getRequests(params),
    staleTime: 15 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useMentorshipSessions(params = {}) {
  return useQuery({
    queryKey: mentorshipKeys.sessions(params),
    queryFn: () => mentorshipService.getSessions(params),
    staleTime: 15 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useUpdateMentorshipRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, payload }) =>
      mentorshipService.updateRequest(requestId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mentorshipKeys.all });
    },
  });
}

export function useCreateMentorshipSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mentorshipService.createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mentorshipKeys.all });
    },
  });
}

export function useUpdateMentorshipSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, payload }) =>
      mentorshipService.updateSession(sessionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mentorshipKeys.all });
    },
  });
}
