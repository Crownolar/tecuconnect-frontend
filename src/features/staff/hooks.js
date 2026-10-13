import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { staffService } from "./staff.service";

export const staffKeys = {
  all: ["staff"],
  dashboard: () => [...staffKeys.all, "dashboard"],
  students: () => [...staffKeys.all, "students"],
  flags: () => [...staffKeys.all, "flags"],
  attendance: () => [...staffKeys.all, "attendance"],
  milestones: () => [...staffKeys.all, "milestones"],
  notifications: () => [...staffKeys.all, "notification"],
  reports: () => [...staffKeys.all, "reports"],
  profile: () => [...staffKeys.all, "profile"],
};

export function useStaffDashboard() {
  return useQuery({
    queryKey: staffKeys.dashboard(),
    queryFn: staffService.getDashboard,
  });
}

export function useStaffStudents() {
  return useQuery({
    queryKey: staffKeys.students(),
    queryFn: staffService.getStudents,
  });
}
export function useStaffMilestones() {
  return useQuery({
    queryKey: staffKeys.milestones(),
    queryFn: staffService.getMilestones,
  });
}

export function useReviewStaffMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: staffService.reviewMilestone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.milestones() });
      queryClient.invalidateQueries({ queryKey: staffKeys.dashboard() });
    },
  });
}

export function useResolveStaffMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: staffService.resolveMilestone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.milestones() });
      queryClient.invalidateQueries({ queryKey: staffKeys.dashboard() });
    },
  });
}

export function useStaffFlags() {
  return useQuery({
    queryKey: staffKeys.flags(),
    queryFn: staffService.getFlags,
  });
}

export function useStaffAttendance() {
  return useQuery({
    queryKey: staffKeys.attendance(),
    queryFn: staffService.getAttendance,
  });
}
export function useStaffNotifications() {
  return useQuery({
    queryKey: staffKeys.notifications(),
    queryFn: staffService.getNotifications,
  });
}
export function useStaffReports() {
  return useQuery({
    queryKey: staffKeys.reports(),
    queryFn: staffService.getReports,
  });
}
export function useStaffProfile() {
  return useQuery({
    queryKey: staffKeys.profile(),
    queryFn: staffService.getProfile,
  });
}

export function useResolveFlag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.resolveFlag,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: staffKeys.flags(),
      });

      queryClient.invalidateQueries({
        queryKey: staffKeys.dashboard(),
      });
    },
  });
}
