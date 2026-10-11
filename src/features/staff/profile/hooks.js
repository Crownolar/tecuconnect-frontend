import { useQuery } from "@tanstack/react-query";
import { StaffProfileService } from "./profile.service";

export const staffProfileKeys = {
  all: ["mentor", "profile"],
  profile: () => [...staffProfileKeys.all, "me"],
  students: () => [...staffProfileKeys.all, "students"],
  reviews: () => [...staffProfileKeys.all, "reviews"],
  sessions: () => [...staffProfileKeys.all, "sessions"],
  assessments: () => [...staffProfileKeys.all, "assessments"],
};

const baseOptions = {
  staleTime: 30_000,
  refetchOnWindowFocus: false,
};

export function useStaffProfile() {
  return useQuery({
    queryKey: staffProfileKeys.profile(),
    queryFn: StaffProfileService.getProfile,
    ...baseOptions,
  });
}

export function useStaffProfileStudents() {
  return useQuery({
    queryKey: staffProfileKeys.students(),
    queryFn: StaffProfileService.getAssignedStudents,
    ...baseOptions,
  });
}

export function useStaffProfilePendingReviews() {
  return useQuery({
    queryKey: staffProfileKeys.reviews(),
    queryFn: StaffProfileService.getPendingReviews,
    ...baseOptions,
  });
}

export function useStaffProfileSessions() {
  return useQuery({
    queryKey: staffProfileKeys.sessions(),
    queryFn: StaffProfileService.getSessions,
    ...baseOptions,
  });
}

export function useStaffProfileAssessments() {
  return useQuery({
    queryKey: staffProfileKeys.assessments(),
    queryFn: StaffProfileService.getAssessments,
    ...baseOptions,
  });
}
