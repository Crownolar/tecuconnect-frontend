import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { adminService } from "./admin.service";

export const adminKeys = {
  all: ["admin"],

  dashboard: () => [...adminKeys.all, "dashboard"],
  users: () => [...adminKeys.all, "users"],
  students: () => [...adminKeys.all, "students"],
  catalog: () => [...adminKeys.all, "catalog"],
  maturity: () => [...adminKeys.all, "maturity"],
  audit: () => [...adminKeys.all, "audit"],
};

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: adminService.getDashboard,
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: adminKeys.users(),
    queryFn: adminService.getUsers,
  });
}

export function useAdminStudents() {
  return useQuery({
    queryKey: adminKeys.students(),
    queryFn: adminService.getStudents,
  });
}

export function useAdminCatalog() {
  return useQuery({
    queryKey: adminKeys.catalog(),
    queryFn: adminService.getCatalog,
  });
}

export function useMaturityOverrides() {
  return useQuery({
    queryKey: adminKeys.maturity(),
    queryFn: adminService.getMaturityOverrides,
  });
}

export function useApproveMaturityOverride() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.approveMaturityOverride,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.maturity(),
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.dashboard(),
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.audit(),
      });
    },
  });
}

export function useAdminAuditLogs() {
  return useQuery({
    queryKey: adminKeys.audit(),
    queryFn: adminService.getAuditLogs,
  });
}