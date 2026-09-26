import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { progressService } from "./progress.service";

export const progressKeys = {
  all: ["student", "progress"],

  current: () => [
    ...progressKeys.all,
    "current",
  ],
};

// export function useStudentProgress() {
//   return useQuery({
//     queryKey: progressKeys.current(),
//     queryFn: progressService.getProgress,
//     staleTime: 30 * 1000,
//   });
// }

export function useStudentProgress() {
  return useQuery({
    queryKey: progressKeys.current(),
    queryFn: progressService.getProgress,
    staleTime: 0,
    refetchOnMount: "always",
  });
}

export function useEvaluateMilestoneVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:
      progressService.evaluateAfterMilestoneVerification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: progressKeys.current(),
      });
    },
  });
}