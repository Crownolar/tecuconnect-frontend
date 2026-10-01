import { useQuery } from "@tanstack/react-query";
import { studentDashboardService } from "./dashboard.service";

export const studentDashboardKeys = {
  all: ["student-dashboard"],

  dashboard: () => [
    ...studentDashboardKeys.all,
    "dashboard",
  ],
};

export function useStudentDashboard() {
  return useQuery({
    queryKey: studentDashboardKeys.dashboard(),
    queryFn: studentDashboardService.getDashboard,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
}