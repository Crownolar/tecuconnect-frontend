import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { milestonesService } from "./milestones.service";

export const milestoneKeys = {
  all: ["student", "milestones"],

  list: () => [...milestoneKeys.all, "list"],

  claims: () => [...milestoneKeys.all, "claims"],
};

export function useMilestones() {
  return useQuery({
    queryKey: milestoneKeys.list(),
    queryFn: milestonesService.getMilestones,
  });
}

export function useClaimMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: milestonesService.claimMilestone,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: milestoneKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: milestoneKeys.claims(),
      });
    },
  });
}

export function useSubmitEvidence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ claimId, payload }) =>
      milestonesService.submitEvidence(claimId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: milestoneKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: milestoneKeys.claims(),
      });
    },
  });
}

export function useSaveMilestoneDraft() {
  return useMutation({
    mutationFn: milestonesService.saveDraft,
  });
}

export function useMyMilestoneClaims() {
  return useQuery({
    queryKey: milestoneKeys.claims(),
    queryFn: milestonesService.getMyClaims,
    staleTime: 0,
    refetchOnMount: "always",
  });
}

export function useResubmitMilestoneClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ claimId, payload }) =>
      milestonesService.resubmitClaim(claimId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: milestoneKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: milestoneKeys.claims(),
      });
    },
  });
}