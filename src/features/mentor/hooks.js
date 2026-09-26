import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { mentorService } from "./mentor.service";

export const mentorKeys = {
  all: ["mentor"],

  dashboard: () => [...mentorKeys.all, "dashboard"],

  students: () => [...mentorKeys.all, "students"],

  reviews: () => [...mentorKeys.all, "reviews"],
};

export function useMentorDashboard() {
  return useQuery({
    queryKey: mentorKeys.dashboard(),
    queryFn: mentorService.getDashboard,
  });
}

export function useAssignedStudents() {
  return useQuery({
    queryKey: mentorKeys.students(),
    queryFn: mentorService.getStudents,
  });
}

export function usePendingReviews() {
  return useQuery({
    queryKey: mentorKeys.reviews(),
    queryFn: mentorService.getPendingReviews,
  });
}

export function useReviewMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ claimId, payload }) =>
      mentorService.reviewMilestone(claimId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mentorKeys.reviews(),
      });

      queryClient.invalidateQueries({
        queryKey: mentorKeys.dashboard(),
      });
    },
  });
}
