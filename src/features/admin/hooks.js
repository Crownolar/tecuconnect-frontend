import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "./admin.service";
import { adminUsersService } from "./users/adminUsers.service";

export const adminKeys = {
  all: ["admin"],
  dashboard: () => [...adminKeys.all, "dashboard"],
  users: () => [...adminKeys.all, "users"],
  students: (params = {}) => [...adminKeys.all, "students", params],
  catalog: () => [...adminKeys.all, "catalog"],
  maturity: () => [...adminKeys.all, "maturity"],
  audit: () => [...adminKeys.all, "audit"],
  mentors: (params = {}) => [...adminKeys.all, "mentors", params],
  maturityStats: () => [...adminKeys.all, "maturity", "stats"],

  maturityOverrides: (params = {}) => [
    ...adminKeys.all,
    "maturity",
    "overrides",
    params,
  ],
  auditLogs: (params = {}) => [...adminKeys.all, "audit", "logs", params],
};

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: adminService.getDashboard,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: adminKeys.users(),
    queryFn: adminService.getUsers,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

export function useAdminStudents(params = {}) {
  return useQuery({
    queryKey: adminKeys.students(params),
    queryFn: () => adminService.getStudents(params),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

export function useAdminCatalog() {
  return useQuery({
    queryKey: adminKeys.catalog(),
    queryFn: adminService.getCatalog,
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}

export function useAdminMentors(params = {}) {
  return useQuery({
    queryKey: adminKeys.mentors(params),
    queryFn: () => adminService.getMentors(params),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

export function useAdminAuditLogs(params = {}) {
  return useQuery({
    queryKey: adminKeys.auditLogs(params),
    queryFn: () => adminService.getAuditLogs(params),
    staleTime: 15_000,
    refetchOnWindowFocus: false,
  });
}

export function useCreateMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.createMentor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.mentors() });
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
}

export function useAssignMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.assignMentor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.mentors() });
      queryClient.invalidateQueries({ queryKey: adminKeys.students() });
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
}

export function useUpdateMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mentorId, payload }) =>
      adminService.updateMentor(mentorId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.mentors() });
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
}

export function useDeactivateMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mentorId, reason }) =>
      adminService.deactivateMentor(mentorId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.mentors() });
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
}

export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.catalog(),
      });
    },
  });
}

export function useUpdateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ skillId, payload }) =>
      adminService.updateSkill(skillId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.catalog(),
      });
    },
  });
}

export function useAddSkillCompetency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ skillId, payload }) =>
      adminService.addSkillCompetency(skillId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.catalog(),
      });
    },
  });
}

export function useAdminInviteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminUsersService.sendInvite,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.users(),
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.dashboard(),
      });
    },
  });
}

export function useAdminUpdateMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mentorId, payload }) =>
      adminService.updateMentor(mentorId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.mentors(),
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.users(),
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.dashboard(),
      });
    },
  });
}

export function useAdminDeactivateMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mentorId, reason }) =>
      adminService.deactivateMentor(mentorId, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.mentors(),
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.users(),
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.dashboard(),
      });
    },
  });
}

export function useAdminStudent(studentId) {
  return useQuery({
    queryKey: [...adminKeys.students(), "detail", studentId],
    queryFn: () => adminService.getStudent(studentId),
    enabled: Boolean(studentId),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

export function useMaturityOverrideStats() {
  return useQuery({
    queryKey: adminKeys.maturityStats(),
    queryFn: adminService.getMaturityOverrideStats,
    staleTime: 15_000,
    refetchOnWindowFocus: false,
  });
}

export function useMaturityOverrides(params = {}) {
  return useQuery({
    queryKey: adminKeys.maturityOverrides(params),
    queryFn: () => adminService.getMaturityOverrides(params),
    staleTime: 15_000,
    refetchOnWindowFocus: false,
  });
}

export function useCreateMaturityOverride() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.createMaturityOverride,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.maturityStats(),
      });

      queryClient.invalidateQueries({
        queryKey: [...adminKeys.all, "maturity"],
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.students(),
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.dashboard(),
      });
    },
  });
}

export function useApproveMaturityOverride() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ overrideId, reviewNote }) =>
      adminService.approveMaturityOverride(overrideId, reviewNote),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.maturityStats(),
      });

      queryClient.invalidateQueries({
        queryKey: [...adminKeys.all, "maturity"],
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.students(),
      });

      queryClient.invalidateQueries({
        queryKey: adminKeys.dashboard(),
      });
    },
  });
}

export function useRejectMaturityOverride() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ overrideId, reviewNote }) =>
      adminService.rejectMaturityOverride(overrideId, reviewNote),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.maturityStats(),
      });

      queryClient.invalidateQueries({
        queryKey: [...adminKeys.all, "maturity"],
      });
    },
  });
}
