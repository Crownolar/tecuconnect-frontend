import { useQuery } from "@tanstack/react-query";
import { mentorProfileService } from "./profile.service";

export const mentorProfileKeys = {
  all: ["mentor", "profile"],
  profile: () => [...mentorProfileKeys.all, "me"],
  students: () => [...mentorProfileKeys.all, "students"],
  reviews: () => [...mentorProfileKeys.all, "reviews"],
  sessions: () => [...mentorProfileKeys.all, "sessions"],
  assessments: () => [...mentorProfileKeys.all, "assessments"],
};

const baseOptions = {
  staleTime: 30_000,
  refetchOnWindowFocus: false,
};

export function useMentorProfile() {
  return useQuery({
    queryKey: mentorProfileKeys.profile(),
    queryFn: mentorProfileService.getProfile,
    ...baseOptions,
  });
}

export function useMentorProfileStudents() {
  return useQuery({
    queryKey: mentorProfileKeys.students(),
    queryFn: mentorProfileService.getAssignedStudents,
    ...baseOptions,
  });
}

export function useMentorProfilePendingReviews() {
  return useQuery({
    queryKey: mentorProfileKeys.reviews(),
    queryFn: mentorProfileService.getPendingReviews,
    ...baseOptions,
  });
}

export function useMentorProfileSessions() {
  return useQuery({
    queryKey: mentorProfileKeys.sessions(),
    queryFn: mentorProfileService.getSessions,
    ...baseOptions,
  });
}

export function useMentorProfileAssessments() {
  return useQuery({
    queryKey: mentorProfileKeys.assessments(),
    queryFn: mentorProfileService.getAssessments,
    ...baseOptions,
  });
}
