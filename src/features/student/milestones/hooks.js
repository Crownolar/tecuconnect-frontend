import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { milestonesService } from "./milestones.service";

export const milestoneKeys = {
  all: ["student", "milestones"],
  list: (params = {}) => [...milestoneKeys.all, "list", params],
  claims: (params = {}) => [...milestoneKeys.all, "claims", params],
  detail: (id) => [...milestoneKeys.all, "detail", id],
  categories: () => [...milestoneKeys.all, "categories"],
};

export function useMilestones(params = {}) {
  return useQuery({
    queryKey: milestoneKeys.list(params),
    queryFn: () => milestonesService.getMilestones(params),
  });
}

export function useMyMilestoneClaims(params = {}) {
  return useQuery({
    queryKey: milestoneKeys.claims(params),
    queryFn: () => milestonesService.getMyClaims(params),
    staleTime: 30_000,
    refetchOnMount: true,
  });
}

export function useMilestone(milestoneId) {
  return useQuery({
    queryKey: milestoneKeys.detail(milestoneId),
    queryFn: () => milestonesService.getMilestoneById(milestoneId),
    enabled: Boolean(milestoneId),
  });
}

export function useMilestoneCategories() {
  return useQuery({
    queryKey: milestoneKeys.categories(),
    queryFn: milestonesService.getCategories,
    staleTime: 5 * 60 * 1000,
  });
}

export function useClaimMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: milestonesService.claimMilestone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: milestoneKeys.all });
    },
  });
}

export function useSubmitEvidence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ milestoneId, evidence }) =>
      milestonesService.submitEvidence(milestoneId, evidence),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: milestoneKeys.all });
      queryClient.invalidateQueries({
        queryKey: milestoneKeys.detail(variables.milestoneId),
      });
    },
  });
}

export function useSaveMilestoneDraft() {
  return useMutation({ mutationFn: milestonesService.saveDraft });
}

export function useResubmitMilestoneClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ claimId, payload }) =>
      milestonesService.resubmitClaim(claimId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: milestoneKeys.all });
    },
  });
}
