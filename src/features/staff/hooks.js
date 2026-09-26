import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { staffService } from "./staff.service";

export const staffKeys = {
  all: ["staff"],
  dashboard: () => [...staffKeys.all, "dashboard"],
  students: () => [...staffKeys.all, "students"],
  flags: () => [...staffKeys.all, "flags"],
  attendance: () => [...staffKeys.all, "attendance"],
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
