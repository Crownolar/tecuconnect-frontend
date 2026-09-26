import { useQuery } from "@tanstack/react-query";

import { stakeholderService } from "./stakeholder.service";

export const stakeholderKeys = {
  all: ["stakeholder"],

  dashboard: () => [...stakeholderKeys.all, "dashboard"],

  impact: () => [...stakeholderKeys.all, "impact"],

  reports: () => [...stakeholderKeys.all, "reports"],
};

export function useStakeholderDashboard() {
  return useQuery({
    queryKey: stakeholderKeys.dashboard(),
    queryFn: stakeholderService.getDashboard,
  });
}

export function useStakeholderImpact() {
  return useQuery({
    queryKey: stakeholderKeys.impact(),
    queryFn: stakeholderService.getImpact,
  });
}

export function useStakeholderReports() {
  return useQuery({
    queryKey: stakeholderKeys.reports(),
    queryFn: stakeholderService.getReports,
  });
}
